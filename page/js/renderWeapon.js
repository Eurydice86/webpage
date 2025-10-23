export function renderWeaponPage(data) {
  const weekday = [
    "Sunnuntai / Sunday",
    "Maanantai / Monday",
    "Tiistai / Tuesday",
    "Keskiviikko / Wednesday",
    "Torstai / Thursday",
    "Perjantai / Friday",
    "Lauantai / Saturday"
  ];

  let html = `<html><head><style>
    /* Set fixed page size */
    html, body {
      width: 1920px;
      height: 1080px;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center; /* Center content horizontally */
    }

    /* Center the headers (h1 and h2) horizontally on the page */
    h1, h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%); /* Centers the headers horizontally */
      text-align: center;
      margin: 0; /* Remove default margins */
    }

    /* Position h2 below h1 */
    h2 {
      top: 150px; /* Adjust this value to control the space between h1 and h2 */
    }

    /* Content will take up all space except the bottom (where the footer will go) */
    .content {
      flex: 1;
    }

    /* Center the upcoming events table on the page and push it lower */
    .events-table {
      width: auto;
      position: absolute;
      top: 200px; /* Adjust this value to control vertical space from top */
      left: 50%;
      transform: translateX(-50%); /* Centers the table horizontally */
      border-collapse: collapse;
    }

    .events-table td, .events-table th {
      padding: 10px;
      text-align: left; /* Align text to the left inside the cells */
    }

    /* Center the instructors table at the bottom */
    .instructors-table {
      width: auto;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%); /* Centers the table horizontally */
      border-top: 2px solid black;
      border-collapse: collapse;
    }

    .instructors-table td {
      padding: 5px; /* Reduced padding to make cells tighter */
      text-align: center; /* Center the content inside the cells */
    }

    .instructors-table img {
      height: 150px;
      margin-left: 5px; /* Optional: small margin between image and name */
    }
  </style></head><body>`;

  // Center the header text and position them in the center of the page
  html += `<h1>${data.weapon}</h1>`;
  html += `<h2>Tulevat tapahtumat (seur. 14 pv) / Upcoming events (next 14 days)</h2>`;

  // Center the "Upcoming events" table and adjust position
  html += `<table class="events-table" border="1" cellpadding="5" cellspacing="0"><tr><th>Class</th><th>Date and Time</th><th>Instructors</th></tr>`;

  // Loop for upcoming events
  for (const event of Object.values(data.events)) {
    const date = new Date(Date.parse(event.starts_at));
    html += `<tr><td>${event.name}</td><td>${weekday[date.getDay()]} ${date.toLocaleString("fi-FI")}</td><td>${event.instructor_names}</td></tr>`;
  }
  html += `</table>`;

  // Add a container for content (flex will ensure this takes up space between the tables)
  html += `<div class="content"></div>`;

  // Check if there are instructors before rendering the instructors table
  if (Object.keys(data.instructors).length > 0) {
    // Now we add the instructors table at the bottom, centered
    html += `<table class="instructors-table"><caption>Instructors</caption><tr>`;
    for (const instr of Object.values(data.instructors)) {
      html += `<td>${instr.first_name} ${instr.last_name}</td>`;
    }
    html += `</tr><tr>`;
    for (const instr of Object.values(data.instructors)) {
      html += `<td><img src="${instr.photo}" alt="${instr.first_name}" /></td>`;
    }
    html += `</tr></table>`;
  }

  html += `</body></html>`;

  return html;
}
