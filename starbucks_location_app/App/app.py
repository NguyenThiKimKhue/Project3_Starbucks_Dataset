import pandas as pd
from flask import Flask, jsonify, render_template, redirect, request
from sqlHelper import SQLHelper

#################################################
# Flask Setup
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Remove catching (don't alow the brower to catch any of the html page as we iterate it multiple times)

# SQL Helper
sqlHelper = SQLHelper()

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")

#################################################
# API Routes
#################################################

@app.route("/api/v1.0/bar_data")
def bar_data():
    # Execute queries
    df = sqlHelper.queryBarData()

    # Turn DataFrame into List of Dictionary
    data = df.to_dict(orient="records")
    return jsonify(data)

@app.route("/api/v1.0/table_data")
def table_data():
    # Execute queries
    df = sqlHelper.queryTableData()
    # Turn DataFrame into List of Dictionary
    data = df.to_dict(orient="records")
    return jsonify(data)

@app.route("/api/v1.0/map_data")
def map_data():
    # Execute queries
    df = sqlHelper.queryMapData()
    # Turn DataFrame into List of Dictionary
    data = df.to_dict(orient="records")
    return jsonify(data)


#############################################################

# ELIMINATE CACHING (b/c we iterate on the web pages right after we build)
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == '__main__':
    app.run(debug=True)