from flask import jsonify
from MySQLdb.cursors import DictCursor
from datetime import datetime

def get_calendar(mysql, data):
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    cursor = mysql.connection.cursor(DictCursor)

   
    cursor.execute("SELECT COUNT(*) AS cnt FROM Users WHERE user_id = %s", (user_id,))
    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"}), 404

   
    cursor.execute("""
        SELECT eu.id AS event_user_id, eu.user_id, e.location, e.date, e.title, e.type
        FROM EventUsers eu
        JOIN Events e ON eu.location = e.location AND eu.date = e.date
        WHERE eu.user_id = %s
        ORDER BY e.date;
    """, (user_id,))

    events = cursor.fetchall()
    cursor.close()

    if not events:
        return jsonify({"message": "No events found for this user"}), 200

    return jsonify({"events": events}), 200


def insert_event(mysql, data):
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    location = data.get("location")
    date_str = data.get("date")

    if not location or not date_str:
        return jsonify({"error": "location and date are required"}), 400

    
    try:
        event_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    cursor = mysql.connection.cursor(DictCursor)

    
    cursor.execute("SELECT COUNT(*) AS cnt FROM Users WHERE user_id = %s", (user_id,))
    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"}), 404

    
    cursor.execute("SELECT COUNT(*) AS cnt FROM Events WHERE location = %s AND date = %s", (location, event_date))
    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error":"Event not found"}), 404

    
    try:
        cursor.execute(
            "INSERT INTO EventUsers (user_id, location, date) VALUES (%s, %s, %s)",
            (user_id, location, event_date)
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Event added successfully"}), 201
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500


def remove_event(mysql, data):
    user_id = data.get("user_id")
    location = data.get("location")
    date_str = data.get("date")
    title = data.get("title")

    if not user_id or not location or not date_str:
        return jsonify({"error": "user_id, location, and date are required"}), 400

    try:
        event_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    cursor = mysql.connection.cursor(DictCursor)

    
    cursor.execute("""
        SELECT COUNT(*) AS cnt
        FROM EventUsers
        WHERE user_id = %s AND location = %s AND date = %s
    """, (user_id, location, event_date))

    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error": "Event not found in calendar"}), 404

    
    try:
        cursor.execute("""
            DELETE FROM EventUsers
            WHERE user_id = %s AND location = %s AND date = %s
        """, (user_id, location, event_date))

        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": f"{title if title else 'Event'} deleted successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500


def update_event(mysql, data):
    user_id = data.get("user_id")
    event_user_id = data.get("event_id")  
    location = data.get("location")
    date_str = data.get("date")

    if not user_id or not event_user_id or not location or not date_str:
        return jsonify({"error": "user_id, event_id, location, and date are required"}), 400

    try:
        event_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    cursor = mysql.connection.cursor(DictCursor)

    
    cursor.execute("SELECT COUNT(*) AS cnt FROM Users WHERE user_id = %s", (user_id,))
    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"}), 404

    
    cursor.execute("SELECT COUNT(*) AS cnt FROM EventUsers WHERE id = %s AND user_id = %s", (event_user_id, user_id))
    if cursor.fetchone()["cnt"] == 0:
        cursor.close()
        return jsonify({"error": "Event not found for this user"}), 404

    
    try:
        cursor.execute("""
            UPDATE EventUsers
            SET location = %s, date = %s
            WHERE id = %s AND user_id = %s
        """, (location, event_date, event_user_id, user_id))

        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "Event updated successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500
