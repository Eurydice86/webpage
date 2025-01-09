import requests
import json
from bs4 import BeautifulSoup
from requests.auth import HTTPBasicAuth


def get_news(tag=None):
    url = "https://ehms.fi/uutiset/?format=json-pretty"
    page = requests.get(url)

    if page.status_code == 200:
        page = json.loads(page.content)

    news_list = []
    news = page["items"]
    for n in news:
        if tag:
            if tag in n["tags"]:
                news_list.append(n)
        else:
            news_list.append(n)
    return news_list


if __name__ == "__main__":
    news = get_news("pitkämiekka")
    for n in news:
        print(n["title"])
    news = get_news()
    for n in news:
        print(n["title"])
