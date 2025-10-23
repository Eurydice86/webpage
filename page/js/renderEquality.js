export function renderEqualityPage(data) {
  let html = `<h1>Häirintäyhdyshenkilö / Equality and Harassment Contact</h1><table border="1" cellpadding="5" cellspacing="0">`;

  for (const member of Object.values(data.board_members)) {
    if (member.role === "Häirintäyhdyshenkilö / Equality and Harrassment Contact") {
      html += `<tr><td>${member.member_details.first_name} ${member.member_details.last_name}</td></tr>`;
      html += `<tr><td><img src="${member.member_details.avatars.original}" height="200"></td></tr>`;
    }
  }

  for (const [key, value] of Object.entries(data.equality_person_contact)) {
    html += `<tr><td>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</td></tr>`;
  }

  html += `</table>`;
  return html;
}
