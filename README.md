# pulse_db_project

**Activate Virtual Environment**
I have added all the libraries to requirements.txt

To start your environment follow these steps
`python3 -m env myenv
source myenv/bin/activate
pip install -r requirements.txt
`

**Changing Installed Libraries**
If you download another library with pip install you must run
`pip freeze > requirements.txt` and push the new requirements to github

**Running Application**
To run the backend, go to the backend folder and run
`python3 app.py`

To run the frontend, go to the frontend folder and run
`npm start`

**Connection**
The frontend will request information from the backend with async requests to different
urls. The backend will then perform the operation and return the appropriate data to the frontend
