from flask import jsonify
from MySQLdb.cursors import DictCursor
from datetime import datetime, timedelta
import random

def generate_random_event_in_region(mysql):
    cursor = mysql.connection.cursor(DictCursor)
    event_type = random.choice(["Restaurant", "Sport", "Movie"])

    try:
        # Default values
        event_address = ""
        event_date = None

        if event_type == "Restaurant":
            cursor.execute("""
                SELECT * FROM Restaurants
                WHERE full_address LIKE '% IN%' OR full_address LIKE '% MI%'
                ORDER BY RAND() LIMIT 1
            """)
            event_source = cursor.fetchone()
            if not event_source:
                raise ValueError("No restaurant found in Indiana or Michigan.")
            event_address = event_source["full_address"]
            event_date = (datetime.now() + timedelta(days=random.randint(1, 14))).date()

        elif event_type == "Sport":
            cursor.execute("""
                SELECT * FROM Sport
                WHERE location LIKE '% IN%' OR location LIKE '% MI%'
                ORDER BY RAND() LIMIT 1
            """)
            event_source = cursor.fetchone()
            if not event_source:
                raise ValueError("No sport event found in Indiana or Michigan.")
            event_address = event_source["location"]
            event_date = (datetime.now() + timedelta(days=random.randint(1, 14))).date()

        else:  # Movie
            cursor.execute("""
                SELECT * FROM Movie
                WHERE venue LIKE '% IN%' OR venue LIKE '% MI%'
                ORDER BY RAND() LIMIT 1
            """)
            event_source = cursor.fetchone()
            if not event_source:
                raise ValueError("No movie found in Indiana or Michigan.")
            event_address = event_source["venue"]
            event_date = (datetime.now() + timedelta(days=random.randint(1, 14))).date()

        # Check if event already exists
        cursor.execute("SELECT event_id FROM Events WHERE location = %s AND date = %s", (event_address, event_date))
        existing_event = cursor.fetchone()

        if not existing_event:
            cursor.execute(
                "INSERT INTO Events (location, date, type) VALUES (%s, %s, %s)",
                (event_address, event_date, event_type)
            )
            mysql.connection.commit()
            event_id = cursor.lastrowid
        else:
            event_id = existing_event["event_id"]

        # Fetch local users in Indiana and Michigan
        cursor.execute("""
            SELECT * FROM Users
            WHERE address LIKE '% IN%' OR address LIKE '% MI%'
        """)
        local_users = cursor.fetchall()

        if not local_users:
            return jsonify({"message": "No users found in Indiana or Michigan for this event."}), 200

        # Randomly assign users to the event
        assigned_users = random.sample(local_users, random.randint(2, min(len(local_users), 10)))

        for usr in assigned_users:
            cursor.execute("""
                INSERT IGNORE INTO EventUsers (user_id, event_id, date, location)
                VALUES (%s, %s, %s, %s)
            """, (usr["user_id"], event_id, event_date, event_address))

        mysql.connection.commit()
        return jsonify({
            "message": f"Random {event_type} event created in Indiana or Michigan with local users assigned.",
            "event": {
                "date": str(event_date),
                "location": event_address,
                "assigned_users": [u['user_id'] for u in assigned_users]
            }
        }), 200

    except Exception as e:
        print(f"Error generating event: {e}")
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
