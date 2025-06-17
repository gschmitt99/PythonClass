import mysql.connector
import pandas as pd

class MySQLConnector:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            print("Connected to MySQL")
        except mysql.connector.Error as err:
            print("Error:", err)

    def close(self):
        if self.connection:
            self.connection.close()
            print("Connection closed")

    def data_exists(self, table_name, condition):
        if not self.connection:
            print("Not connected to MySQL")
            return
        cursor = self.connection.cursor()
        query = f"SELECT EXISTS(SELECT 1 FROM {table_name} WHERE {condition})"
        cursor.execute(query)
        exists = cursor.fetchone()[0]
        cursor.close()
        return exists

    def insert_data(self, table, data):
        if not self.connection:
            print("Not connected to MySQL")
            return

        cursor = self.connection.cursor()
        placeholders = ', '.join(['\'%s\''] * len(data))
        columns = ', '.join(data.keys())
        query_format = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        try:
            query = query_format % tuple(data.values())
            #the below didn't seem to work; not sure just why but the above does.
            #cursor.execute(query_format, tuple(data.values()))
            cursor.execute(query)
            self.connection.commit()
            print("Data inserted successfully")
        except mysql.connector.Error as err:
            print("Error:", err)
            self.connection.rollback()
        finally:
            cursor.close()

    def query_direct(self, query):
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            return pd.DataFrame(rows)
        except mysql.connector.Error as err:
            print("Error:", err)
        finally:
            cursor.close()

    def query_data(self, fields, table, where_clause="", group_by=""):
        if not self.connection:
            print("Not connected to MySQL")
            return
        cursor = self.connection.cursor()
        string_fields = ','.join(fields)
        if where_clause is not None and len(where_clause) > 0:
            query = f"SELECT {string_fields} from {table} where {where_clause}"
        else:
            query = f"SELECT {string_fields} from {table}"

        if group_by is not None and len(group_by) > 0:
            query += f" group by {group_by}"
        try:
            cursor.execute(query)
            rows = cursor.fetchall()
            df = pd.DataFrame(rows,columns=fields)
            return df

        except mysql.connector.Error as err:
            print("Error:", err)
        finally:
            cursor.close()

