export function renderEtiquetteHarassmentPage(data) {
  const equalityRole = "Häirintäyhdyshenkilö / Equality and Harassment Contact";
  const member = Object.values(data.board_members).find(m => m.role === equalityRole);

  const contactHtml = member ? `
    <div style="background: rgba(255, 195, 169, 0.15); border-radius: 14px; padding: 30px; box-shadow: 0 4px 15px rgba(255, 195, 169, 0.2); text-align: center;">
      <h2>${member.role}</h2>
      <img src="${member.member_details.avatars.original}" height="220" style="border-radius: 10px; object-fit: cover; margin-bottom: 20px;">
      <h3>${member.member_details.first_name} ${member.member_details.last_name}</h3>
      ${Object.entries(data.equality_person_contact || {}).map(([k, v]) =>
        `<p style="font-size: 18px;"><strong>${k.charAt(0).toUpperCase() + k.slice(1)}:</strong> ${v}</p>`
      ).join("")}
    </div>` : "";

  return `
    <div style="display: flex; gap: 60px; justify-content: center; align-items: center; flex-wrap: wrap; padding: 20px; max-width: 1600px; margin: 0 auto;">
      <div style="flex: 2; min-width: 700px;">
        <h1 style="text-align: center;">EHMS salietiketti</h1>
        <ul style="font-size: 32px; line-height: 2; text-align: left; margin-left: 0px; padding-left: 20px;">
          <li>Kunnioita kaikkia, älä pelkää ketään</li>
          <li>Kysy ja keskustele olettamisen sijaan</li>
          <li>Kunnioittava kommunikaatio ja suostumus pariharjoituksissa ja sparratessa</li>
          <li>Salilla sparrataan kaikkien kanssa</li>
          <li>Omista harjoitteluvarusteista pidetään huoli</li>
        </ul>
        <h1 style="text-align: center;">EHMS salle etiquette</h1>
        <ul style="font-size: 32px; line-height: 2; text-align: left; margin-left: 0px; padding-left: 20px;">
          <li>Respect everyone, fear no one</li>
          <li>Instead of assuming, ask and discuss</li>
          <li>Respectful communication and consent in partner drills and sparring</li>
          <li>Spar with everyone</li>
          <li>You are responsible for your own training equipment</li>
        </ul>
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        ${contactHtml}
      </div>
    </div>
  `;
}
