import requests
import json
import os

BASE_URL = "http://phoenix2025:5000"

# Destination files
CATEGORY_LIST_FILE = "../mock/categories.json"
CATEGORY_ITEMS_FILE = "../mock/category_items.json"
ITEM_DETAILS_FILE = "../mock/items.json"


def fetch_json(url):
    try:
        print(f"➡️ Fetching: {url}")
        response = requests.get(url)
        response.raise_for_status()
        return response.json().get("message", None)
    except requests.RequestException as err:
        print(f"Error fetching {url}: {err}")
        return None


def harvest_catalog():
    category_list_raw = fetch_json(f"{BASE_URL}/data")
    if not category_list_raw:
        print("No categories found.")
        return

    # Normalize category list (each is {pk: name})
    normalized_categories = []
    for entry in category_list_raw:
        pk, name = list(entry.items())[0]
        normalized_categories.append({"pk": pk, "name": name})

    # Save raw category list
    with open(CATEGORY_LIST_FILE, "w") as f:
        json.dump(normalized_categories, f, indent=2)
    print(f"✅ Saved {CATEGORY_LIST_FILE}")

    category_items = {}
    item_details = {}

    for category in normalized_categories:
        pk = category["pk"]
        name = category["name"]
        print(f"\n📂 Getting category '{name}' (pk={pk})")

        items_raw = fetch_json(f"{BASE_URL}/categorydata/{pk}")
        if not items_raw:
            print(f"⚠️ Skipped category '{name}' due to empty response.")
            continue

        items = []
        for item_entry in items_raw:
            item_pk, item_name = list(item_entry.items())[0]
            items.append({"pk": item_pk, "name": item_name})

        category_items[pk] = items
        print(f"📦 Fetched {len(items)} items in '{name}'")

        # Fetch full item details
        for item in items:
            item_pk = item["pk"]
            detail = fetch_json(f"{BASE_URL}/item/{item_pk}")
            if detail:
                item_details[item_pk] = detail

    # Save items by category
    with open(CATEGORY_ITEMS_FILE, "w") as f:
        json.dump(category_items, f, indent=2)
    print(f"\n✅ Saved {CATEGORY_ITEMS_FILE}")

    # Save full item detail map
    with open(ITEM_DETAILS_FILE, "w") as f:
        json.dump(item_details, f, indent=2)
    print(f"✅ Saved {ITEM_DETAILS_FILE}")

if __name__ == "__main__":
    harvest_catalog()
