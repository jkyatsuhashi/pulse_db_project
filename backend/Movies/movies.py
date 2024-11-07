from MySQLdb.cursors import DictCursor #type: ignore
from flask import jsonify #type: ignore

def get_date_movies(mysql, data):
    try:
        rating = data.get("rating")
        date = data.get("date")
        curr = mysql.connection.cursor(DictCursor)
        curr.execute(
            "SELECT * FROM Movie WHERE DATE(fk_date) = %s AND rating = %s ORDER BY time;", 
            (date, rating)
        )
        response = curr.fetchall()
        curr.close()
        result = {"status" : "success", "message" : response}
        return jsonify(result)
    except Exception as e:
        return jsonify({"status" : "error" , "message" : f"Error {e}"})

def insert_movie(mysql, movie):

    title = movie.get("title")
    time = movie.get("time")
    rating = movie.get("rating")
    price = movie.get("price")
    venue = movie.get("venue")
    date = movie.get("date")
    if not title or not time or not rating or not price or not venue:
        return jsonify({"error": "Name and type are required"}), 400

    curr = mysql.connection.cursor()
    try:
        curr.execute(
            "INSERT INTO Movie ( fk_date, title, time, rating, price, venue) VALUES (%s, %s, %s, %s, %s, %s)",
            ( date,  title, time, rating, price, venue)
        )
        mysql.connection.commit()
        curr.close()
        return jsonify({"message": f"Movie '{title}' added successfully"}), 200
    except Exception as e:
        print(e)
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500
    
def remove_movie(mysql, movie):

    title = movie.get("title")
    identifier = movie.get("id")
    if not title and identifier:
        return jsonify({"error": "Title required"}), 400


    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(
            "DELETE FROM Movie WHERE title = %s AND fk_entry_number = %s",
            (title, identifier)
        )
        mysql.connection.commit()
        curr.close()
        if rows_affected == 0:
            return jsonify({"message": f"No Movie found with name '{title}'"}), 404
        return jsonify({"message": f"Movie '{title}' removed successfully"}), 200
    except Exception as e:
        mysql.connection.rollback()
        curr.close()
        return jsonify({"error": str(e)}), 500



def update_movie(mysql, movie):
    identifier = movie.get("id")
    if not identifier:
        return jsonify({"error": "Identifier required"}), 400

    movie_data = {key: value for key, value in movie.items() if key != "id" and key !="method" and value != ""}
    if "date" in movie_data:
        movie_data["fk_date"] = movie_data["date"]
        del movie_data["date"]
    if not movie_data:  
        return jsonify({"error": "No valid fields to update"}), 400

    # Create dynamic SQL query and values
    set_clause = ", ".join([f"{key} = %s" for key in movie_data.keys()])
    values = tuple(movie_data.values()) + (identifier,) 
    query = f"UPDATE Movie SET {set_clause} WHERE fk_entry_number = %s"

    curr = mysql.connection.cursor()
    try:
        rows_affected = curr.execute(query, values)
        mysql.connection.commit()
        if rows_affected > 0:
            return jsonify({"message": "Movie updated successfully"}), 200
        else:
            return jsonify({"error": "Movie not found or no changes made"}), 404
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        curr.close()
