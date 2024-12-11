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
port = 5076

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

scheduler.add_job(schedule_event_generation, CronTrigger(day_of_week='sun', hour=23, minute=59))

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


if __name__ == '__main__':
    app.debug = True
    app.run(host=host, port=port)