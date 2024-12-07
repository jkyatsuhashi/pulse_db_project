from MySQLdb.cursors import DictCursor #type: ignore
from flask import jsonify #type: ignore
import re

def camel_to_snake(name):
    return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

def get_sports(mysql):
    try:
        # Get top 20 restaurants with price_range '$'
        curr = mysql.connection.cursor(DictCursor)
        curr.execute(
            """
            SELECT * 
            FROM Sport
            ORDER BY date
            LIMIT 20;
            """
        )
        response = curr.fetchall()
        curr.close()

        result = {"status": "success", "message": response}
        return jsonify(result)
    except Exception as e:
        return jsonify({"status": "error", "message": f"Error {e}"})
    
    
def insert_sport(mysql, sport):
    home_team = sport.get("homeTeam")
    opponent = sport.get("opponent")
    sport_type = sport.get("sportType")
    date = sport.get("date")
    location = sport.get("location")
    if not home_team or not date or not opponent or not sport_type or not location:
        return jsonify({"error": "Name and type are required"}), 400

    curr = mysql.connection.cursor()
    try:
        curr.execute(
            "INSERT INTO Sport ( home_team, opponent, location, date, sport_type) VALUES (%s, %s, %s, %s, %s)",
            ( home_team,  opponent, location, date, sport_type)
        )
        mysql.connection.commit()
        curr.close()
        return jsonify({"message": f"Sport added successfully"}), 200
    except Exception as e:
        print(e)
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500

def remove_sport(mysql, sport):

    home_team = sport.get("homeTeam")
    date = sport.get("date")
    sport_type = sport.get("sportType")
    if not home_team or not date or not sport_type:
        return jsonify({"error": "Title required"}), 400


    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(
            "DELETE FROM Sport WHERE home_team = %s AND date = %s and sport_type= %s",
            (home_team, date, sport_type)
        )
        mysql.connection.commit()
        curr.close()
        if rows_affected == 0:
            return jsonify({"message": f"No Sport found with home team '{home_team}'"}), 404
        return jsonify({"message": f"Sport '{home_team}' removed successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500
    
def update_sport(mysql, sport):
    home_team = sport.get("homeTeam")
    sport_type = sport.get("sportType")
    date = sport.get("date")
    if not home_team or not date or not sport_type:
        return jsonify({"error": "Home Team, Date, and Sport Type are required"}), 400

    sport_data = {
        camel_to_snake(key): value
        for key, value in sport.items()
        if key != "method" 
        and key!= "homeTeam"
        and key!="date" 
        and value != ""
    }

    # Create cursor to execute query
    curr = mysql.connection.cursor()
    where_values = (home_team, date, sport_type)

    # Create dynamic SQL query and values for SET clause
    set_clause = ", ".join([f"{key} = %s" for key in sport_data.keys()])
    values = tuple(sport_data.values())

    # Add WHERE clause values (home_team, date, and sport_type)
    where_values = (home_team, date, sport_type)
    query = f"UPDATE Sport SET {set_clause} WHERE home_team = %s AND date = %s AND sport_type = %s"

    try:
        # Execute the query with combined values
        rows_affected = curr.execute(query, values + where_values)
        mysql.connection.commit()

        if rows_affected > 0:
            return jsonify({"message": "Sport Event updated successfully"}), 200
        else:
            return jsonify({"error": "Sport Event not found or no changes made"}), 404
    except Exception as e:
        mysql.connection.rollback()
        print(str(e))
        return jsonify({"error": str(e)}), 500
    finally:
        curr.close()
