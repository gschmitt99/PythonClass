import logging
import requests
import uuid

class Processor:
    def __init__(self, access_token, location_id):
        self.access_token = access_token
        self.location_id = location_id
        #self.base_url = "https://connect.squareupsandbox.com"
        self.base_url = "https://connect.squareup.com"

    def create_order(self, order):
        line_items = []
        internal_order = order["order"]
        display_name = internal_order["customer"]["firstName"] + " " + internal_order["customer"]["lastName"]
        customer_info = {
            "name": display_name,
            "email": internal_order["customer"]["email"],
            "phone": internal_order["customer"]["phone"]
        }

        for entry in internal_order["cart"]["items"]:
            item = {
                "catalog_object_id": entry["variation_id"],
                "quantity": entry["quantity"],
                #"note": entry["note"]
            }

            if entry["modifiers"]:
                item["modifiers"] = [
                    {
                      "catalog_object_id": mod["id"],
                      "quantity": "1"
                    } for mod in entry["modifiers"]
                ]

            line_items.append(item)

        #            "amount": internal_order["cart"]["tax"],
        #            "currency": "USD"
        order_payload = {
            "idempotency_key": str(uuid.uuid4()),
            "order": {
                "location_id": self.location_id,
                "line_items": line_items,
                "taxes": [{
                    "uid": str(uuid.uuid4()),
                    "name": "Sales Tax",
                    "percentage": "8.25",
                    "scope": "ORDER",
                    "type": "ADDITIVE",
                }],
                "fulfillments": [
                    {
                        "type": "PICKUP",
                        "pickup_details": {
                            "recipient": {
                                "display_name": display_name
                            },
                            "schedule_type": "ASAP"
                        }
                    }
                ]
            }
        }

        headers = {
            #'Square-Version': '2024-06-12',  # Use latest version supported
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }

        try:
            logging.info(f"order_payload: {order_payload}")
            response = requests.post(
                f"{self.base_url}/v2/orders",
                headers=headers,
                json=order_payload
            )
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            logging.info("create_order: HTTPError:", err)
            logging.info("create_order: Code:", response.status_code)
            logging.info("create_order: Text:", response.text)
            raise
      
        return response.json(), customer_info

    def process_payment(self, nonce, amount, order_id):
        idempotency_key = str(uuid.uuid4())
        payload = {
            "idempotency_key": idempotency_key,
            "location_id": self.location_id,
            "amount_money": {
                "amount": int(amount),
                "currency": "USD"
            },
            "order_id": order_id,
            "source_id": nonce
        }

        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        logging.info("sending payment payload:", payload)

        try:
            response = requests.post(
                f"{self.base_url}/v2/payments",
                json=payload,
                headers=headers
            )
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            logging.info("process_payment: HTTPError:", err)
            logging.info("process_payment: Status Code:", response.status_code)
            logging.info("process_payment: Response Text:", response.text)
            raise

        return response.json()
