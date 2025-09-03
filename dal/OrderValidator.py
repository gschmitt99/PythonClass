from .DataManager import *

class OrderValidator:
    def __init__(self):
        pass

    def validate_order(self, order_data):
        cart = order_data.get("order", {}).get("cart", [])
        total_price = 0
        total_server_price = 0
        for index, item in enumerate(cart):
            total_price += int(item["price"]) * int(item["quantity"])
            variation = get_variation_by_pk(item["variation_pk"])
            item["variation_id"] = variation.item_variation_id
            total_server_price += variation.price

            for mod in item.get("modifiers", []):
                modifier = get_modifier_by_pk(mod["pk"])
                total_server_price += modifier.amount

            # Update the cart item's price
            item["server_price"] = round(total_price, 2)

        if (total_price == total_server_price):
            price_match = True
            print ("price match")
        else:
            price_match = False
            print ("price mismatch")


        return price_match, total_server_price, order_data
