nimport { renderBoardPage } from "./renderBoard.js";
import { renderEqualityPage } from "./renderEquality.js";
import { renderCompetitionsPage } from "./renderCompetitions.js";
import { renderWorkshopsPage } from "./renderWorkshops.js";
import { renderWeaponPage } from "./renderWeapon.js";

// Updated files array: etiquette.html is 3rd (index 2)
const files = [
  "../data/board.json",
  "../data/board.json",
  "../pages/etiquette.html",
  "../data/competitions.json",
  "../data/workshops.json",
  "../data/EHMS-Tapahtumat_EHMS-Events.json",
  "../data/Bolognalainen-Sivumiekka_Bolognese-Sidesword.json",
  "../data/Gekiken.json",
  "../data/Messer.json",
  "../data/Paini_Wrestling.json",
  "../data/Saksalainen-Pitkämiekka_German-Longsword.json",
  "../data/Sapeli_Sabre.json",
  "../data/Rapiiri_Rapier.json",
  "../data/Boffaus_Boffering.json"
];

let currentIndex = 0;

async function fetchAndUpdateSingle() {
  const file = files[currentIndex];
  try {
    const response = await fetch(file, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load ${file}`);

    let html = "";
    if (file.endsWith(".json")) {
      const data = await response.json();
      html = getRenderedHTML(data, currentIndex);
    } else if (file.endsWith(".html")) {
      html = await response.text(); // Load HTML as text
    }

    document.getElementById("data").innerHTML = html;
  } catch (err) {
    console.error(err);
    document.getElementById("data").textContent = `Error loading ${file}`;
  }

  currentIndex = (currentIndex + 1) % files.length;
}

function getRenderedHTML(data, index) {
  switch (index) {
    case 0:
      return renderBoardPage(data);
    case 1:
      return renderEqualityPage(data);
    case 3:  // competitions.json is now index 3
      return renderCompetitionsPage(data);
    case 4:  // workshops.json is now index 4
      return renderWorkshopsPage(data);
    default:
      return renderWeaponPage(data);
  }
}

// Loop every 30 seconds
setInterval(fetchAndUpdateSingle, 30000);
fetchAndUpdateSingle();
