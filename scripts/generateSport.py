#!/usr/bin/env python3

import datetime
import random


teams = {
   "Notre Dame Football": {
       "sport": "Football",
       "location": "2010 Moose Krause Cir, Notre Dame, IN 46556",
       "conference": "Independent"
   },
   "Notre Dame Lacrosse": {
       "sport": "Lacrosse",
       "location": "Twyckenham Dr, South Bend, IN 46637",
       "conference": "ACC"
   },
   "Notre Dame Women's Basketball": {
       "sport": "Basketball",
       "location":"113 Joyce Center, Notre Dame, IN 46556",
       "conference": "ACC"
   },
    "Notre Dame Men's Basketball": {
       "sport": "Basketball",
       "location":"113 Joyce Center, Notre Dame, IN 46556",
       "conference": "ACC"
   },
   "Notre Dame Hockey": {
       "sport":"Hockey",
       "location":"100 Compton Family Ice Arena, Notre Dame, IN 46556",
       "conference": "B1G"
   },
   "Notre Dame Men's Soccer": {
       "sport":"Soccer",
       "location":"Leahy Dr, Notre Dame, IN 46556",
       "conference": "ACC"
   },
   "Notre Dame Women's Soccer": {
       "sport":"Soccer",
       "location":"Leahy Dr, Notre Dame, IN 46556",
       "conference": "ACC"
   },
   "Notre Dame Baseball": {
       "sport": "Baseball",
       "location": "Notre Dame, IN 46556",
       "conference": "ACC"
   },
   "Purdue Football": {
       "sport":"Football",
       "location":"John R Wooden Dr, West Lafayette, IN 47906",
       "conference": "B1G"
   },
   "Purdue Lacrosse": {
       "sport":"Lacrosse",
       "location":"1410 Cherry Ln West Lafayette, IN 47906",
       "conference": "B1G"
   },
   "Purdue Women's Basketball": {
       "sport": "Basketball",
       "location":"900 John R Wooden Dr, West Lafayette, IN 47907",
       "conference": "B1G"
   },
   "Purdue Men's Basketball": {
       "sport": "Basketball",
       "location":"900 John R Wooden Dr, West Lafayette, IN 47907",
       "conference": "B1G"
   },
   "Purdue Hockey": {
       "sport":"Hockey",
       "location":"610 Purdue Mall, West Lafayette, IN 47907",
       "conference": "B1G"
   },
   "Purdue Men's Soccer": {
       "sport":"Soccer",
       "location": "1350 McCormick Road, West Lafayette, IN 47906",
       "conference": "B1G"
   },
   "Purdue Women's Soccer": {
       "sport":"Soccer",
       "location": "1350 McCormick Road, West Lafayette, IN 47906",
       "conference": "B1G"
   },
   "Purdue Baseball": {
       "sport":"Baseball",
       "location":"Cherry Lane, West Lafayette, IN 47906",
       "conference": "B1G"
   },
   "Indiana Football":{
       "sport":"Football",
       "location":"701 E 17th St, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Lacrosse": {
       "sport":"Lacrosse",
       "location":"1606 N. Fee Lane, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Women's Basketball": {
       "sport":"Basketball",
       "location":"1001 E 17th St, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Men's Basketball": {
       "sport":"Basketball",
       "location":"1001 E 17th St, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Hockey": {
       "sport":"Hockey",
       "location": "2100 S Henderson St, Bloomington, IN 47401",
       "conference": "B1G"
   },
   "Indiana Men's Soccer": {
       "sport":"Soccer",
       "location": "1606 N. Fee Lane, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Women's Soccer": {
       "sport":"Soccer",
       "location":"1606 N. Fee Lane, Bloomington, IN 47408",
       "conference": "B1G"
   },
   "Indiana Baseball": {
       "sport":"Baseball",
       "location":"1873 N. Fee Lane, Bloomington, IN 47408",
       "conference": "B1G"
   }
}


accOpponents = ["Florida State", "Boston College", "Clemson", "Duke", "Georiga Tech", "Virginia", "North Carolina", "Louisville", "Miami", "NC State", "SMU", "Pittsburgh", "Virginia Tech", "Wake Forest", "Syracuse"]
bigTenOpponents = ["Illinois", "Iowa", "Maryland", "Michigan State", "Michigan", "Nebraska", "Northwestern", "Ohio State", "Oregon", "Penn State", "Purdue", "Rutgers", "Indiana", "USC", "UCLA", "Washington", "Wisconsin", "Indiana"]


for team, info in teams.items():
    home_team = team
    if info["conference"] == "ACC":
        opponent = random.choice(accOpponents)
    else:
        opponent = random.choice(bigTenOpponents)
    location = info["location"]