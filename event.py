import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()
def event(event_id):
    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"

    event_url = "events/" + event_id
    full_url = base_url + event_url
    response = requests.get(full_url, headers=headers)
    content = json.loads(response.content)

    event = content.get("event")

    name = event.get("name")
    starts_at = event.get("starts_at")
    ends_at = event.get("ends_at")
    event_category_id = event.get("event_category_id")
    group_id = event.get("group_id")
    venue_id = event.get("venue_id")
    course_id = event.get("course_id") if event.get("course_id") else "-"

    event_dict = {
        "event_id": event_id,
        "event_name": name,
        "starts_at": starts_at,
        "ends_at": ends_at,
        "event_category_id": event_category_id,
        "group_id": group_id,
        "venue_id": venue_id,
        "course_id": course_id,
    }

    participants_list = []
    participations = content.get("participations")
    for p in participations:
        participation_dict = {
            "member_id": str(p.get("member_id")),
            "event_id": event_id,
            "confirmed": True if p.get("confirmed_at") else False,
        }
        participants_list.append(participation_dict)

    return (event_dict, participants_list)


if __name__ == "__main__":
    result = event("6582604")
    result = event("2710707")

    print(json.dumps(result, indent=2))
