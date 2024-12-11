import mysql.connector

# Establish the connection
db = mysql.connector.connect(
    host="localhost",
    user="mlaning",
    password="1r1sh",
    database="mlaning"
)

cursor = db.cursor()

# Define the mapping of venues to addresses
venue_address_mapping = {
    "AMC South Bend 16": "450 W Chippewa Ave, South Bend, IN 46614",
    "Cinemark South Bend Movies 14": "910 W Edison Rd, Mishawaka, IN 46545",
    "Debartolo Performing Arts Center": "100 Performing Arts Center, Notre Dame, IN 46556",
    "Wonderland Cinema": "402 N Front St, Niles, MI 49120",
    "Vickers Theatre": "6 N Elm St, Three Oaks, MI 49128",
    "Celebration Cinema Benton": "1468 Cinema Way, Benton Harbor, MI 49022"
}

# Update each venue with the correct address
for venue, address in venue_address_mapping.items():
    cursor.execute("""
        UPDATE Movie
        SET venue = %s
        WHERE venue = %s
    """, (address, venue))

# Commit the changes and close the connection
db.commit()
cursor.close()
db.close()

print("Venues updated successfully.")
