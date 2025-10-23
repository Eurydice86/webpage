import { renderBoardPage } from "./renderBoard.js";
import { renderEqualityPage } from "./renderEquality.js";
import { renderCompetitionsPage } from "./renderCompetitions.js";
import { renderWorkshopsPage } from "./renderWorkshops.js";
import { renderWeaponPage } from "./renderWeapon.js";

const jsonFiles = [
  "../data/board.json",
  "../data/board.json",
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
  const file = jsonFiles[currentIndex];
  try {
    const response = await fetch(file, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load ${file}`);

    const data = await response.json();
    updateContent(data, currentIndex);
  } catch (err) {
    console.error(err);
    document.getElementById("data").textContent = `Error loading ${file}`;
  }
  currentIndex = (currentIndex + 1) % jsonFiles.length;
}

function updateContent(data, index) {
  let html = "";
  switch (index) {
    case 0:
      html = renderBoardPage(data);
      break;
    case 1:
      html = renderEqualityPage(data);
      break;
    case 2:
      html = renderCompetitionsPage(data);
      break;
    case 3:
      html = renderWorkshopsPage(data);
      break;
    default:
      html = renderWeaponPage(data);
  }
  document.getElementById("data").innerHTML = html;
}

// Loop every 3 seconds
setInterval(fetchAndUpdateSingle, 3000);
fetchAndUpdateSingle();
