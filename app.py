from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="build")

@app.route("/")
def serve_react():
    return send_from_directory("build", "index.html")

if __name__ == "__main__":
    app.run(debug=True)
