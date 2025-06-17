import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from config.config import Configuration
from dal.DataManager import get_categories_by_source
import yaml

app = Flask(__name__, static_folder="build")
CORS(app)

@app.route("/data")
def get_data():
   #eventually hook into the database

   #sample_data = { "message": "Hello from Python!", "value": 42}
   sample_data = get_categories_by_source("American Express", "expenses")
   #print(sample_data)
   retval = {"message": sample_data}
   return json.dumps(retval)

# just showing a second hook
@app.route("/data1")
def get_data1():
    retval = {"message": "a test1"}
    return json.dumps(retval)

#@app.route("/")
#def serve_react():
#    return send_from_directory("build", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
