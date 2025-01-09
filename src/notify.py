import json
import datetime
import os
import glob

date = "2024-12-31T10:30:00.000+02:00"
date = date[:-6]
print(date)
print(datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%f"))
dir = "../data/"
files = glob.glob(os.path.join(dir, "*.json"))

f = files[2]
print(f)
with open(f, "r") as input_file:
    data = json.loads(input_file)
print(json.dumps(data, indent=2))
