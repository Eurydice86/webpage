from src import upcoming_events
from src import instructors
from src import news

import os
import json


def weapon_to_group(weapon):
    conversion_table = {
        "Bolognalainen Sivumiekka / Bolognese Sidesword": "28121",
        "Fiore": "49024",
        "Gekiken": "38874",
        "Messer": "48332",
        "Paini / Wrestling": "28115",
        "Saksalainen Pitkämiekka / German Longsword": "28112",
        "Sapeli / Sabre": "31363",
        "Rapiiri / Rapier": "28114",
        "Boffaus / Boffering": "83286",
        "EHMS Tapahtumat / EHMS Events": "28105",
    }
    return conversion_table[weapon]


def weapon_to_tag(weapon):
    conversion_table = {
        "Bolognalainen Sivumiekka / Bolognese Sidesword": "",
        "Fiore": "",
        "Gekiken": "",
        "Messer": "",
        "Paini / Wrestling": "",
        "Saksalainen Pitkämiekka / German Longsword": "pitkämiekka",
        "Sapeli / Sabre": "",
        "Rapiiri / Rapier": "",
        "Boffaus / Boffering": "",
        "EHMS Tapahtumat / EHMS Events": "ehmsry",
    }
    return conversion_table[weapon]


def get_weapon_info(weapon):
    group = weapon_to_group(weapon)
    weapon_events = upcoming_events.upcoming_events(group, days=15)
    weapon_events = weapon_events[:10]
    weapon_instructors = instructors.instructors_info(group)

    tag = weapon_to_tag(weapon)
    # weapon_news = ""
    weapon_news = news.get_news(tag)

    return weapon_events, weapon_news, weapon_instructors


def write_weapon_info(weapon):

    events, news, instructors = get_weapon_info(weapon)
    events = sorted(events, key=lambda d: d["starts_at"])
    # for e in events:
    #     with open("data/notifications.txt", "a") as notif_file:
    #         notif_file.write(f"{e.get("ends_at")}\n")

    events_news_dict = {
        "weapon": weapon,
        "events": events,
        "news": news,
        "instructors": instructors,
    }

    json_out = json.dumps(events_news_dict, indent=4)

    filename = "data/" + weapon.replace(" / ", "_").replace(" ", "-") + ".json"
    with open(filename, "w") as output_file:
        output_file.write(json_out)


def reset_notifications():
    file = open("data/notifications.txt", "w")
    file.close()


def all_weapons():
    # reset_notifications()
    write_weapon_info("Bolognalainen Sivumiekka / Bolognese Sidesword")
    write_weapon_info("Gekiken")
    write_weapon_info("Messer")
    write_weapon_info("Paini / Wrestling")
    write_weapon_info("Saksalainen Pitkämiekka / German Longsword")
    write_weapon_info("Sapeli / Sabre")
    write_weapon_info("Rapiiri / Rapier")
    write_weapon_info("Boffaus / Boffering")
    write_weapon_info("EHMS Tapahtumat / EHMS Events")
