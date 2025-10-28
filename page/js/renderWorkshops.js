export function renderWorkshopsPage(data) {
  let html = `<h1>Tulevat työpajat (seur. 6 kk) / Upcoming Workshops (next 6 months)</h1>
  <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 40px; width: 100%; height: calc(100% - 100px); overflow-y: auto;">`;

  for (const workshop of Object.values(data.workshops)) {
    const sDate = new Date(Date.parse(workshop.starts_at)).toDateString();
    const eDate = new Date(Date.parse(workshop.ends_at)).toDateString();
    html += `<div style="width: 100%; padding: 12px 0; text-align: center;">`;
    html += `<p style="margin: 0; font-size: 30px; color: #FCF5D8; font-weight: 700;">${workshop.name} <span style="color: #FFC3A9;">- ${sDate} - ${eDate}</span></p>`;
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}
