#import pandas as pd
#import numpy as np

class DataAccess:
    def __init__(self, connector):
        self.connector = connector

    def get_categories(self, table_name, where_clause=None):
        data = []
        fields = ["distinct category"]
        df = self.connector.query_data(fields, table_name, where_clause=where_clause)
        for c in df.values:
            data.append(c[0])
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


