import requests
import json
from bs4 import BeautifulSoup
from requests.auth import HTTPBasicAuth


def fetch_all_news():
    url = "https://ehms.fi/uutiset/?format=json-pretty"
    page = requests.get(url)

    if page.status_code == 200:
        page = json.loads(page.content)

    return page["items"]


def filter_news(all_news, tag=None):
    if not tag:
        return list(all_news)
    return [n for n in all_news if tag in n["tags"]]


def get_news(tag=None):
    return filter_news(fetch_all_news(), tag)


if __name__ == "__main__":
    news = get_news("pitkämiekka")
    for n in news:
        print(n["title"])
    news = get_news()
    for n in news:
        print(n["title"])
