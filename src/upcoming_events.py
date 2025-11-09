import datetime
import requests
import json
import os

from src import instructor
#import instructor

from dotenv import load_dotenv

load_dotenv()


def upcoming_events(group, days):
    try:
        start = datetime.datetime.now().date()
        end = start + datetime.timedelta(days=days)

        myclub_token = os.getenv("MC_TOKEN")
        if not myclub_token:
            raise ValueError("MC_TOKEN environment variable not set")

        headers = {"X-myClub-token": myclub_token}

        base_url = "https://ehms.myclub.fi/api/"
        event_url = "events/"
        full_url = base_url + event_url

        params = {"group_id": group, "start_date": start, "end_date": end}

        response = requests.get(full_url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        content = response.json()

        events = []
        for c in content:
            try:
                c = c.get("event")
                instructor_ids = c.get("instructor_ids", [])
                names = []

                for id in instructor_ids:
                    try:
                        instr = instructor.instructor(str(id), str(c.get("group_id")))
                        if instr:
                            names.append(f"{instr.get('first_name')} {instr.get('last_name')}")
                    except Exception as e:
                        print(f"Error fetching instructor {id}: {e}")
                        continue

                c["instructor_names"] = names
                events.append(c)
            except Exception as e:
                print(f"Error processing event: {e}")
                continue

        return events
    except requests.RequestException as e:
        print(f"Error fetching events from API: {e}")
        return []
    except Exception as e:
        print(f"Error in upcoming_events: {e}")
        return []


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
