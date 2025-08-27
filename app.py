import json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from config.config import Configuration
from dal.DataManager import get_web_menu_categories, get_cat_data, \
   get_item_details
from dal.OrderValidator import OrderValidator
from square.square_module import Processor as Processor
import yaml

is_prod = Configuration().get("env", "isprod", True)
app = Flask(__name__, static_folder="build")
CORS(app)

# the access token was gotten from the application and more or less
# sitting inside square.
# EAAAl20dSP2xH0MFShJcIHXgVCYdVRl_BIaStzTDM3fW0pbUEV-bAtI4n1cX_zGO

processor = Processor(
    access_token="EAAAl20dSP2xH0MFShJcIHXgVCYdVRl_BIaStzTDM3fW0pbUEV-bAtI4n1cX_zGO",
    location_id="LGD3VW4ACB6R1"
)

def calculate_amount(order):
   total = 0
   for cart_item in order.get("cart", []):
      total += cart_item["variation"]["price"]
   return total

# I am not going to actually provide anything here ... it is all going to be in the process-payment function.
#@app.route("/create-order", methods=["POST"])
#def create_order():
#    data = request.get_json()
#    try:
#        result = processor.create_order(data)
#        return jsonify({"success": True})
#    except Exception as e:
#        print("Order Creation failure:", e)
#        return jsonify({"error": "Order Creation failed", "details": str(e)}), 500


@app.route("/process-payment", methods=["POST"])
def process_payment():
    data = request.get_json()
    print(data)
    validator = OrderValidator()
    price_match, total_price, validated_data = validator.validate_order(data)
    if price_match:
        result = processor.create_order(validated_data)
        nonce = data.get("nonce")

        try:
            print("Sending to processor:", {"nonce": nonce, "amount": total_price})
            print("Order Result contains:")
            print(result)
            result = processor.process_payment(nonce, total_price, result['order']['id'])

            #kitchen_ticket = {
            #    "order_id": result["payment"]["order_id"],
            #    "amount": result["payment"]["amount_money"]["amount"],
            #    "timestamp": result["payment"]["created_at"],
            #    "card_brand": result["payment"]["card_details"]["card"]["card_brand"]
            #}

            #return jsonify({"success": True, "kitchen": kitchen_ticket})
            return jsonify({"success": True})

        except Exception as e:
            print("Payment failure:", e)
            return jsonify({"error": "Payment failed", "details": str(e)}), 500

@app.route('/item/<item_pk>', methods=['GET'])
def get_item_dets(item_pk):
   retval = {"message": get_item_details(item_pk, is_prod).to_dict()}
   return json.dumps(retval, default=str)

@app.route('/categorydata/<category_id>', methods=['GET'])
def get_category_data(category_id):
   retval = {"message": get_cat_data(category_id, is_prod)}
   return json.dumps(retval)

@app.route("/data")
def get_data():
   retval = {"message": get_web_menu_categories(is_prod)}
   return json.dumps(retval)

# just showing a second hook
@app.route("/data1")
def get_data1():
    retval = {"message": "a test1"}
    return json.dumps(retval)

@app.route("/env")
def get_env():
    if is_prod: retval = {"message": "prod"}
    else: retval = {"message": "test"}
    return json.dumps(retval)

#@app.route("/")
#def serve_react():
#    return send_from_directory("build", "index.html")

if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=5000, debug=True, ssl_context="adhoc")
    app.run(host="0.0.0.0", port=5000, debug=True)
