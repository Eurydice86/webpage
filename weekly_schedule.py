import groups
import events_in_group
import event

import datetime
import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()


def Sort(sub_li):

    # reverse = None (Sorts in Ascending order)
    # key is set to sort using second element of
    # sublist lambda has been used
    sub_li.sort(key=lambda x: x[2])
    return sub_li


def upcoming_events():
    start = datetime.datetime.now().date()
    end = start + datetime.timedelta(days=6)

    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"
    event_url = "events/"
    full_url = base_url + event_url

    events_list = []

    groups = [
        "28105",
        "28121",
        "38874",
        "49024",
        "48332",
        "28115",
        "28114",
        "28112",
        "31363",
        "38728",
    ]
    for g in groups:
        params = {"group_id": g, "start_date": start, "end_date": end}

        response = requests.get(full_url, headers=headers, params=params)
        content = json.loads(response.content)

        events = []
        for c in content:
            c = c.get("event")
            events.append([g, str(c.get("name")), str(c.get("starts_at"))])
        events_list += events

    return Sort(events_list)


def upcoming_tournaments():
    start = datetime.datetime.now().date()
    end = start + datetime.timedelta(days=180)

    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"
    event_url = "events/"
    full_url = base_url + event_url

    events_list = []

    params = {
        "group_id": "28105",
        "start_date": start,
        "end_date": end,
        #"venue_id": "126179",
    }

    response = requests.get(full_url, headers=headers, params=params)
    content = json.loads(response.content)

    events = []
    for c in content:
        c = c.get("event")
        events.append(["28105", str(c.get("name")), str(c.get("starts_at"))])
    events_list += events

    return Sort(events_list)


def beautify_output(input):
    output = ""
    for line in input:
        time = datetime.datetime.strptime(line[2][:-6], "%Y-%m-%dT%H:%M:%S.%f")
        output += "<p>" + line[1] + ": " + str(time) + "</p>\n"
    return output


if __name__ == "__main__":
    with open("weekly_schedule.html", "w") as file:
        file.write(beautify_output(upcoming_events()))
