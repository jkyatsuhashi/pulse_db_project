from flask_mysqldb import MySQL
from MySQLdb.cursors import DictCursor
from flask import jsonify

def get_restaurants(mysql):
    # Get all of the current restaurants in the database
    curr = mysql.connection.cursor(DictCursor)
    curr.execute("SELECT * FROM Restaurants")
    response = curr.fetchall()
    curr.close()
    result = {"status" : "success", "message" : response}
    return jsonify(result)
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
    type_ = restaurant.get("type")

    if not name or not type_:
        return jsonify({"error": "Name and type are required"}), 400

    # Delete restaurant from the Restaurants table
    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(
            "DELETE FROM Restaurants WHERE name = %s AND type = %s",
            (name, type_)
        )
        mysql.connection.commit()
        curr.close()
        if rows_affected == 0:
            return jsonify({"message": f"No restaurant found with name '{name}' and type '{type_}'"}), 404
        return jsonify({"message": f"Restaurant '{name}' removed successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500