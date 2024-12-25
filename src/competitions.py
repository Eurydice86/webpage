from src import upcoming_events
import json


def get_competitions():
    group = "28105"  # this is the "EHMS jäsenet" group
    events = upcoming_events.upcoming_events(group, days=180)

    comps = []
    for e in events:
        if e["event_category_id"] == 6878:
            comps.append(e)

    comps = sorted(comps, key=lambda d: d["starts_at"])

    return comps


def write_competitions():

    comps = get_competitions()
    comps_dict = {"competitions": comps}

    json_out = json.dumps(comps_dict, indent=4)

    filename = "data/competitions.json"
    with open(filename, "w") as output_file:
        output_file.write(json_out)


if __name__ == "__main__":
    for c in get_competitions():
        print(c["name"], c["starts_at"])
