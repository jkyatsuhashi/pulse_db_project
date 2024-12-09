from MySQLdb.cursors import DictCursor 
from flask import Flask, jsonify
from app import app
from datetime import datetime
import mysql.connector
import os

#TODO not sure if this is possible to do
def get_calendar(mysql, user_id):
    data 

    cursor = mysql.connection.cursor(DictCursor)

    cursor.execute("SELECT COUNT(*) FROM Users WHERE user_id %s", (user_id,))
    if cursor.fetchone()["COUNT(*)"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"})

    cursor.execute("SELECT COUNT(*) FROM Event WHERE location = %s AND date = %s", (location, date))

    cursor.execute(
        """
        SELECT 
        """
    )
    pass

#TODO Figure out if this actually works
def insert_event(mysql, user_id, event):
    cursor = mysql.connection.cursor(DictCursor)
    location = event.get('location')
    date = event.get('date')

    cursor.execute("SELECT COUNT(*) FROM Users WHERE user_id = %s", (user_id,))
    if cursor.fetchone()["COUNT(*)"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"}), 400

    cursor.execute("SELECT COUNT(*) FROM Event WHERE location = %s AND date = %s", (location, date))
    if cursor.fetchone()[0] == 0:
        cursor.close()
        return jsonify({"error":"Event not found"}), 400

    try:
        cursor.execute(
            "INSERT INTO EventUser (user_id, location, date) VALUES (%s, %s, %s)",
            (user_id, location, date)
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message":"Event added successfully"}), 200
    except Exception as e:
        print(e)
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500

def remove_event(mysql, user_id, event):
    location = event.get('location')
    date = event.get('date')
    title = event.get('title')

    cursor = mysql.connection.cursor(DictCursor)

    cursor.execute(
        """
        SELECT COUNT(*) FROM EventUser
        WHERE user_id = %s AND location = %s AND date = %s
        """,
        (user_id, location, date)
    )

    if cursor.fetchone()[0] == 0:
        cursor.close()
        return jsonify({"error": "Event not found in calendar"}), 404

    try:
        cursor.execute(
            """
            DELETE FROM EventUser
            WHERE user_id = %s AND location = %s AND date = %s
            """,
            (user_id, location, date)
        )

        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": f"{title} deleted successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500

def update_event(mysql, user_id, event_id, updatedEvent):
    cursor = mysql.connection.cursor(DictCursor)

    cursor.execute("SELECT COUNT(*) FROM Users WHERE user_id = %s", (user_id,))
    if cursor.fetchone()["COUNT(*)"] == 0:
        cursor.close()
        return jsonify({"error":"User not found"}), 400

    cursor.execute("""
    SELECT COUNT(*) FROM EventUsers WHERE user_id = %s AND id = %s
    """, (user_id, event_id))

    if cursor.fetchone()["COUNT(*)"] == 0:
        cursor.close()
        return jsonify({"error": "Event not found for this user"}), 404

    title = updatedEvent.get('title')
    location = updatedEvent.get('location')
    date = updatedEvent.get('date')

    try:
        cursor.execute("""
            UPDATE EventUsers
            SET title = %s, location = %s, date = %s
            WHERE user_id = %s
        """, (title, location, date, user_id))

        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Event update successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        cursor.close()
        return jsonify({"error": str(e)}), 500
