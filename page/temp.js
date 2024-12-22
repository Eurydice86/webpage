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
