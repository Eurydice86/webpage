import json
import requests

url = "https://ehms.squarespace.com/uutiset/?format=json-pretty"

content = requests.get(url).json()

news = content["items"]

output = ""
for n in news:
    output += "<p>" + n["title"] + "</p>\n"
#    if "ehmsry" in n["tags"]:
#        print(n["tags"])

with open("news.html", "w") as file:
    file.write(output)
