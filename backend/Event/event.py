from flask import jsonify
from MySQLdb.cursors import DictCursor
from datetime import datetime, timedelta
import random


def get_event_users(mysql, data):
    event_id = data.get("eventId")
    cursor = mysql.connection.cursor(DictCursor)

    try:
        cursor.execute("""
            SELECT EventUsers.user_id, is_attending, username FROM EventUsers, Users
            WHERE EventUsers.event_id = %s AND EventUsers.user_id = Users.user_id
        """, (event_id,))
        users = cursor.fetchall()
        response = {
            "status": "success",
            "message": users
        }
        return jsonify(response), 200

    except Exception as e:
        print(f"Error in /api/event: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        cursor.close()

def set_attendance(mysql, data):
    event_id = data.get("eventId")
    user_id = data.get("userId")
    is_attending = data.get("isAttending")

    if not event_id or not user_id or is_attending is None:
        return jsonify({"status": "error", "message": "eventId, userId, and isAttending are required"}), 400

    cursor = mysql.connection.cursor(DictCursor)

    try:
        cursor.execute("""
            SELECT * FROM EventUsers WHERE user_id = %s AND event_id = %s
        """, (user_id, event_id))
        record = cursor.fetchone()

        if record:
            cursor.execute("""
                UPDATE EventUsers SET is_attending = %s
                WHERE user_id = %s AND event_id = %s
            """, (is_attending, user_id, event_id))
            mysql.connection.commit()
            message = "Attendance status updated successfully"
        else:
            return jsonify({"status": "error", "message": "User-event record not found"}), 404

        return jsonify({"status": "success", "message": message}), 200

    except Exception as e:
        print(f"Error in set_attendance: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        cursor.close()
