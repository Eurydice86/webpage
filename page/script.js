const jsonFiles = ["../data/board.json", "../data/board.json", "../data/competitions.json", "../data/workshops.json", "../data/EHMS-Tapahtumat_EHMS-Events.json", "../data/Bolognalainen-Sivumiekka_Bolognese-Sidesword.json", "../data/Gekiken.json", "../data/Messer.json", "../data/Paini_Wrestling.json", "../data/Saksalainen-Pitkämiekka_German-Longsword.json", "../data/Sapeli_Sabre.json", "../data/Rapiiri_Rapier.json", "../data/Boffaus_Boffering.json"];
let currentIndex = 0; // Tracks which JSON file to update next

// Function to fetch and update a single JSON file
async function fetchAndUpdateSingle() {
    const file = jsonFiles[currentIndex];
    try {
        const response = await fetch(file, { cache: "no-cache" }) // Prevent cachingfetch(file, cache);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }
        const data = await response.json();
        updateContent(data, currentIndex);
    } catch (error) {
        console.error(error);
        document.getElementById("data").textContent = `Error loading ${file}`;
    }

    // Move to the next index (loop back to 0 if at the end)
    currentIndex = (currentIndex + 1) % jsonFiles.length;
}

// Function to update the content of the single section based on JSON structure
function updateContent(data, index) {
    const section = document.getElementById("data");
    let content = ``;
    
    // Customize the display based on file index (or file structure)
    switch (index) {

    case 0: // Structure for board page
        content += `<h1>EHMS Hallitus / EHMS Board</h1>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
	content += `<tr>`;
        for (const [key, value] of Object.entries(data.board_members)) {
	    if (value.role == "Puheenjohtaja / Chair" || value.role == "VPJ / Vice Chair" || value.role == "Taloudenhoitaja / Treasurer" || value.role == "Secretary" || value.role == "Tiedottaja / Communications" ) {
		content += `<td><h2>${value.role}</h2></td>`;
	    }
        }
	content += `<tr>`;
        for (const [key, value] of Object.entries(data.board_members)) {
	    if (value.role == "Puheenjohtaja / Chair" || value.role == "VPJ / Vice Chair" || value.role == "Taloudenhoitaja / Treasurer" || value.role == "Secretary" || value.role == "Tiedottaja / Communications" ) {
		content += `<td>${value.member_details.first_name} ${value.member_details.last_name}</td>`;
            }
	}
	content += `</tr>`;
	content += `<tr>`;
	for (const [key, value] of Object.entries(data.board_members)) {
	    if (value.role == "Puheenjohtaja / Chair" || value.role == "VPJ / Vice Chair" || value.role == "Taloudenhoitaja / Treasurer" || value.role == "Secretary" || value.role == "Tiedottaja / Communications" ) {
		content += `<td><img src="${value.member_details.avatars.original}" height="200"></td>`;
            }
	}
	content += `</tr>`;

	
	content += `<tr>`;
        for (const [key, value] of Object.entries(data.board_members)) {
            if (value.role == "Vara-jäsen / Deputy Member") {
		content += `<td><h2>${value.role}</h2></td>`;
	    }
        }
	content += `</tr>`;
	for (const [key, value] of Object.entries(data.board_members)) {
            if (value.role == "Vara-jäsen / Deputy Member") {
		content += `<td>${value.member_details.first_name} ${value.member_details.last_name}</td>`;
            }
	}
	content += `</tr>`;
	content += `<tr>`;
	for (const [key, value] of Object.entries(data.board_members)) {
            if (value.role == "Vara-jäsen / Deputy Member") {
		content += `<td><img src="${value.member_details.avatars.original}" height="200"></td>`;
            }
	}
	content += `</tr>`;

	
	break;

    case 1: // Structure for Equality and Harrassment contact
	content += `<h1>Häirintäyhdyshenkilö / Equality and Harrassment Contact</h1>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
	
	content += `</tr>`;
	for (const [key, value] of Object.entries(data.board_members)) {
            if (value.role == "Häirintäyhdyshenkilö / Equality and Harrassment Contact") {
		content += `<td>${value.member_details.first_name} ${value.member_details.last_name}</td>`;
            }
	}
	content += `</tr>`;
	content += `<tr>`;
	for (const [key, value] of Object.entries(data.board_members)) {
            if (value.role == "Häirintäyhdyshenkilö / Equality and Harrassment Contact") {
		content += `<td><img src="${value.member_details.avatars.original}" height="200"></td>`;
            }
	}
	content += `</tr>`;

	break;

	
    case 2: // Structure for events page
        content += `<h1>Tulevat kisat(?) (seur. 3 kk.) / Upcoming Competitions (next 3 months)</strong></h1>`;
	for (const [key, value] of Object.entries(data.competitions)) {
	    const start_date = Date.parse(value.starts_at);
	    const end_date = Date.parse(value.ends_at);
	    s_date = new Date(start_date).toDateString();
	    e_date = new Date(end_date).toDateString();
	    content += `<h2>${value.name}</h2>`
	    content += `<p><strong>${s_date} - ${e_date}</strong></p><br>`
	};
	break;

    case 3: // Structure for workshops page
        content += `<h1>Tulevat ??? (seur. 3 kk.) / Upcoming workshops (next 3 months)</strong></h1>`;
	for (const [key, value] of Object.entries(data.workshops)) {
	    const start_date = Date.parse(value.starts_at);
	    const end_date = Date.parse(value.ends_at);
	    s_date = new Date(start_date).toDateString();
	    e_date = new Date(end_date).toDateString();
	    content += `<h2>${value.name}</h2>`
	    content += `<p><strong>${s_date} - ${e_date}</strong></p><br>`
	};
	break;

	
    default: // Structure for weapon pages
	content += `<h1>${data.weapon}</h1>`;

        content += `<h2>Tulevat tapahtumat (seur. 14 pv.) / Upcoming events (next 14 days)</strong></h2>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
        content += `<tr><th>Class</th><th>Date and Time</th></tr>`;
        for (const [key, value] of Object.entries(data.events)) {
	    const start_date = Date.parse(value.starts_at)
	    const date = new Date(start_date)
	    const weekday = ["Sunnuntai / Sunday","Maanantai / Monday","Tiistai / Tuesday","Keskiviikko / Wednesday","Torstai / Thursday","Perjantai / Friday","Lauantai / Saturday"];
            content += `<tr><td>${value.name}</td><td>${weekday[date.getDay()]} ${date.toLocaleString("fi-FI")}</td></tr>`;
        }
        content += `</table>`;

	content += `<table id="instructors_table_cap" border="1" cellpadding="5" cellspacing="0">`;
	content += `<caption>Instructors</caption>`;
	content += `<table id="instructors_table" border="1" cellpadding="5" cellspacing="0">`;

        for (const [key, value] of Object.entries(data.instructors)) {
            content += `<td>${value.first_name} ${value.last_name}</td>`;
        }
	content += `<tr>`;
	for (const [key, value] of Object.entries(data.instructors)) {
            content += `<td><img src="${value.photo}" height="150"></td>`;
        }
	content += `</tr>`;


        break;
    }

    section.innerHTML = content;
}

// Refresh data every 5 seconds, one file at a time
setInterval(fetchAndUpdateSingle, 5000);

// Initial load
fetchAndUpdateSingle();
