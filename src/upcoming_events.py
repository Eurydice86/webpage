import datetime
import requests
import json
import os

from src import instructor
#import instructor

from dotenv import load_dotenv

load_dotenv()


def upcoming_events(group, days):
    start = datetime.datetime.now().date()
    end = start + datetime.timedelta(days=days)

    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"
    event_url = "events/"
    full_url = base_url + event_url

    events_list = []

    params = {"group_id": group, "start_date": start, "end_date": end}

    response = requests.get(full_url, headers=headers, params=params)
    content = json.loads(response.content)

    events = []
    for c in content:
        c = c.get("event")
        instructor_ids = c.get("instructor_ids")
        names = []

        for id in instructor_ids:
            instr = instructor.instructor(str(id), str(c.get("group_id")))
            if instr:
                names.append(f"{instr.get("first_name")} {instr.get("last_name")}")

        c["instructor_names"] = names

        events.append(c)

    return events


if __name__ == "__main__":

    ue = upcoming_events("28112", 14)
    for e in ue:
        print(json.dumps(e, indent=2))
    """
    comps = upcoming_events("28105", 180)
    for c in comps:
        if c["event_category_id"] == 6878:
            pass#print(json.dumps(c, indent=2))
    """
