const jsonFiles = ["data1.json", "data2.json", "data3.json", "../data/Bolognese-Sidesword.json", "../data/German-Longsword.json"];
let currentIndex = 0; // Tracks which JSON file to update next

// Function to fetch and update a single JSON file
async function fetchAndUpdateSingle() {
    const file = jsonFiles[currentIndex];
    try {
        const response = await fetch(file);
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
    case 0: // Structure for data1.json
        content += `<p><strong>ID:</strong> ${data.id}</p>`;
        content += `<p><strong>Name:</strong> ${data.name}</p>`;
        content += `<p><strong>Value:</strong> ${data.value}</p>`;
        break;
	
    case 1: // Structure for data2.json
        content += `<ul>`;
        data.items.forEach((item, idx) => {
            content += `<li>${idx + 1}: ${item}</li>`;
        });
        content += `</ul>`;
        break;
	
    case 2: // Structure for data3.json
        content += `<table border="1" cellpadding="5" cellspacing="0">`;
        content += `<tr><th>Key</th><th>Value</th></tr>`;
        for (const [key, value] of Object.entries(data)) {
            content += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        content += `</table>`;
        break;
	
	

    default: // Structure for weapon pages
	content += `<h1>${data.weapon}</h1>`;

        content += `<h2>Trainings in the next 14 days</strong></h2>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
        content += `<tr><th>Class</th><th>Date and Time</th></tr>`;
        for (const [key, value] of Object.entries(data.events)) {
	    const start_date = Date.parse(value.starts_at)
	    const date = new Date(start_date)
	    const weekday = ["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"];
            content += `<tr><td>${value.name}</td><td>${weekday[date.getDay()]} ${date.toLocaleString("fi-FI")}</td></tr>`;
        }
        content += `</table>`;
	
	content	+= `<p></p>`

	content += `<h2><strong>Instructors</strong></h2>`;
	content += `<table border="1" cellpadding="5" cellspacing="0">`;
        for (const [key, value] of Object.entries(data.instructors)) {
            content += `<td>${value.first_name} ${value.last_name}</td>`;
        }
	content += `<tr>`;
	for (const [key, value] of Object.entries(data.instructors)) {
            content += `<td><img src="${value.photo}" height="100"></td>`;
        }
	content += `</tr>`;


        break;
    }

    section.innerHTML = content;
}

// Refresh data every 5 seconds, one file at a time
setInterval(fetchAndUpdateSingle, 1000);

// Initial load
fetchAndUpdateSingle();
