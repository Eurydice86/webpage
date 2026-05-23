import { renderBoardPage } from "./renderBoard.js";
import { renderEventsPage } from "./renderEvents.js";
import { renderEtiquetteHarassmentPage } from "./renderEtiquetteHarassment.js";

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
  { type: "etiquette-harassment", path: basePath + "../data/board.json" },
  { type: "events", paths: [basePath + "../data/competitions.json", basePath + "../data/workshops.json"] }
];

let currentIndex = 0;

async function fetchAndUpdateSingle() {
  const file = files[currentIndex];

  try {
    let html = "";

    if (file?.type === "events") {
      const [compRes, workRes] = await Promise.all(file.paths.map(p => fetch(p, { cache: "no-cache" })));
      if (!compRes.ok || !workRes.ok) throw new Error("Failed to load events data");
      html = renderEventsPage(await compRes.json(), await workRes.json());
    } else if (file?.type === "etiquette-harassment") {
      const res = await fetch(file.path, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load ${file.path}`);
      html = renderEtiquetteHarassmentPage(await res.json());
    } else {
      console.log(`Fetching: ${file} (index ${currentIndex})`);
      const response = await fetch(file, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);

      if (file.endsWith(".json")) {
        html = getRenderedHTML(await response.json(), currentIndex);
      } else if (file.endsWith(".html")) {
        html = await response.text();
      }
    }

    if (html !== null) document.getElementById("data").innerHTML = html;
  } catch (err) {
    console.error(`Error loading file at index ${currentIndex}:`, err);
    document.getElementById("data").textContent = `Error loading content: ${err.message}`;
  }

  currentIndex = (currentIndex + 1) % files.length;
}

function getRenderedHTML(data, index) {
  switch (index) {
    case 0:
      return renderBoardPage(data);
    default:
      return "";
  }
}

let lastModifiedKey = null;
async function checkForReload() {
  try {
    const dirRes = await fetch("js/", { cache: "no-cache" });
    const html = await dirRes.text();
    const jsFiles = [...html.matchAll(/href="([^"]+\.js)"/g)].map(m => m[1]);
    const responses = await Promise.all(jsFiles.map(f => fetch(`js/${f}`, { method: "HEAD", cache: "no-cache" })));
    const key = jsFiles.join(",") + "|" + responses.map(r => r.headers.get("Last-Modified")).join("|");
    if (lastModifiedKey && key !== lastModifiedKey) location.reload();
    lastModifiedKey = key;
  } catch (_) {}
}

console.log("Main.js loaded. Starting content rotation...");
setInterval(fetchAndUpdateSingle, 30000);
setInterval(checkForReload, 10000);
fetchAndUpdateSingle();
checkForReload();
