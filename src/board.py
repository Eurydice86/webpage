import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()


def board():
    board_members = {
        "Puheenjohtaja / Chair": "782",
        # "VPJ / Vice Chair": "",
        "Taloudenhoitaja / Treasurer": "101",
        # "Sihteeri / Secretary": "",
        # "Tiedottaja / Communications": ["100"],
        "Jäsen / Member": ["878", "504", "882"],
        "Vara-jäsen / Deputy Member": ["308", "862", "1363"],
        "Häirintäyhdyshenkilö / Equality and Harassment Contact": ["718"],
    }

    myclub_token = os.getenv("MC_TOKEN")
    if not myclub_token:
        raise ValueError("MC_TOKEN environment variable not set")

    headers = {"X-myClub-token": myclub_token}
    base_url = "https://ehms.myclub.fi/api/"

    board_roles = []
    for role, id in board_members.items():
        if not isinstance(id, list):
            try:
                member_url = f"members/{id}"
                full_url = base_url + member_url
                response = requests.get(full_url, headers=headers, timeout=10)
                response.raise_for_status()
                member = response.json()
                member = member["member"]
                board_roles.append({"role": role, "member_details": member})
            except requests.RequestException as e:
                print(f"Error fetching board member {id}: {e}")
                continue
        else:
            for i in id:
                try:
                    member_url = f"members/{i}"
                    full_url = base_url + member_url
                    response = requests.get(full_url, headers=headers, timeout=10)
                    response.raise_for_status()
                    member = response.json()
                    member = member["member"]
                    board_roles.append(
                        {
                            "role": role,
                            "member_details": member,
                        }
                    )
                except requests.RequestException as e:
                    print(f"Error fetching board member {i}: {e}")
                    continue

    return board_roles


def write_board_info():
    try:
        board_roles = board()
        equality_person_contact = {
            "email": os.getenv("EQUALITY_PERSON_EMAIL", ""),
            "phone": os.getenv("EQUALITY_PERSON_PHONE", "")
        }

        output_dict = {"board_members": board_roles,
                       "equality_person_contact": equality_person_contact}

        json_out = json.dumps(output_dict, indent=4)

        filename = "data/board.json"
        with open(filename, "w") as output_file:
            output_file.write(json_out)
        print(f"Successfully wrote board data to {filename}")
    except Exception as e:
        print(f"Error in write_board_info: {e}")
        raise


if __name__ == "__main__":
    write_board_info()
