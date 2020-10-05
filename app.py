from flask import Flask, jsonify, render_template
from matplotlib import style
import os
import sqlite3

# Path to sqlite DB
covid_db_path = os.path.join('database','covid_factors_database.sqlite')

# Flask Setup
app = Flask(__name__)

# Homepage
@app.route('/')
def index():
    return render_template("layout.html")

# USA COVID-19 related API
@app.route('/api/v1.0/USA_data')
def complete_data():
    # Connect to sqlite db
    conn = sqlite3.connect(covid_db_path)
    print ("Opened database successfully")
    
    # Extract data
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
        
        # usa_dict[row[4]] = ({'state':row[1], 
        #                     'abbr':row[2],
        #                     'county':row[3],
        #                     'population':row[5],
        #                     'cases': row[7],
        #                     'case rate':row[8],
        #                     'deaths':row[9],
        #                     'death rate': row[10],
        #                     'median income (2018)':row[11],
        #                     'uninsured percent': row[12],
        #                     'fair or poor health percent': row[13],
        #                     'vulnerability index': {'ccvi score':row[6],
        #                                             'socioeconomic status': row[14], 
        #                                             'household composition and disability':row[15],
        #                                             'minority status and language':row[16],
        #                                             'housing type and transportation':row[17],
        #                                             'epidemiological factors':row[18],
        #                                             'healthcare system factors':row[19]}
        #                     })

    # Jsonify result
    j_complete_data_return = jsonify(usa_dict)
    
    # Close DB connection
    conn.close

    # Return data
    return (j_complete_data_return)

# Florida COVID-19 related API
@app.route('/api/v1.0/Florida_data')
def florida_data():
    # Connect to sqlite db
    conn = sqlite3.connect(covid_db_path)
    print ("Opened database successfully")
    
    # Extract data
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
        
        # florida_dict[row[4]] = ({'state':row[1], 
        #                         'abbr':row[2],
        #                         'county':row[3],
        #                         'population':row[5],
        #                         'cases': row[7],
        #                         'case rate':row[8],
        #                         'deaths':row[9],
        #                         'death rate': row[10],
        #                         'median income (2018)':row[11],
        #                         'uninsured percent': row[12],
        #                         'fair or poor health percent': row[13],
        #                         'vulnerability index': {'ccvi score':row[6],
        #                                                 'socioeconomic status': row[14], 
        #                                                 'household composition and disability':row[15],
        #                                                 'minority status and language':row[16],
        #                                                 'housing type and transportation':row[17],
        #                                                 'epidemiological factors':row[18],
        #                                                 'healthcare system factors':row[19]}
        #                     })

    # Jsonify result
    j_florida_data_return = jsonify(florida_dict)
    
    # Close DB connection
    conn.close

    # Return data
    return (j_florida_data_return)

if(__name__=='__main__'):
    app.run(debug=True)