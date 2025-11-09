from src import upcoming_events
import json


def get_competitions_and_workshops():
    group = "28105"  # this is the "EHMS jäsenet" group
    events = upcoming_events.upcoming_events(group, days=180)
    competitions_category = 6878
    workshops_category = 7579

    comps = []
    workshops = []
    for e in events:
        if e["event_category_id"] == competitions_category:
            comps.append(e)
        if e["event_category_id"] == workshops_category:
            workshops.append(e)

    comps = sorted(comps, key=lambda d: d["starts_at"])
    workshops = sorted(workshops, key=lambda d: d["starts_at"])

    return comps, workshops


def write_competitions():
    try:
        comps, workshops = get_competitions_and_workshops()
        comps_dict = {"competitions": comps}
        workshops_dict = {"workshops": workshops}

        json_out_comps = json.dumps(comps_dict, indent=4)
        json_out_workshops = json.dumps(workshops_dict, indent=4)

        filename = "data/competitions.json"
        with open(filename, "w") as output_file:
            output_file.write(json_out_comps)
        print(f"Successfully wrote competitions data to {filename}")

        filename = "data/workshops.json"
        with open(filename, "w") as output_file:
            output_file.write(json_out_workshops)
        print(f"Successfully wrote workshops data to {filename}")
    except Exception as e:
        print(f"Error in write_competitions: {e}")
        raise



if __name__ == "__main__":
    comps, workshops = get_competitions_and_workshops()
    for c in comps:
        print(c["name"], c["starts_at"])
