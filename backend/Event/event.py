from flask import jsonify
from MySQLdb.cursors import DictCursor
from datetime import datetime, timedelta
import random


def get_event_users(mysql, data):
    event_id = data.get("eventId")
    user_id = data.get("userId")  

    if not event_id:
        return jsonify({"status": "error", "message": "eventId is required"}), 400

    cursor = mysql.connection.cursor()

    try:
        if user_id:
            cursor.execute("""
                SELECT is_attending FROM EventUsers WHERE user_id = %s AND event_id = %s
            """, (user_id, event_id))
            attendance = cursor.fetchone()

            if attendance:
                new_status = not attendance['is_attending']
                cursor.execute("""
                    UPDATE EventUsers SET is_attending = %s
                    WHERE user_id = %s AND event_id = %s
                """, (new_status, user_id, event_id))
                mysql.connection.commit()
                toggle_message = "You are now attending this event" if new_status else "You are no longer attending this event"
            else:
                return jsonify({"status": "error", "message": "User not found for this event"}), 404
        else:
            toggle_message = None

        cursor.execute("""
            SELECT user_id FROM EventUsers
            WHERE event_id = %s AND is_attending = TRUE
        """, (event_id,))
        attending_users = [row['user_id'] for row in cursor.fetchall()]

        response = {
            "status": "success",
            "attending_users": attending_users
        }
        if toggle_message:
            response["message"] = toggle_message

        return jsonify(response), 200

    except Exception as e:
        print(f"Error in /api/event: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        cursor.close()

def get_event_users_details(mysql, data):
    event_id = data.get("eventId")

    if not event_id:
        return jsonify({"status": "error", "message": "eventId is required"}), 400

    cursor = mysql.connection.cursor(DictCursor)

    try:
        cursor.execute("""
            SELECT 
                EventUsers.user_id, 
                EventUsers.is_attending, 
                Users.username 
            FROM EventUsers
            JOIN Users ON EventUsers.user_id = Users.user_id
            WHERE EventUsers.event_id = %s
        """, (event_id,))

        users = cursor.fetchall()

        response_data = [
            {
                "user_id": row["user_id"],
                "is_attending": bool(row["is_attending"]),
                "username": row["username"]
            }
            for row in users
        ]

        return jsonify({"status": "success", "users": response_data}), 200

    except Exception as e:
        print(f"Error in /api/event_users: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        cursor.close()
