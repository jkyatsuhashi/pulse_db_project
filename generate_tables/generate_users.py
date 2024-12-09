from flask import Flask
from flask_mysqldb import MySQL
import os
import bcrypt #type: ignore
import random
from dotenv import load_dotenv #type: ignore

# from geopy.geocoders import Nominatim
# from geopy.distance import geodesic

app = Flask(__name__)
load_dotenv()

host = "db8.cse.nd.edu"
port = 5071

# Configure database connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('SQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('SQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('SQL_DB')
mysql = MySQL(app)
print(mysql.connection)

addresses = [
    "2010 Moose Krause Cir, Notre Dame, IN 46556",
    "1104 Bissell St, South Bend, IN 46617",
    "1110 Bissell St, South Bend, IN 46617",
    "647 Northwood Dr, South Bend, IN 46617",
    "1310 Corby Blvd, South Bend, IN 46617",
    "1411 Oak Ct, Lafayette, IN 47905",
    "1417 Oak Ct, Lafayette, IN 47905",
    "1418 Oak Ct, Lafayette, IN 47905",
    "1416 Oak Ct, Lafayette, IN 47905",
    "1413 Oak Ct, Lafayette, IN 47905",
    "1400 Oak Ct, Lafayette, IN 47905",
    "1407 Logan Ave, Lafayette, IN 47905",
    "1429 Oak Ct, Lafayette, IN 47905",
    "400 Saw Mill Rd, Lafayette, IN 47905",
    "2240 N Hartstrait Rd, Bloomington, IN 47404",
    "5237 W Vernal Pike, Bloomington, IN 47404",
    "5229 W Vernal Pike, Bloomington, IN 47404",
    "2931 S 14th St, Niles, MI 49120",
    "2919 S 15th St, Niles, MI 49120",
    "2918 S 15th St, Niles, MI 49120"
]
# geolocator = Nominatim(user_agent="geo_distance_calculator")

# for i in range(1,len(addresses)):
#     try:
#         location1 = geolocator.geocode(addresses[i])
#     except:
#         print(location1)
# # for team, data in teams.items():
#     location1 = geolocator.geocode(data["location"])
#     count = 0
#     for location in addresses:
#         try:
#             location2 = geolocator.geocode(location)

#             # Extract coordinates
#             coords_1 = (location1.latitude, location1.longitude)
#             coords_2 = (location2.latitude, location2.longitude)

#             # Calculate the distance in kilometers
#             distance = geodesic(coords_1, coords_2).miles

#         except:
#             count += 1
#             print(f"sport addy {data['location']}")
#             print(location)
#             if count > 2:
#                 exit()
# for i in range(500):
#     username = f"user{i}"
#     password = f"password{i}"
#     hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#     curr = mysql.connection.cursor()
#     address = random.choice(addresses)
#     is_bot = 1
#     try:
#         curr.execute(
#                 """
#                 INSERT INTO Users (username, password, address, is_bot)
#                 VALUES (%s, %s, %s, %s)
#                 """,
#                 (username, hashed, address, is_bot)
#         )
#         mysql.connection.commit()
#         curr.close()
#     except:
#         mysql.connection.rollback()
#         curr.close()

