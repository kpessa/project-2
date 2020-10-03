from flask import Flask, jsonify, render_template
from matplotlib import style
import os

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, inspect
# from sqlalchemy.sql import label
import sqlite3

# Create Engine 
# covid_db_path = os.path.join('database','covid_factors_database.sqlite')
# engine = create_engine(f"sqlite:///{covid_db_path}")
# conn = engine.connect()
covid_db_path = os.path.join('database','covid_factors_database.sqlite')

# Flask Setup
app = Flask(__name__)

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
        usa_dict[row[4]] = ({'state':row[1], 
                            'abbr':row[2],
                            'county':row[3],
                            'population':row[5],
                            'ccvi score':row[6],
                            'cases': row[7],
                            'case rate':row[8],
                            'deaths':row[9],
                            'death rate': row[10],
                            'median income (2018)':row[11],
                            'uninsured percent': row[12],
                            'fair or poor health percent': row[13],
                            'socioeconomic status': row[14], 
                            'household composition and disability':row[15],
                            'minority status and language':row[16],
                            'housing type and transportation':row[17],
                            'epidemiological factors':row[18],
                            'healthcare system factors':row[19]})

    # Jsonify result
    j_complete_data_return = jsonify(usa_dict)
    
    conn.close
    return (j_complete_data_return)
    
@app.route('/api/v1.0/Florida_data')
def florida_data():
    conn = sqlite3.connect(covid_db_path)
    print ("Opened database successfully")
    usa_data = conn.execute("SELECT * FROM florida_data;")
    
    # Build dictionary
    florida_dict = {}

    for row in usa_data:
        florida_dict[row[4]] = ({'state':row[1], 
                            'abbr':row[2],
                            'county':row[3],
                            'population':row[5],
                            'ccvi score':row[6],
                            'cases': row[7],
                            'case rate':row[8],
                            'deaths':row[9],
                            'death rate': row[10],
                            'median income (2018)':row[11],
                            'uninsured percent': row[12],
                            'fair or poor health percent': row[13],
                            'socioeconomic status': row[14], 
                            'household composition and disability':row[15],
                            'minority status and language':row[16],
                            'housing type and transportation':row[17],
                            'epidemiological factors':row[18],
                            'healthcare system factors':row[19]})

    # Jsonify result
    j_florida_data_return = jsonify(florida_dict)
    
    conn.close
    return (j_florida_data_return)

if(__name__=='__main__'):
    app.run(debug=True)