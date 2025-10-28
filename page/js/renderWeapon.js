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

  let html = `<html><head>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <style>
    html, body {
      width: 1920px;
      height: 1080px;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-family: 'Merriweather', 'Noto Sans JP', serif;
      background-color: #2B374A;
      color: #FCF5D8;
      position: relative;
    }

    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('ehms_logo.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 900px auto;
      opacity: 0.04;
      z-index: -1;
    }

    h1, h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      margin: 0;
      font-weight: 700;
      color: #FFC3A9;
    }

    h1 {
      top: 40px;
      font-size: 48px;
      white-space: nowrap;
    }

    h2 {
      top: 110px;
      font-size: 28px;
      color: #FFC3A9;
    }

    .content {
      flex: 1;
    }

    .events-table {
      width: auto;
      position: absolute;
      top: 220px;
      left: 50%;
      transform: translateX(-50%);
      border-collapse: collapse;
      background-color: transparent;
    }

    .events-table td, .events-table th {
      padding: 8px 18px;
      text-align: left;
      border: none;
      font-size: 20px;
      color: #FCF5D8;
    }

    .events-table th {
      font-weight: 700;
      font-size: 22px;
      background-color: rgba(255, 195, 169, 0.1);
      color: #FFC3A9;
      border-bottom: 2px solid #FFC3A9;
    }

    .events-table tbody tr {
      border-bottom: 1px solid rgba(255, 195, 169, 0.15);
    }

    .instructors-table {
      width: auto;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-collapse: collapse;
      border-top: 2px solid #FFC3A9;
      background-color: transparent;
    }

    .instructors-table caption {
      font-weight: 700;
      font-size: 22px;
      color: #FFC3A9;
      margin-bottom: 12px;
      padding-bottom: 8px;
    }

    .instructors-table td {
      padding: 12px 20px;
      text-align: center;
      font-size: 18px;
      color: #FCF5D8;
      border: none;
    }

    .instructors-table img {
      height: 150px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(255, 195, 169, 0.2);
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
