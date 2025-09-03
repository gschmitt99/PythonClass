#import pandas as pd
#import numpy as np

class Modifier:
    REQUIRED_FIELDS = ["pk", "id", "name", "amount", "ordinal", "is_deleted", "updated_at", "created_at"]

    def __init__(self, pk, id, name, amount, ordinal, is_deleted, updated_at, created_at):
        self.pk = pk
        self.id = id
        self.name = name
        self.amount = amount
        self.ordinal = ordinal
        self.is_deleted = is_deleted
        self.updated_at = updated_at
        self.created_at = created_at

    def to_dict(self):
        return {
            "pk": self.pk,
            "id": self.id,
            "name": self.name,
            "amount": self.amount
        }

    def __repr__(self):
        return f"Modifier(name='{self.name}', amount={self.amount})"


class ModifierList:
    REQUIRED_FIELDS = ["pk", "modifier_list_id", "name", "ordinal", "selection_type", "updated_at", "created_at",
     "is_deleted"]

    def __init__(self, pk, modifier_list_id, name, selection_type, ordinal, is_deleted, updated_at, created_at, modifiers):
        self.pk = pk
        self.modifier_list_id = modifier_list_id
        self.name = name
        self.selection_type = selection_type
        self.ordinal = ordinal
        self.is_deleted = is_deleted
        self.updated_at = updated_at
        self.created_at = created_at
        self.modifiers = modifiers  # list of Modifier objects

    def to_dict(self):
        return {
            "pk": self.pk,
            "name": self.name,
            "selection_type": self.selection_type,
            "modifiers": [m.to_dict() for m in self.modifiers]
        }

    def __repr__(self):
        return f"ModifierList(name='{self.name}', count={len(self.modifiers)})"


class Variation:
    REQUIRED_FIELDS = ["pk", "item_variation_id", "name", "price", "ordinal", "updated_at"]

    def __init__(self, pk, item_variation_id, name, ordinal, price, updated_at):
        self.pk = pk
        self.item_variation_id = item_variation_id
        self.name = name
        self.ordinal = ordinal
        self.price = price
        self.updated_at = updated_at

    def to_dict(self):
        return {
            "pk": self.pk,
            "id": self.item_variation_id,
            "name": self.name,
            "price": self.price
        }
    def __repr__(self):
        return f"Variation(name='{self.name}', price={self.price})"

class Image:
    REQUIRED_FIELDS = ["pk", "image_id", "url"]

    def __init__(self, pk, image_id, url):
        self.pk = pk
        self.image_id = image_id
        self.url = url

    def __repr(self):
        return F"url={self.image_id}"

    def to_dict(self):
       # Note yes I know are passing the image_id in place of the url
       # change this namd if am ready to make it something proper.
       return {
           "pk": self.pk,
           "image_id": self.image_id,
           "url": self.image_id,
       }

class Item:
    REQUIRED_FIELDS = ["pk", "item_id", "category_id", "name", "description", "price"]

    def __init__(self, pk, item_id, category_id, name, description, price, variations, modifier_lists, images):
        self.pk = pk
        self.item_id = item_id
        self.category_id = category_id
        self.name = name
        self.description = description
        self.price = price
        self.variations = variations  # list of Variation objects
        self.modifier_lists = modifier_lists  # list of ModifierList objects
        self.images = images

    def __repr__(self):
        return f"Item(name='{self.name}', price={self.price}, variations={len(self.variations)}, modifiers={len(self.modifier_lists)} images={len(self.images)})"

    def to_dict(self):
        return {
            "pk": self.pk,
            "id": self.item_id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "variations": [v.to_dict() for v in self.variations],
            "modifier_lists": [ml.to_dict() for ml in self.modifier_lists],
            "images": [i.to_dict() for i in self.images]
        }


