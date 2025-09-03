from dal.MysqlConnector import MySQLConnector
from dal.DataAccess import DataAccess
from config.config import Configuration

def create_connector(func):
    db_host = Configuration().get('database', 'host', "raspberrypi")
    db_user = Configuration().get('database', 'user', "greg")
    db_password = Configuration().get('database', 'password', "notapassword")
    db_database = Configuration().get('database', 'database', "smorrsweets")
    def wrapper(*args, **kwargs):
        connector = MySQLConnector(host=db_host, user=db_user, password=db_password,
                                   database=db_database)
        connector.connect()
        dal = DataAccess(connector)

        return func(dal, *args, **kwargs)
    return wrapper

@create_connector
def get_variation_by_pk(dal, variation_pk):
    return dal.get_variation_by_pk(variation_pk)

@create_connector
def get_modifier_by_pk(dal, modifier_pk):
    return dal.get_modifier_by_pk(modifier_pk)

@create_connector
def get_web_menu_categories(dal, is_prod):
    return dal.get_menu_categories("webcategories", is_prod)
    
@create_connector
def get_cat_data(dal, category_id, is_prod):
   return dal.get_items_by_category_id("items", category_id, is_prod)

@create_connector
def get_item_details(dal, item_pk, is_prod):
   return dal.get_item_details(item_pk, is_prod)
