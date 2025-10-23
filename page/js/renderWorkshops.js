export function renderWorkshopsPage(data) {
  let html = `<h1>Tulevat työpajat (seur. 6 kk) / Upcoming Workshops (next 6 months)</h1>`;
  for (const workshop of Object.values(data.workshops)) {
    const sDate = new Date(Date.parse(workshop.starts_at)).toDateString();
    const eDate = new Date(Date.parse(workshop.ends_at)).toDateString();
    html += `<h2>${workshop.name}</h2><p><strong>${sDate} - ${eDate}</strong></p><br>`;
  }
  return html;
}
