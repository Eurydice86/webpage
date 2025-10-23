export function renderCompetitionsPage(data) {
  let html = `<h1>Tulevat kilpailut (seur. 6 kk) / Upcoming Competitions (next 6 months)</h1>
  <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 40px; width: 100%; height: calc(100% - 100px); overflow-y: auto;">`;

  for (const competition of Object.values(data.competitions)) {
    const sDate = new Date(Date.parse(competition.starts_at)).toDateString();
    const eDate = new Date(Date.parse(competition.ends_at)).toDateString();
    html += `<div style="width: 100%; padding: 12px 0; text-align: center;">`;
    html += `<p style="margin: 0; font-size: 30px; color: #2B374A; font-weight: 700;">${competition.name} <span style="color: #178A94;">- ${sDate} - ${eDate}</span></p>`;
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}
