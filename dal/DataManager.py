from dal.MysqlConnector import MySQLConnector
from dal.DataAccess import DataAccess
from config.config import Configuration

def create_connector(func):
    db_host = Configuration()._config['database']['host']
    db_user = Configuration()._config['database']['user']
    db_password = Configuration()._config['database']['password']
    db_database = Configuration()._config['database']['database']
    def wrapper(*args, **kwargs):
        #connector = MySQLConnector(host="raspberrypi", user="greg", password="siboco1T",
        #                           database="personal")
        connector = MySQLConnector(host=db_host, user=db_user, password=db_password,
                                   database=db_database)
        connector.connect()
        dal = DataAccess(connector)

        return func(dal, *args, **kwargs)
    return wrapper

@create_connector
def get_categories_by_source(dal, source, table):

    retval = ""
    where_clause = f"source='{source}'"
    return dal.get_categories(table, where_clause)
    #for cat in categories:
    #    retval += cat + "\n"
    #return retval
