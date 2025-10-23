export function renderBoardPage(data) {
  let html = `<h1>EHMS Hallitus / EHMS Board</h1><table border="1" cellpadding="5" cellspacing="0">`;

  const coreRoles = [
    "Puheenjohtaja / Chair",
    "VPJ / Vice Chair",
    "Taloudenhoitaja / Treasurer",
    "Sihteeri / Secretary",
    "Tiedottaja / Communications"
  ];

  // Main board
  html += "<tr>";
  for (const member of Object.values(data.board_members)) {
    if (coreRoles.includes(member.role)) html += `<td><h2>${member.role}</h2></td>`;
  }
  html += "</tr><tr>";
  for (const member of Object.values(data.board_members)) {
    if (coreRoles.includes(member.role))
      html += `<td>${member.member_details.first_name} ${member.member_details.last_name}</td>`;
  }
  html += "</tr><tr>";
  for (const member of Object.values(data.board_members)) {
    if (coreRoles.includes(member.role))
      html += `<td><img src="${member.member_details.avatars.original}" height="200"></td>`;
  }
  html += "</tr>";

  // Deputies
  html += "<tr>";
  for (const member of Object.values(data.board_members)) {
    if (member.role === "Vara-jäsen / Deputy Member") html += `<td><h2>${member.role}</h2></td>`;
  }
  html += "</tr><tr>";
  for (const member of Object.values(data.board_members)) {
    if (member.role === "Vara-jäsen / Deputy Member")
      html += `<td>${member.member_details.first_name} ${member.member_details.last_name}</td>`;
  }
  html += "</tr><tr>";
  for (const member of Object.values(data.board_members)) {
    if (member.role === "Vara-jäsen / Deputy Member")
      html += `<td><img src="${member.member_details.avatars.original}" height="200"></td>`;
  }
  html += "</tr></table>";
  return html;
}
