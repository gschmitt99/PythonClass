import logging
#from .DataManager import *
from .DataStore import DataStore

class OrderValidator:
    def __init__(self):
        self.data_store = DataStore("/home/gschmitt/PythonClass/dal/item_variation.dat", "/home/gschmitt/PythonClass/dal/modifier_data.dat")

    def validate_order(self, order_data):
        cart = order_data.get("order", {}).get("cart", [])
        total_price = 0
        total_server_price = 0
        for index, item in enumerate(cart["items"]):
            total_price += int(item["price"]) * int(item["quantity"])
            variation = self.data_store.get_variation_by_pk(item["variation_pk"])
            item["variation_id"] = variation['item_variation_id']
            total_server_price += int(variation['price'])

            for mod in item.get("modifiers", []):
                modifier = self.data_store.get_modifier_by_pk(mod["pk"])
                total_server_price += int(modifier['amount'])

            # Update the cart item's price
            item["server_price"] = round(total_price, 2)

        tax_rate = 0.0825
        server_tax = int(round(round(total_server_price * tax_rate * 100) / 100.0))

        if total_price == total_server_price and cart['tax'] == server_tax:
            price_match = True
        else:
            price_match = False
            logging.info("price mismatch")

        return price_match, total_server_price, server_tax, order_data

    @staticmethod
    def format_email_html(order_data, customer_info):
        lines = order_data['order']['line_items']
        html = f"""
        Hello {customer_info['name']},<br />
        Thank you for your order.  We will get started right away!  Please come by to pick it up.
        Call us at 832 908 2091 for any questions.
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
          <thead>
            <tr>
              <th>Item</th>
              <th>Variation</th>
              <th>Modifier</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
        """

        grand_subtotal = 0

        for item in lines:
            item_name = item.get('name', '')
            variation = item.get('variation_name', '')
            base_price = item.get('base_price_money', {}).get('amount', 0)
            modifiers = item.get('modifiers', [])

            subtotal = base_price
            html += f"<tr><td>{item_name}</td><td>{variation}</td><td>-</td><td>${base_price / 100:.2f}</td></tr>"

            for mod in modifiers:
                mod_name = mod.get('name', '')
                mod_price = mod.get('base_price_money', {}).get('amount', 0)
                subtotal += mod_price
                html += f"<tr><td></td><td></td><td>{mod_name}</td><td>${mod_price / 100:.2f}</td></tr>"

            html += f"<tr><td></td><td></td><td><strong>Subtotal</strong></td><td><strong>${subtotal / 100:.2f}</strong></td></tr>"
            grand_subtotal += subtotal

        # Tax and total
        tax_rate = 0.0825
        tax_amount = int(round(grand_subtotal * tax_rate))
        final_total = grand_subtotal + tax_amount
        
        html += f"<tr><td></td><td></td><td><strong>Tax (8.25%)</strong></td><td><strong>${tax_amount / 100:.2f}</strong></td></tr>"
        html += f"<tr><td></td><td></td><td><strong>Total</strong></td><td><strong>${final_total / 100:.2f}</strong></td></tr>"

        html += "</tbody></table>"

        return html

    @staticmethod
    def format_email_text(order_data):
        lines = order_data['order']['line_items']
        email_table = "Item\tVariation\tModifier\tPrice\n"
        grand_total = 0

        for item in lines:
            item_name = item.get('name', '')
            variation = item.get('variation_name', '')
            base_price = item.get('base_price_money', {}).get('amount', 0)
            modifiers = item.get('modifiers', [])

            subtotal = base_price
            email_table += f"{item_name}\t{variation}\t-\t${base_price / 100:.2f}\n"

            for mod in modifiers:
                mod_name = mod.get('name', '')
                mod_price = mod.get('base_price_money', {}).get('amount', 0)
                subtotal += mod_price
                email_table += f"\t\t{mod_name}\t${mod_price / 100:.2f}\n"

            grand_total += subtotal
            email_table += f"\t\tSubtotal\t${subtotal / 100:.2f}\n"

        tax_rate = 0.0825
        tax_amount = int(round(grand_total * tax_rate))
        final_total = grand_total + tax_amount

        email_table += f"\n\t\tTax (8.25%)\t${tax_amount / 100:.2f}\n"
        email_table += f"\t\tTotal\t${final_total / 100:.2f}\n"

        return email_table
