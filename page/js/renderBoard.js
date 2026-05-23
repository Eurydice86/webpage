export function renderBoardPage(data) {
  const coreRoles = [
      "Puheenjohtaja / Chair",
      "VPJ / Vice Chair",
      "Taloudenhoitaja / Treasurer",
      "Sihteeri / Secretary",
      "Tiedottaja / Communications",
      "Jäsen / Member",
  ];
  const deputyRole = "Vara-jäsen / Deputy Member";
  const equalityRole = "Häirintäyhdyshenkilö / Equality and Harassment Contact";

  const members = Object.values(data.board_members);

  const coreMembers = coreRoles.flatMap(role => {
    if (role === "Jäsen / Member") return members.filter(m => m.role === role);
    return members.find(m => m.role === role) || null;
  });
  const deputyMembers = members.filter(m => m.role === deputyRole);
  const equalityMember = members.find(m => m.role === equalityRole);

  const renderMember = (member) =>
    member
      ? `<div class="member">
          <img src="${member.member_details.avatars.original}" alt="${member.member_details.first_name}">
          <div class="member-info">
            <h3>${member.member_details.first_name} ${member.member_details.last_name}</h3>
            <p>${member.role}</p>
          </div>
        </div>`
      : `<div class="member empty"></div>`;

  const renderSection = (membersArray, sectionTitle) => `
    <section class="board-section">
      <h1>${sectionTitle}</h1>
      <div class="members-list">
        ${membersArray.map(renderMember).join("\n")}
      </div>
    </section>
  `;

  const renderEqualityMember = (member) => {
    if (!member) return "";
    let html = `<div class="member" style="grid-column: 5; border: 1px solid #FFC3A9; border-radius: 10px; padding: 8px; background: rgba(255, 195, 169, 0.1);">
      <img src="${member.member_details.avatars.original}" alt="${member.member_details.first_name}">
      <div class="member-info">
        <h3>${member.member_details.first_name} ${member.member_details.last_name}</h3>
        <p>${member.role}</p>`;
    if (data.equality_person_contact) {
      for (const [key, value] of Object.entries(data.equality_person_contact)) {
        html += `<p>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</p>`;
      }
    }
    html += `</div></div>`;
    return html;
  };

  return `
    <div class="board-container">
      ${renderSection(coreMembers, "EHMS Hallitus / EHMS Board")}
      ${renderSection(deputyMembers, "Vara-jäsenet / Deputy Members")}
    </div>
  `;
}
