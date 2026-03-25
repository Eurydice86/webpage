import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

_member_cache = {}


def clear_cache():
    _member_cache.clear()


def instructor(member_id, group):
    if member_id in _member_cache:
        content = _member_cache[member_id]
        if content is None:
            return (None, None)
    else:
        myclub_token = os.getenv("MC_TOKEN")
        headers = {"X-myClub-token": myclub_token}
        base_url = "https://ehms.myclub.fi/api/"
        event_url = "members/" + member_id
        full_url = base_url + event_url
        response = requests.get(full_url, headers=headers)
        if response.status_code == 404:
            _member_cache[member_id] = None
            return (None, None)

        content = json.loads(response.content)
        _member_cache[member_id] = content

    m = content.get("member")
    for gr in m.get("memberships"):
        if str(gr["group_id"]) == group and gr["level"] == "Ohjaaja":
            


            member = {
                "member_id": member_id,
                "first_name": m.get("first_name"),
                "last_name": m.get("last_name"),
                "birthday": m.get("birthday"),
                "photo": m.get("avatars")["original"]
            }

            return member


if __name__ == "__main__":
    m = instructor("347", "28112")
    m = instructor("123", "38874")
    print(json.dumps(m, indent=2))
