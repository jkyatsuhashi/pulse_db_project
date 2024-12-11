from flask import Flask, request, jsonify
import os
from flask_mysqldb import MySQL
from dotenv import load_dotenv #type: ignore
from flask_cors import CORS #type: ignore
from Restaurants import restaurants
from Movies import movies
from Sports import sports
from Calendar import calendar
from Auth import auth
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from utils.generate_random.generate_random_event import generate_random_event_in_region
app = Flask(__name__)
load_dotenv()

host = "db8.cse.nd.edu"
port = 5077

# Configure database connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('SQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('SQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('SQL_DB')
mysql = MySQL(app)
CORS(app)

scheduler = BackgroundScheduler()

def schedule_event_generation():
    with app.app_context():
        print(f"[{datetime.now()}] Triggering random event generation...")
        try:
            response, status = generate_random_event_in_region(mysql)
            print(f"[{datetime.now()}] Generated event response: {response.get_json()}")
        except Exception as e:
            print(f"[{datetime.now()}] Error generating event: {e}")

## scheduler.add_job(schedule_event_generation, CronTrigger(day_of_week='sun', hour=23, minute=59))
scheduler.add_job(schedule_event_generation, CronTrigger(second='*/10'))

scheduler.start()

@app.route('/api/login', methods=["POST"])
def get_user():
    data = request.json
    print(data)
    method = data.get("method")
    if method == "login":
        response = auth.login(mysql, data)
    elif method == "register":
        response = auth.register(mysql, data)
    return response

@app.route('/api/restaurants', methods=['POST'])
def post_restaurant_data():
    data = request.json  # Get JSON data from the request
    try:
        method = data.get("method")
    except:
        error = {"status" : "error" , "message" : "no method included"}
        return jsonify(error)
    if method == "insert":
        response = restaurants.insert_restaurant(mysql, data)
    elif method == "get":
        response = restaurants.get_restaurants(mysql)
    elif method == "remove":
        response = restaurants.remove_restaurant(mysql, data)
    else:
        response = restaurants.update_restaurant(mysql, data)
    # Process the data and create a response
    return response

@app.route('/api/movies', methods=['POST'])
def post_movie_data():
    data = request.json  # Get JSON data from the request
    try:
        method = data.get("method")
    except:
        error = {"status" : "error" , "message" : "no method included"}
        return jsonify(error)
    if method == "insert":
        response = movies.insert_movie(mysql, data)
    elif method == "get_today":
        response = movies.get_date_movies(mysql, data)
    elif method == "remove":
        response = movies.remove_movie(mysql, data)
    else:
        response = movies.update_movie(mysql, data)
    # Process the data and create a response
    return response 


@app.route('/api/sports', methods=['POST'])
def post_sports_data():
    data = request.json  # Get JSON data from the request
    try:
        method = data.get("method")
    except:
        error = {"status" : "error" , "message" : "no method included"}
        return jsonify(error)
    if method == "get":
        response = sports.get_sports(mysql)
    elif method == "remove":
        response = sports.remove_sport(mysql, data)
    elif method == 'update':
        response = sports.update_sport(mysql, data)
    elif method == 'insert':
        response = sports.insert_sport(mysql, data)
    # Process the data and create a response
    return response



@app.route('/api/calendar', methods=["POST"])
def post_calendar_data():
    data = request.json
    try:
        method = data.get("method")
    except:
        error = {"status":"error", "message":"no method included"}
        return jsonify(error)
    if method == "get":
        response = calendar.get_calendar(mysql, data) 
    elif method == "remove":
        response = calendar.remove_event(mysql, data)
    elif method == "update":
        response = calendar.update_event(mysql, data)
    elif method == "insert":
        response = calendar.insert_event(mysql, data)

    return response

@app.route('/api/event', methods=["POST"])
def get_event_users():
    data = request.json
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



if __name__ == '__main__':
    app.debug = True
    app.run(host=host, port=port)