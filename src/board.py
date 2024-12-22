import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()


def board():

    board_members = {
        "Chair": "337",
        "Vice Chair": "347",
        "Treasurer": "101",
        "Secretary": "882",
        "Member": ["100"],
        "Substitute Member": ["782", "447"],
        "Equality and Harrassment Contact": ["718"]
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
            board_roles.append({"role": role, "member_details": member})
        else:
            for i in id:
                member_url = f"members/{i}"
                full_url = base_url + member_url
                member = json.loads(requests.get(full_url, headers=headers).content)
                member = member["member"]
                board_roles.append({"role": role, "member_details": member, })

    return board_roles


def write_board_info():

    board_roles = board()

    output_dict = {"board_members": board()}

    json_out = json.dumps(output_dict, indent=4)

    filename = "data/board.json"
    with open(filename, "w") as output_file:
        output_file.write(json_out)


if __name__ == "__main__":
    write_board_info()
