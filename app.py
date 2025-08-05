import json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from config.config import Configuration
from dal.DataManager import get_categories_by_source, get_web_menu_categories, get_cat_data, \
   get_item_details
from square.square_module import Processor as RealProcessor
import yaml

app = Flask(__name__, static_folder="build")
CORS(app)

class DebugProcessor:
    def __init__(self, *args, **kwargs):
        print("[Processor Debug] Initializing with args:", args)
        print("[Processor Debug] Initializing with kwargs:", kwargs)
        try:
            self.instance = RealProcessor(*args, **kwargs)
        except Exception as e:
            print("[Processor Debug] Constructor failed:", e)
            raise

    def process_payment(self, nonce, amount):
        print("[Processor Debug] process_payment called with:", nonce, amount)
        return self.instance.process_payment(nonce, amount)

# the access token was gotten from the application and more or less
# sitting inside square.
# EAAAl20dSP2xH0MFShJcIHXgVCYdVRl_BIaStzTDM3fW0pbUEV-bAtI4n1cX_zGO

processor = DebugProcessor(
    access_token="EAAAl20dSP2xH0MFShJcIHXgVCYdVRl_BIaStzTDM3fW0pbUEV-bAtI4n1cX_zGO",
    location_id="LGD3VW4ACB6R1"
)

def calculate_amount(order):
   total = 0
   for cart_item in order.get("cart", []):
      total += cart_item["variation"]["price"]
   return total

@app.route("/process-payment", methods=["POST"])
def process_payment():
    data = request.get_json()
    nonce = data.get("nonce")
    amount = calculate_amount(data.get("order"))

    if not nonce or not amount:
        return jsonify({"error": "Missing payment info"}), 400

    try:
        print("Sending to processor:", {"nonce": nonce, "amount": amount})
        result = processor.process_payment(nonce, amount)

        kitchen_ticket = {
            "order_id": result["payment"]["order_id"],
            "amount": result["payment"]["amount_money"]["amount"],
            "timestamp": result["payment"]["created_at"],
            "card_brand": result["payment"]["card_details"]["card"]["card_brand"]
        }

        return jsonify({"success": True, "kitchen": kitchen_ticket})

    except Exception as e:
        print("Payment failure:", e)
        return jsonify({"error": "Payment failed", "details": str(e)}), 500

@app.route('/item/<item_pk>', methods=['GET'])
def get_item_dets(item_pk):
   retval = {"message": get_item_details(item_pk).to_dict()}
   return json.dumps(retval, default=str)

@app.route('/categorydata/<category_id>', methods=['GET'])
def get_category_data(category_id):
   retval = {"message": get_cat_data(category_id)}
   return json.dumps(retval)

@app.route("/data")
def get_data():
   #eventually hook into the database

   #sample_data = { "message": "Hello from Python!", "value": 42}
   #sample_data = get_categories_by_source("American Express", "expenses")
   #sample_data = get_web_menu_categories()
   #print(sample_data)
   retval = {"message": get_web_menu_categories()}
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
    #app.run(host="0.0.0.0", port=5000, debug=True, ssl_context="adhoc")
    app.run(host="0.0.0.0", port=5000, debug=True)
