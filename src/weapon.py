import upcoming_events
import instructors
import news
import json


def weapon_to_group(weapon):
    conversion_table = {
        "Bolognese Sidesword": "28121",
        "Fiore": "49024",
        "Gekiken": "38874",
        "Messer": "48332",
        "Wrestling": "28115",
        "German Longsword": "28112",
        "Sabre": "31363",
        "Rapier": "28114",
    }
    return conversion_table[weapon]


def weapon_to_tag(weapon):
    conversion_table = {
        "Bolognese Sidesword": "28121",
        "Fiore": "49024",
        "Gekiken": "38874",
        "Messer": "48332",
        "Wrestling": "28115",
        "German Longsword": "pitkämiekka",
        "Sabre": "31363",
        "Rapier": "28114",
    }
    return conversion_table[weapon]


def get_weapon_info(weapon):
    group = weapon_to_group(weapon)
    weapon_events = upcoming_events.upcoming_events(group, days=7)
    weapon_instructors = instructors.instructors_info(group)

    tag = weapon_to_tag(weapon)
    weapon_news = ""
    # weapon_news = news.get_news(tag)

    return weapon_events, weapon_news, weapon_instructors


def write_weapon_info(weapon):

    events, news, instructors = get_weapon_info(weapon)
    events = sorted(events, key=lambda d: d["starts_at"])

    events_news_dict = {
        "weapon": weapon,
        "events": events,
        "news": news,
        "instructors": instructors,
    }

    json_out = json.dumps(events_news_dict, indent=4)

    filename = "../data/" + weapon.replace(" ", "-") + ".json"
    with open(filename, "w") as output_file:
        output_file.write(json_out)


if __name__ == "__main__":
    write_weapon_info("German Longsword")
    write_weapon_info("Bolognese Sidesword")