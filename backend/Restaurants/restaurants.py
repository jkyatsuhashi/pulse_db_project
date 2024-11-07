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
    
def remove_restaurant(mysql, restaurant):
    # Remove a restaurant from the database
    name = restaurant.get("name")

    if not name:
        return jsonify({"error": "Name required"}), 400

    # Delete restaurant from the Restaurants table
    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(
            "DELETE FROM Restaurants WHERE name = %s",
            (name,)
        )
        mysql.connection.commit()
        curr.close()
        if rows_affected == 0:
            return jsonify({"message": f"No restaurant found with name '{name}'"}), 404
        return jsonify({"message": f"Restaurant '{name}' removed successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500