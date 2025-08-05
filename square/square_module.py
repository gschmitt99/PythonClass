import uuid
import requests

class Processor:
    def __init__(self, access_token, location_id):
        self.access_token = access_token
        self.location_id = location_id
        self.base_url = "https://connect.squareupsandbox.com"

    def process_payment(self, nonce, amount):
        idempotency_key = str(uuid.uuid4())
        payload = {
            "source_id": nonce,
            "idempotency_key": idempotency_key,
            "amount_money": {
                "amount": amount,
                "currency": "USD"
            },
            "location_id": self.location_id
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