class DataAccess:
    def __init__(self, connector):
        self.connector = connector

    def get_items_by_category_id(self, view_name, category_pk, is_prod):
        data = []
        fields = ['pk', 'name', 'description', 'price']

        # Step 1: Get base item data
        df_items = self.connector.query_data(fields, view_name,
                                             where_clause=f"category_pk={category_pk} and is_prod={is_prod}")

        # Step 2: Get item ? image_pk mapping
        df_item_images = self.connector.query_data(['item_pk', 'image_pk'], 'v_item_images')
        item_to_image_pks = df_item_images.groupby('item_pk')['image_pk'].apply(list).to_dict()

        # Step 3: Get image_pk ? url mapping
        df_images = self.connector.query_data(['pk', 'image_id'], 'v_image')
        image_pk_to_url = dict(zip(df_images['pk'], df_images['image_id']))

        # Step 4: Build enriched item list
        for i in df_items.values:
            item_pk = i[0]
            image_pks = item_to_image_pks.get(item_pk, [])
            image_urls = [image_pk_to_url.get(pk) for pk in image_pks if pk in image_pk_to_url]

            data.append({
                "pk": item_pk,
                "name": i[1],
                "description": i[2],
                "price": float(i[3]),
                "images": image_urls  # always a list, even if empty
            })

        return data


    def get_modifier_list_by_pk(self, modifier_list_pk):
        ml_df = self.connector.query_data(ModifierList.REQUIRED_FIELDS, "v_modifier_list",
                                          where_clause=f"pk='{modifier_list_pk}'")
        if ml_df.empty:
            raise ValueError(f"No modifier list found for pk: {modifier_list_pk}")
        if len(ml_df) > 1:
            raise ValueError(f"Too many modifier lists for pk: {modifier_list_pk}")

        row = ml_df.iloc[0]
        ml_data = {field: row[field] for field in ModifierList.REQUIRED_FIELDS}
        return ModifierList(**ml_data)

    def get_variation_by_pk(self, variation_pk):
        variation_df = self.connector.query_data(Variation.REQUIRED_FIELDS, "v_item_variation",
                                                 where_clause=f"pk='{variation_pk}'")
        if variation_df.empty:
            raise ValueError(f"No variation found for pk: {variation_pk}")
        if len(variation_df) > 1:
            raise ValueError(f"Too many variations for pk: {variation_pk}")

        row = variation_df.iloc[0]
        variation_data = {field: row[field] for field in Variation.REQUIRED_FIELDS}
        return Variation(**variation_data)

    def get_modifier_by_pk(self, modifier_pk):
        modifier_df = self.connector.query_data(Modifier.REQUIRED_FIELDS, "v_modifier",
                                                where_clause=f"pk={modifier_pk}")

        if modifier_df.empty:
            raise ValueError(f"No modifier found for pk: {modifier_pk}")
        if len(modifier_df) > 1:
            raise ValueError(f"Too many modifiers for pk: {modifier_pk}")

        row = modifier_df.iloc[0]
        modifier_data = {field: row[field] for field in Modifier.REQUIRED_FIELDS}
        return Modifier(**modifier_data)

    def get_item_details(self, item_pk, is_prod):
        # 1. Item
        item_df = self.connector.query_data(Item.REQUIRED_FIELDS, "v_item", where_clause=f"pk={item_pk} and is_prod={is_prod}")
        if item_df.empty:
            return None
        item_data = item_df.iloc[0]

        # 2. Variations
        variation_fields = ["pk", "item_variation_id", "name", "ordinal", "price", "updated_at"]
        variation_df = self.connector.query_data(variation_fields + ["item_pk"], "v_item_variation",
                                                 where_clause=f"item_pk='{item_data['pk']}' and is_prod={is_prod}")
        variations = [
            Variation(**{field: row[field] for field in variation_fields})
            for _, row in variation_df.iterrows()
        ]

        # 3. Modifier Lists
        iml_fields = ["pk", "item_pk", "modifier_list_pk"]
        iml_df = self.connector.query_data(iml_fields, "v_item_modifier_list",
                                           where_clause=f"item_pk='{item_data['pk']}'")

        modifier_lists = []
        for _, link in iml_df.iterrows():
            ml_pk = link["modifier_list_pk"]

            ml_df = self.connector.query_data(ModifierList.REQUIRED_FIELDS, "v_modifier_list", \
                                              where_clause=f"pk='{ml_pk}' and is_prod={is_prod}")
            ml_row = ml_df.iloc[0]

            mod_df = self.connector.query_data(Modifier.REQUIRED_FIELDS + ["modifier_list_pk"], "v_modifier",
                                               where_clause=f"modifier_list_pk='{ml_pk}' and is_prod={is_prod}")
            modifiers = [
                Modifier(**{field: m[field] for field in Modifier.REQUIRED_FIELDS})
                for _, m in mod_df.iterrows()
            ]

            modifier_lists.append(
                ModifierList(
                    pk=ml_row["pk"],
                    modifier_list_id=ml_row["modifier_list_id"],
                    name=ml_row["name"],
                    selection_type=ml_row["selection_type"],
                    ordinal=ml_row["ordinal"],
                    is_deleted=ml_row["is_deleted"],
                    updated_at=ml_row["updated_at"],
                    created_at=ml_row["created_at"],
                    modifiers=modifiers
                )
            )

        # 4. Images
        image_fields = ["pk", "item_pk", "image_pk"]
        ii_df = self.connector.query_data(image_fields, "v_item_images",
                                           where_clause=f"item_pk='{item_data['pk']}'")

        image_lists = []
        for _, link in ii_df.iterrows():
            image_pk = link["image_pk"]

            image_df = self.connector.query_data(Image.REQUIRED_FIELDS, "v_image",
                                               where_clause=f"pk='{image_pk}'")
            image_lists = [
                Image(**{field: m[field] for field in Image.REQUIRED_FIELDS})
                for _, m in image_df.iterrows()
            ]

        # 5. Compose final item
        item_obj = Item(
            pk=item_data["pk"],
            item_id=item_data["item_id"],
            category_id=item_data["category_id"],
            name=item_data["name"],
            description=item_data["description"],
            price=item_data["price"],
            variations=variations,
            modifier_lists=modifier_lists,
            images=image_lists
        )

        return item_obj

    def get_menu_categories(self, table_name, is_prod):
        data = []
        fields = ['id', 'category']
        df = self.connector.query_data(fields, table_name, where_clause=f"is_prod={is_prod}")
        for c in df.values:
           data.append({
               "pk": c[0],
               "name": c[1]})
        return data

    def get_max_dates_by_source(self):
        data = {}
        query = """
        SELECT 'expenses', SOURCE as source, MAX(DATE) as max_date from expenses GROUP BY SOURCE
        union
        SELECT 'staging', SOURCE as source, MAX(DATE) as max_date from expenses_staging GROUP BY SOURCE;
               """
        df = self.connector.query_direct(query)

        for c in df.values:
            data[c[0]+'|'+c[1]] = c[2]
        return data

    def get_gross_sales_by_filter(self, table_name, where_clause):
        fields = ["round(SUM(GrossSales),2)"]
        return self.connector.query_data(fields, table_name, where_clause=where_clause)


