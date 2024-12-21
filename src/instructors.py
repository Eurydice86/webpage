import groups

import datetime
import requests
import json
import os

import instructor

from dotenv import load_dotenv

load_dotenv()


def members(group):

    myclub_token = os.getenv("MC_TOKEN")
    headers = {"X-myClub-token": myclub_token}

    base_url = "https://ehms.myclub.fi/api/"
    event_url = f"groups/{group}/memberships"
    full_url = base_url + event_url

    memberships = json.loads(requests.get(full_url, headers=headers).content)

    instructors = []
    for m in memberships:
        instructors.append(m["membership"]["member_id"])

    return instructors


def instructors_info(group):
    instuctors = members(group)

    instructors_list = []
    for i in instuctors:
        instructors_list.append(instructor.instructor(str(i), group))

    instuctors_list = [i for i in instructors_list if i != None]
    return instuctors_list


if __name__ == "__main__":
    instructors = instructors_info("38874")
    for i in instructors:
        print(json.dumps(i, indent=2))
