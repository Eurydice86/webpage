export function renderBoardPage(data) {
  const coreRoles = [
    "Puheenjohtaja / Chair",
    "VPJ / Vice Chair",
    "Taloudenhoitaja / Treasurer",
    "Sihteeri / Secretary",
    "Tiedottaja / Communications"
  ];
  const deputyRole = "Vara-jäsen / Deputy Member";

  const members = Object.values(data.board_members);

  // Core members
  const coreMembers = coreRoles.map(role => members.find(m => m.role === role) || null);
  // Deputies
  const deputyMembers = members.filter(m => m.role === deputyRole);

  // Helper to render a member
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

  // Render a section (core or deputies)
  const renderSection = (membersArray, sectionTitle) => `
    <section class="board-section">
      <h1>${sectionTitle}</h1>
      <div class="members-list">
        ${membersArray.map(renderMember).join("\n")}
      </div>
    </section>
  `;

  return `
    <div class="board-container">
      ${renderSection(coreMembers, "EHMS Hallitus / EHMS Board")}
      ${renderSection(deputyMembers, "Vara-jäsenet / Deputy Members")}
    </div>
  `;
}
