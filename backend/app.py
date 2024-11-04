from flask import Flask, render_template, request, jsonify
import os
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS

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
CORS(app)

def get_db():
    # Create a cursor object
    cur = mysql.connection.cursor()

    # Execute a query (e.g., SELECT statement)
    cur.execute("SELECT * FROM Foods LIMIT 4")

    # Fetch data
    data = cur.fetchall()

    # Close the cursor
    cur.close()
    print(data)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def post_data():
    print("yo")
    data = request.json  # Get JSON data from the request
    print(f"Received data from frontend: {data}")
    
    # Process the data and create a response
    response_data = {'message': 'Data received and processed!', 'received': data}
    return jsonify(response_data)


if __name__ == '__main__':
	app.debug = True
	app.run(host=host, port=port)