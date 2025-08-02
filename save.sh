# The purpose of this script is to create a backup of the necessary files for the day

tar -cvjf ../save/$(date +%Y%m%d-%H%M).tbz app.py dal my-app/src
