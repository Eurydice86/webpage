export function renderEqualityPage(data) {
  let html = `<h1>Häirintäyhdyshenkilö / Equality and Harassment Contact</h1>
  <div style="display: flex; flex-direction: column; align-items: center; margin-top: 35px;">`;

  for (const member of Object.values(data.board_members)) {
    if (member.role === "Häirintäyhdyshenkilö / Equality and Harrassment Contact") {
      html += `<div style="background: rgba(255, 255, 255, 0.5); border-radius: 14px; padding: 45px; box-shadow: 0 4px 15px rgba(43, 55, 74, 0.1); max-width: 600px; text-align: center;">`;
      html += `<img src="${member.member_details.avatars.original}" height="330" style="border-radius: 10px; width: 100%; object-fit: cover; margin-bottom: 30px;">`;
      html += `<h2 style="margin: 15px 0; font-size: 28px;">${member.member_details.first_name} ${member.member_details.last_name}</h2>`;

      for (const [key, value] of Object.entries(data.equality_person_contact)) {
        html += `<p style="margin: 14px 0; font-size: 21px;"><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
      }

      html += `</div>`;
    }
  }

  html += `</div>`;
  return html;
}
