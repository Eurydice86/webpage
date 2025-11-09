import { renderBoardPage } from "./renderBoard.js";
import { renderEqualityPage } from "./renderEquality.js";
import { renderCompetitionsPage } from "./renderCompetitions.js";
import { renderWorkshopsPage } from "./renderWorkshops.js";
import { renderWeaponPage } from "./renderWeapon.js";

// Updated files array: etiquette.html is 3rd (index 2)
// Use relative paths so the app works from any subdirectory
const getBasePath = () => {
  // Get the path relative to the current page location
  const currentPath = window.location.pathname;
  // Remove trailing filename if it exists
  return currentPath.substring(0, currentPath.lastIndexOf('/')) + '/';
};

const basePath = getBasePath();

const files = [
  basePath + "../data/board.json",
  basePath + "../data/board.json",
  basePath + "../pages/etiquette.html",
  basePath + "../data/competitions.json",
  basePath + "../data/workshops.json",
  basePath + "../data/EHMS-Tapahtumat_EHMS-Events.json",
  basePath + "../data/Bolognalainen-Sivumiekka_Bolognese-Sidesword.json",
  basePath + "../data/Gekiken.json",
  basePath + "../data/Messer.json",
  basePath + "../data/Paini_Wrestling.json",
  basePath + "../data/Saksalainen-Pitkämiekka_German-Longsword.json",
  basePath + "../data/Sapeli_Sabre.json",
  basePath + "../data/Rapiiri_Rapier.json",
  basePath + "../data/Boffaus_Boffering.json"
];

let currentIndex = 0;

async function fetchAndUpdateSingle() {
  const file = files[currentIndex];
  console.log(`Fetching: ${file} (index ${currentIndex})`);
  try {
    const response = await fetch(file, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);

    let html = "";
    if (file.endsWith(".json")) {
      const data = await response.json();
      html = getRenderedHTML(data, currentIndex);
    } else if (file.endsWith(".html")) {
      html = await response.text(); // Load HTML as text
    }

    console.log(`Successfully loaded and rendered: ${file}`);
    document.getElementById("data").innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
    document.getElementById("data").textContent = `Error loading ${file}: ${err.message}`;
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
console.log("Main.js loaded. Starting content rotation...");
setInterval(fetchAndUpdateSingle, 30000);
fetchAndUpdateSingle();
