from src import upcoming_events
from src import instructors
from src import news

import os
import json
from tqdm import tqdm


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


def get_weapon_info(weapon, all_news):
    group = weapon_to_group(weapon)
    weapon_events = upcoming_events.upcoming_events(group, days=15)
    weapon_instructors = instructors.instructors_info(group)

    tag = weapon_to_tag(weapon)
    weapon_news = news.filter_news(all_news, tag)

    return weapon_events, weapon_news, weapon_instructors


def write_weapon_info(weapon, all_news):

    events, news_items, instructors_list = get_weapon_info(weapon, all_news)
    events = sorted(events, key=lambda d: d["starts_at"])
    events = events[:8]

    events_news_dict = {
        "weapon": weapon,
        "events": events,
        "news": news_items,
        "instructors": instructors_list,
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
    all_news = news.fetch_all_news()
    weapons = [
        "Bolognalainen Sivumiekka / Bolognese Sidesword",
        "Gekiken",
        "Messer",
        "Paini / Wrestling",
        "Saksalainen Pitkämiekka / German Longsword",
        "Sapeli / Sabre",
        "Rapiiri / Rapier",
        "Boffaus / Boffering",
        "EHMS Tapahtumat / EHMS Events",
    ]
    for w in tqdm(weapons, desc="Weapons", unit="weapon"):
        write_weapon_info(w, all_news)
