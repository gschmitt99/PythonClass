import uuid
import requests

class Processor:
    def __init__(self, access_token, location_id):
        self.access_token = access_token
        self.location_id = location_id
        self.base_url = "https://connect.squareupsandbox.com"

    def create_order(self, order):
        line_items = []

        for entry in order["order"]["cart"]:
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

        order_payload = {
            "idempotency_key": str(uuid.uuid4()),
            "order": {
                "location_id": self.location_id,
                "line_items": line_items
            }
        }

        headers = {
            #'Square-Version': '2024-06-12',  # Use latest version supported
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }

        try:
            print(order_payload)
            response = requests.post(
                f"{self.base_url}/v2/orders",
                headers=headers,
                json=order_payload
            )
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            print("HTTPError:", err)
            print("Status Code:", response.status_code)
            print("Response Text:", response.text)
            raise
      
        return response.json()

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
        print("sending payment payload:", payload)

        try:
            response = requests.post(
                f"{self.base_url}/v2/payments",
                json=payload,
                headers=headers
            )
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            print("HTTPError:", err)
            print("Status Code:", response.status_code)
            print("Response Text:", response.text)
            raise

        return response.json()
