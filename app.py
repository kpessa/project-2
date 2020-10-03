from flask import Flask, jsonify, render_template
from matplotlib import style
import os

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, inspect
# from sqlalchemy.sql import label
import sqlite3

# Flask Setup
app = Flask(__name__)

# Create Engine 
# covid_db_path = os.path.join('database','covid_factors_database.sqlite')
# engine = create_engine(f"sqlite:///{covid_db_path}")
# conn = engine.connect()
covid_db_path = os.path.join('database','covid_factors_database.sqlite')


@app.route('/')
def index():
    # return render_template("layout.html")
    return "<h1>Homepage</h1>"

@app.route('/api/v1.0/USA_data')
def complete_data():
    conn = sqlite3.connect(covid_db_path)
    print ("Opened database successfully")
    usa_data = conn.execute("SELECT * FROM complete_data;")
    # Build dictionary
    usa_dict = {}

    for row in usa_data:
        usa_dict[row[4]]= (f"{'state':row[1], 'abbr':row[2]}")
    conn.close
    return "<h1>Complete Data</h1>"

@app.route('/api/v1.0/Florida_data')
def florida_data():
    conn = sqlite3.connect(covid_db_path)
    print ("Opened database successfully")

    conn.close
    return "<h1>Florida Data</h1>"

if(__name__=='__main__'):
    app.run(debug=True)