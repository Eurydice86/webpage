const jsonFiles = ["../data/board.json", "../data/Bolognese-Sidesword.json", "../data/Gekiken.json", "../data/Messer.json", "../data/Wrestling.json", "../data/German-Longsword.json", "../data/Sabre.json", "../data/Rapier.json"];
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
        content += `<h1>EHMS Board</strong></h1>`;
	members = Object.entries(data.board_members)

	members.forEach((element, index, array) => {
	    for (const [key, value] of element.entries(data.member_details)) {
		content += `<p>${key}:  ${value}</p>`
	    }
	});
	break;
	
    default: // Structure for weapon pages
	content += `<h1>${data.weapon}</h1>`;

        content += `<h2>Trainings in the next 14 days</strong></h2>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
        content += `<tr><th>Class</th><th>Date and Time</th></tr>`;
        for (const [key, value] of Object.entries(data.events)) {
	    const start_date = Date.parse(value.starts_at)
	    const date = new Date(start_date)
	    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            content += `<tr><td>${value.name}</td><td>${weekday[date.getDay()]} ${date.toLocaleString("fi-FI")}</td></tr>`;
        }
        content += `</table>`;


	content += `<table id="instructors_table_cap" border="1" cellpadding="5" cellspacing="0">`;
	content += `<caption><strong>Instructors</strong></caption>`;
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
