export function renderCompetitionsPage(data) {
  let html = `<h1>Tulevat kilpailut (seur. 6 kk) / Upcoming Competitions (next 6 months)</h1>`;
  for (const competition of Object.values(data.competitions)) {
    const sDate = new Date(Date.parse(competition.starts_at)).toDateString();
    const eDate = new Date(Date.parse(competition.ends_at)).toDateString();
    html += `<h2>${competition.name}</h2><p><strong>${sDate} - ${eDate}</strong></p><br>`;
  }
  return html;
}
