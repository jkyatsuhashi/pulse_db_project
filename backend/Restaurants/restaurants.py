from MySQLdb.cursors import DictCursor #type: ignore
from flask import jsonify #type: ignore

def get_restaurants(mysql):
    try:
        # Get all of the current restaurants in the database
        curr = mysql.connection.cursor(DictCursor)
        curr.execute("SELECT fk_restaurant_name as name, AVG(price) as av FROM Foods GROUP BY fk_restaurant_name ORDER BY av LIMIT 15;")
        response = curr.fetchall()
        curr.close()
        result = {"status" : "success", "message" : response}
        return jsonify(result)
    except Exception as e:
        return jsonify({"status" : "error" , "message" : f"Error {e}"})

def insert_restaurant(mysql, restaurant):
    # Insert a new restaurant
    name = restaurant.get("name")
    type_ = restaurant.get("type")
    if not name or not type_:
        return jsonify({"error": "Name and type are required"}), 400

    # Insert restaurant into the Restaurants table
    curr = mysql.connection.cursor()
    try:
        curr.execute(
            "INSERT INTO Restaurants (name, type) VALUES (%s, %s)",
            (name, type_)
        )
        mysql.connection.commit()
        curr.close()
        return jsonify({"message": f"Restaurant '{name}' added successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500
    
def update_restaurant(mysql, restaurant):
    name = restaurant.get("name")
    if not name:
        return jsonify({"error": "Name required"}), 400

    rest_data = {key: value for key, value in restaurant.items() if key != "name" and key !="method" and value != ""}
    if not rest_data:  
        return jsonify({"error": "No valid fields to update"}), 400

    # Create dynamic SQL query and values
    set_clause = ", ".join([f"{key} = %s" for key in rest_data.keys()])
    values = tuple(rest_data.values()) + (name,) 
    query = f"UPDATE Restaurants SET {set_clause} WHERE name = %s"

    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(query, values)
        mysql.connection.commit()
        if rows_affected > 0:
            return jsonify({"message": "Restaurant updated successfully"}), 200
        else:
            return jsonify({"error": "Restaurant not found or no changes made"}), 404
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        curr.close()