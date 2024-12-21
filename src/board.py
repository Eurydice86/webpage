import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()


def board():

    board_members = {
        "chair": "337",
        "vice_chair": "347",
        "treasurer": "101",
        "secretary": "882",
        "member": ["447", "100"],
        "substitute_member": ["782"],
    }

    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"

    board_roles = []
    for role, id in board_members.items():
        if not isinstance(id, list):
            member_url = f"members/{id}"
            full_url = base_url + member_url
            member = json.loads(requests.get(full_url, headers=headers).content)
            member = member["member"]
            board_roles.append({"member": member, "role": role})
        else:
            for i in id:
                member_url = f"members/{i}"
                full_url = base_url + member_url
                member = json.loads(requests.get(full_url, headers=headers).content)
                member = member["member"]
                board_roles.append({"member": member, "role": role})

    return board_roles


if __name__ == "__main__":
    for i in board():
        print(json.dumps(i.get("member").get("avatars").get("original"), indent=2))
