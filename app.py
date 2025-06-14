from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="build")
CORS(app)

@app.route("/data")
def get_data():
   #eventually hook into the database

   sample_data = { "message": "Hello from Python!", "value": 42}
   return jsonify(sample_data)

@app.route("/")
def serve_react():
    return send_from_directory("build", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
