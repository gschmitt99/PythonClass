# PythonClass
Repo for Learnings

The frontend here is started by from my-app:
npm start

to configure the packages in python:
might need to:
#this will give a venv creation capability
sudo apt install python3.12-venv

#create the virtual env for the flask server
python3 -m venv flask_venv

#this will need to be done each 'new' time into the environment
source flask_env/bin/activate

#these were the packages that were installed
pip install flask
pip install flask_cors

#to startup the python environment (or specifically flask server)
source flask_env/bin/activate
python3 app.py
