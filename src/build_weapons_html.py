import json


def build_html(weapon):
    filename = "../data/" + weapon.replace(" ", "-") + ".json"

    # Parse the JSON data
    with open(filename, "r") as file:
        data = json.loads(file.read())

    html_output = generate_html(data)
    filename_out = filename.split(".json")[0] + ".html"
    # Output the HTML content (you could write this to a file or print it)
    with open(filename_out, "w") as file:
        file.write(html_output)


# Function to generate HTML
def generate_html(data):
    html_content = f"""
    <html>
    <head> 
    <link rel="stylesheet" href="styles.css">
    <title>{data["weapon"]}</title>
    </head>
    <body>
    <h1>{data["weapon"]}</h1>
    """

    # Loop through each event in the JSON and create HTML for each
    html_content += """ <h2>Upcoming events</h2> """

    for event in data["events"]:
        html_content += f"""
        <div class="event">
            <h3>{event['name']}</h3>
            <p>{event['starts_at']}</p>
        </div>
        """

    # Loop through each newspiece in the JSON and create HTML for each
    html_content += """<h2>Latest news</h2>"""
    for news in data["news"]:
        html_content += f"""
    <div class="event">
        <h3>{news['title']}</h3>
    </div>
    """
    html_content += """<h2>Instructors</h2>"""

    for instructors in data["instructors"]:
        html_content += f""" <div class ="column">
        <div class="instructor">
            <h3>{instructors["first_name"]} {instructors["last_name"]}</h3>
            <img src={instructors["photo"]}></p>
        </div>
        """
    # Closing tags for HTML
    html_content += """
        </body>
        </html>
        """

    return html_content

    # Generate the HTML content


if __name__ == "__main__":
    build_html("German Longsword")
    build_html("Bolognese Sidesword")
