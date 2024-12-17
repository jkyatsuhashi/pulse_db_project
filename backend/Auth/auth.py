import bcrypt  # type: ignore
from MySQLdb.cursors import DictCursor  # type: ignore
from flask import jsonify  # type: ignore

def login(mysql, data):
    username = data.get("username")
    password = data.get("password")
    print(username)
    try:
        curr = mysql.connection.cursor(DictCursor)
        curr.execute(
            "SELECT * FROM Users WHERE username = %s",
            (username,)
        )
        response = curr.fetchone()
        curr.close()

        if not response:
            return jsonify({"status": "error", "message": "Invalid username or password."})

        # Verify password
        if bcrypt.checkpw(password.encode('utf-8'), response["password"].encode('utf-8')):
            filtered_response = {
                "username": response["username"],
                "user_id": response["user_id"] -1 ,
                "address": response["address"]
            }
            result = {"status": "success", "message": filtered_response}
        else:
            result = {"status": "error", "message": "Invalid username or password."}
        
        return jsonify(result)

    except Exception as e:
        # Log the exception for debugging
        return jsonify({"status": "error", "message": f"Error: {str(e)}"})
def register(mysql, data):
    username = data.get("username")
    password = data.get("password")
    address = data.get("address")  # Fixed variable name from "username" to "address"
    print(data)
    try:
        # Check if the username already exists
        curr = mysql.connection.cursor(DictCursor)
        curr.execute(
            "SELECT * FROM Users WHERE username = %s",
            (username,)
        )
        existing_user = curr.fetchone()
        curr.close()

        if existing_user:
            return jsonify({"status": "error", "message": "Username already exists."})

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insert the new user into the database
        curr = mysql.connection.cursor()
        curr.execute(
            "INSERT INTO Users (username, password, address) VALUES (%s, %s, %s)",
            (username, hashed_password, address)
        )
        mysql.connection.commit()
        curr.close()
        filtered_response = {
                "username": username,
                "address": password
        }
        return jsonify({"status": "success", "message": filtered_response})

    except Exception as e:
        # Log the exception for debugging
        return jsonify({"status": "error", "message": f"Error: {str(e)}"})