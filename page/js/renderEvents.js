export function renderEventsPage(compData, workData) {
  const col = (title, items) => {
    let html = `<div style="flex: 1; padding: 0 30px; position: relative; min-width: 0;">
      <div style="position: absolute; right: 0; top: 100px; height: 50%; width: 1px; background: #FFC3A9;"></div>
      <h2 style="text-align: center; margin-top: 0;">${title}</h2>`;
    for (const item of Object.values(items)) {
      const sDate = new Date(Date.parse(item.starts_at)).toDateString();
      const eDate = new Date(Date.parse(item.ends_at)).toDateString();
      html += `<div style="padding: 10px 0; text-align: center;">
        <p style="margin: 0; font-size: 26px; color: #FCF5D8; font-weight: 700;">${item.name}</p>
        <p style="margin: 4px 0 0; font-size: 26px; color: #FFC3A9;">${sDate} – ${eDate}</p>
      </div>`;
    }
    html += `</div>`;
    return html;
  };

  return `
    <h1 style="margin-top: 60px; margin-bottom: 0;">Tulevat tapahtumat (seur. 6 kk) / Upcoming Events (next 6 months)</h1>
    <div style="display: flex; flex-direction: row; padding: 20px 40px; margin-top: 60px; width: 100%; height: calc(100% - 100px); overflow-y: auto; box-sizing: border-box;">
      ${col("Kilpailut / Competitions", compData.competitions)}
      <div style="flex: 1; padding: 0 30px; min-width: 0;">
        <h2 style="text-align: center; margin-top: 0;">Työpajat / Workshops</h2>
        ${Object.values(workData.workshops).map(w => {
          const sDate = new Date(Date.parse(w.starts_at)).toDateString();
          const eDate = new Date(Date.parse(w.ends_at)).toDateString();
          return `<div style="padding: 10px 0; text-align: center;">
            <p style="margin: 0; font-size: 26px; color: #FCF5D8; font-weight: 700;">${w.name}</p>
            <p style="margin: 4px 0 0; font-size: 26px; color: #FFC3A9;">${sDate} – ${eDate}</p>
          </div>`;
        }).join("")}
      </div>
    </div>`;
}
