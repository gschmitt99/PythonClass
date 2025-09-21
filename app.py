from datetime import datetime
import json
import logging
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from config.config import Configuration
#from dal.DataManager import get_web_menu_categories, get_cat_data, \
#   get_item_details
from dal.OrderValidator import OrderValidator
from postmarker.core import PostmarkClient
from square.square_module import Processor as Processor
import yaml

is_prod = Configuration().get("env", "isprod", True)
app = Flask(__name__, static_folder="build")
CORS(app)

logging.basicConfig(level=logging.INFO)

# the access token was gotten from the application and more or less
# sitting inside square.
# EAAAl20dSP2xH0MFShJcIHXgVCYdVRl_BIaStzTDM3fW0pbUEV-bAtI4n1cX_zGO
#    location_id="LGD3VW4ACB6R1"

#EAAAl5TwTQXrtai8wrCcgSOEMIXGGtqgeMp4G0oDXMg2LNCb1QBj7u91ScLXH4zc
processor = Processor(
    access_token="EAAAl5TwTQXrtai8wrCcgSOEMIXGGtqgeMp4G0oDXMg2LNCb1QBj7u91ScLXH4zc",
    location_id="LE6EZZN9R77KP"
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

def send_emails(email_table, customer_info):
    client = PostmarkClient(server_token='475f6e94-6c5f-4397-8718-ed891b3454c8')
    client.emails.send(
        From='orders@smorrsweets.com',
        To='paula@smorrsweets.com',
        Subject='Order Confirmation',
        HtmlBody=email_table,
        TextBody='Your order is confirmed!',
        MessageStream='outbound'
    )
    client.emails.send(
        From='orders@smorrsweets.com',
        To=customer_info['email'],
        Subject='Order Confirmation',
        HtmlBody=email_table,
        TextBody='Your order is confirmed!',
        MessageStream='outbound'
    )

@app.route("/process-payment", methods=["POST"])
def process_payment():
    data = request.get_json()
    logging.info("received /process-payment")
    logging.info(data)
    validator = OrderValidator()
    logging.info(f"order data before validation: {data}")
    price_match, total_price, calculated_tax, validated_data = validator.validate_order(data)
    logging.info(f"order data after validation: {data}")
    if price_match:
        result, customer_info = processor.create_order(validated_data)
        nonce = data.get("nonce")

        try:
            logging.info("Sending to processor:", {"nonce": nonce, "amount": total_price})
            logging.info(f"Order Result contains: {result}")
            if 'order' in result:
                email_table = OrderValidator.format_email_html(result, customer_info)

                result = processor.process_payment(nonce, total_price+calculated_tax, result['order']['id'])
                send_emails(email_table, customer_info)
                logging.info("process-payemnt: success")
                logging.info(f"process_payment result: {result}")
                return jsonify({"success": True})
            else:
                return jsonify({"success": False})

        except Exception as e:
            logging.info("Payment failure:", e)
            return jsonify({"error": "Payment failed", "details": str(e)}), 500

#@app.route('/item/<item_pk>', methods=['GET'])
#def get_item_dets(item_pk):
#   retval = {"message": get_item_details(item_pk, is_prod).to_dict()}
#   return json.dumps(retval, default=str)

#@app.route('/categorydata/<category_id>', methods=['GET'])
#def get_category_data(category_id):
#   retval = {"message": get_cat_data(category_id, is_prod)}
#   return json.dumps(retval)

#@app.route("/data")
#def get_data():
#   retval = {"message": get_web_menu_categories(is_prod)}
#   return json.dumps(retval)

# just showing a second hook
#@app.route("/data1")
#def get_data1():
#    retval = {"message": "a test1"}
#    return json.dumps(retval)

@app.route("/env")
def get_env():
    if is_prod: retval = {"message": "prod"}
    else: retval = {"message": "test"}
    return json.dumps(retval)

@app.route("/contact", methods=["POST"])
def contact():
    try:
        data = request.json  # Expecting JSON from frontend

        # Format the message
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        entry = (
            f"\n---\nTime: {timestamp}\n"
            f"Name: {data.get('firstName', '')} {data.get('lastName', '')}\n"
            f"Phone: {data.get('phone', '')}\n"
            f"Email: {data.get('email', '')}\n"
            f"Subject: {data.get('subject', '')}\n"
            f"Message: {data.get('message', '')}\n"
        )

        # Append to flat file
        with open("messages.txt", "a") as f:
            f.write(entry)

        return {"status": "success", "message": "Message saved."}, 200
    except Exception as e:
        error_msg = str(e)
        print(error_msg)
        print(e)
        return jsonify({"status": "error", "message": error_msg}), 500

#@app.route("/")
#def serve_react():
#    return send_from_directory("build", "index.html")

if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=5000, debug=True, ssl_context="adhoc")
    app.run(host="0.0.0.0", port=5000, debug=True)
