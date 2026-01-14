import csv
import logging

class DataStore:
    def __init__(self, variation_file, modifier_file):
        self.variation_map = self._load_file(variation_file)
        self.modifier_map = self._load_file(modifier_file)

    def _load_file(self, file_path):
        data_map = {}
        with open(file_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f, delimiter=';')
            for row in reader:
                item_id = row.get('pk')
                if item_id:
                    data_map[item_id] = row
        return data_map

    def get_variation_by_pk(self, pk):
        return self.variation_map.get(str(pk))

    def get_modifier_by_pk(self, pk):
        return self.modifier_map.get(str(pk))
