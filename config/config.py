import yaml

class Configuration:

    _instance = None

    def __new__(cls, *args, **kwargs):
       if cls._instance is None:
          cls._instance = super().__new__(cls)
       return cls._instance

    def __init__(self):
       with open("config/config.yaml", "r") as file:
          self._config = yaml.safe_load(file)

    def get(self, group, item, default=None):
        if group in self._config:
            if item in self._config[group]:
                return self._config[group][item]
        return default
