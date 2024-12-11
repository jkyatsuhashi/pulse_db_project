from MySQLdb.cursors import DictCursor #type: ignore
from flask import jsonify #type: ignore

def get_restaurants(mysql):
    try:
        # Get top 20 restaurants with price_range '$'
        curr = mysql.connection.cursor(DictCursor)
        curr.execute(
            """
            SELECT name, position, score, ratings, category, price_range, full_address, zip_code, lat, lng 
            FROM Restaurants 
            WHERE price_range = '$'
            ORDER BY score DESC 
            LIMIT 20;
            """
        )
        response = curr.fetchall()
        curr.close()

        result = {"status": "success", "message": response}
        return jsonify(result)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Error {e}"})
    
def insert_restaurant(mysql, restaurant):
    name = restaurant.get("name")
    position = restaurant.get("position")
    score = restaurant.get("score")
    ratings = restaurant.get("ratings")
    category = restaurant.get("category")
    price_range = restaurant.get("price_range")
    full_address = restaurant.get("full_address")
    zip_code = restaurant.get("zip_code")
    lat = restaurant.get("lat")
    lng = restaurant.get("lng")
    # Validate required fields
    if not name:
        return jsonify({"error": "Name is required"}), 400

    # Insert restaurant into the restaurants table
    curr = mysql.connection.cursor()
    try:
        curr.execute(
            """
            INSERT INTO Restaurants (position, name, score, ratings, category, price_range, full_address, zip_code, lat, lng)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (position, name, score, ratings, category, price_range, full_address, zip_code, lat, lng)
        )
        mysql.connection.commit()
        curr.close()
        return jsonify({"message": f"Restaurant '{name}' added successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500

def remove_restaurant(mysql, restaurant):
    
    name = restaurant.get("name")
    # Check if name is provided
    if not name:
        return jsonify({"error": "Restaurant name is required"}), 400


    curr = mysql.connection.cursor()
    try:

        curr.execute("SELECT * FROM Restaurants WHERE name = %s", (name,))
        restaurant_exists = curr.fetchone()
        
        if not restaurant_exists:
            return jsonify({"error": f"Restaurant '{name}' not found"}), 404
        
        # Perform the deletion
        curr.execute("DELETE FROM restaurants WHERE name = %s", (name,))
        mysql.connection.commit()
        curr.close()
        return jsonify({"message": f"Restaurant '{name}' removed successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500 


def update_restaurant(mysql, restaurant):
    name = restaurant.get("name")
    
    # Require a name to identify which restaurant to update
    if not name:
        return jsonify({"error": "Name required"}), 400

    # Filter out invalid or unnecessary fields for updating
    rest_data = {key: value for key, value in restaurant.items() if key != "name" and key != "method" and value != ""}
    if not rest_data:  
        return jsonify({"error": "No valid fields to update"}), 400
    print(rest_data)

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
