// Screenshots and NPCs positions per image
let tasks = [];
const npcPositions = [
  {
    npcs: [
      { x: 568, y: 359, width: 48, height: 28 },
      { x: 755, y: 371, width: 45, height: 23 },
      { x: 1097, y: 417, width: 100, height: 56 },
    ],
  },
  {
    npcs: [
      { x: 353, y: 160, width: 101, height: 55 },
      { x: 220, y: 365, width: 180, height: 105 },
      { x: 656, y: 282, width: 45, height: 72 },
    ],
  },
  {
    npcs: [
      { x: 112, y: 343, width: 65, height: 130 },
      { x: 625.5, y: 343, width: 43, height: 79 },
      { x: 885.5, y: 350, width: 67, height: 94 },
      { x: 411.5, y: 478, width: 49, height: 36 },
    ],
  },
  {
    npcs: [
      { x: 89.5, y: 313, width: 61, height: 29 },
      { x: 293.5, y: 350, width: 56, height: 30 },
      { x: 689.5, y: 299, width: 34, height: 20 },
      { x: 845.5, y: 252, width: 76, height: 136 },
      { x: 1039.5, y: 234, width: 40, height: 84 },
    ],
  },
  {
    npcs: [
      { x: 403.5, y: 379, width: 139, height: 84 },
      { x: 674.5, y: 316, width: 49, height: 30 },
      { x: 801.5, y: 361, width: 42, height: 29 },
      { x: 939.5, y: 455, width: 86, height: 62 },
    ],
  },
  {
    npcs: [
      { x: 175.5, y: 388, width: 66, height: 39 },
      { x: 363.5, y: 352, width: 114, height: 68 },
      { x: 881.5, y: 411, width: 78, height: 60 },
    ],
  },
  {
    npcs: [
      { x: 87.5, y: 428, width: 103, height: 61 },
      { x: 421.5, y: 416, width: 52, height: 36 },
      { x: 728.5, y: 345, width: 49, height: 28 },
    ],
  },
  {
    npcs: [
      { x: 495.5, y: 276, width: 59, height: 38 },
      { x: 729.5, y: 307, width: 84, height: 53 },
      { x: 956.5, y: 336, width: 50, height: 30 },
    ],
  },
  {
    npcs: [
      { x: 195.5, y: 451, width: 66, height: 43 },
      { x: 795.5, y: 352, width: 45, height: 27 },
      { x: 1037.5, y: 308, width: 121, height: 213 },
    ],
  },
  {
    npcs: [
      { x: 391.5, y: 336, width: 88, height: 206 },
      { x: 677.5, y: 349, width: 83, height: 225 },
    ],
  },
  {
    npcs: [
      { x: 275.5, y: 333, width: 62, height: 139 },
      { x: 759.5, y: 369, width: 114, height: 244 },
    ],
  },
  {
    npcs: [
      { x: 161.5, y: 330, width: 63, height: 115 },
      { x: 589.5, y: 320, width: 51, height: 119 },
      { x: 829.5, y: 374, width: 96, height: 273 },
    ],
  },
  {
    npcs: [
      { x: 356.5, y: 309, width: 50, height: 120 },
      { x: 623.5, y: 317, width: 56, height: 146 },
      { x: 767.5, y: 305, width: 54, height: 115 },
    ],
  },
  {
    npcs: [
      { x: 258.5, y: 264, width: 80, height: 191 },
      { x: 668.5, y: 269, width: 65, height: 103 },
    ],
  },
  {
    npcs: [
      { x: 319.5, y: 319, width: 39, height: 94 },
      { x: 524.5, y: 334, width: 53, height: 86 },
    ],
  },
];

const modeToggle = document.getElementById("modeToggle");
const readerToggle = document.getElementById("readerToggle");
// Restore night mode
if (localStorage.getItem("nightMode") === "true") {
  document.body.classList.add("night-mode");
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) modeToggle.textContent = "🌙";
}

// Restore reader mode
let readerOn = localStorage.getItem("readerOn") === "true";
if (readerOn) {
  document.body.classList.add("reader-mode");
}

let currentTaskIndex = 0;
let remainingNPCs = [];
let taskStartTime;
let totalElapsedTime = 0; // time for whole test to complete
let individualTimes = []; // time spent for each task
let timerInterval; //to hold the function which refresh the elapsed time

let currentTaskClicks = 0; //clicks for current task
let individualClicks = []; // clicks for each task
let totalClicks = 0; // how many times the tester clicked during the whole test

let currentTaskNpcsFound = 0; // NPCs found for current task
let individualNpcFound = [];
let totalNpcFound = 0;

let individualSkipped = [];

const startButton = document.getElementById("startButton");
const skipButton = document.getElementById("skipButton");
const screenshot = document.getElementById("screenshot");
const gameArea = document.getElementById("gameArea");
const timerDisplay = document.getElementById("timer");
const resultsDisplay = document.getElementById("results");
const nextButton = document.getElementById("nextButton");
const selectSet = document.getElementById("setSelect");

startButton.addEventListener("click", startTest);
skipButton.addEventListener("click", skipTask);
nextButton.addEventListener("click", nextIntro);

function nextIntro() {
  nextButton.style.display = "none";

  startButton.style.display = "block";
  selectSet.style.display = "block";
  // Update paragraph content and data-read
  const introText = document.querySelector("#introSection p");
  if (introText) {
    introText.innerHTML =
      "The NPCs and objects may appear in the following form:";
    introText.setAttribute(
      "data-read",
      "The NPCs and objects may appear in the following form."
    );
  }

  // Update reference-gallery items
  const gallery = document.querySelector(".reference-gallery");
  if (gallery) {
    gallery.innerHTML = `
      <div class="ref-item">
        <img src="targets/glow_npc.PNG" alt="NPC" data-read="NPC 3" />
        <span>NPC</span>
      </div>
      <div class="ref-item">
        <img src="targets/material_object.PNG" alt="Object" data-read="NPC 4" />
        <span>Object</span>
      </div>
      <div class="ref-item">
        <img src="targets/material_npc.PNG" alt="NPC" data-read="Laptop" />
        <span>NPC</span>
      </div>
      <div class="ref-item">
        <img src="targets/glow_object.PNG" alt="Object" data-read="Plant" />
        <span>Object</span>
      </div>
    `;
  }
}
function startTest() {
  const setNumber = document.getElementById("setSelect").value;
  tasks = npcPositions.map((task, index) => ({
    image: `testImg2/${setNumber}/${index + 1}.png`,
    npcs: task.npcs,
  }));
  if (currentTaskIndex >= tasks.length) {
    location.reload();
    window.location.href = "index.html";
    return;
  }
  const introSection = document.getElementById("introSection");
  const testInstruction = document.getElementById("testInstruction");
  const gameArea = document.getElementById("gameArea");

  if (introSection) introSection.style.display = "none";
  if (testInstruction) testInstruction.style.display = "block";
  if (gameArea) gameArea.style.display = "block";
  if (timerDisplay) timerDisplay.style.display = "block";
  startButton.style.display = "none";
  selectSet.style.display = "none";
  startButton.disabled = true;
  if (skipButton) {
    skipButton.style.display = "inline-block";
    skipButton.disabled = false;
  }
  resultsDisplay.innerHTML = "";
  // reset values
  currentTaskIndex = 0;
  totalElapsedTime = 0;
  individualTimes = [];
  individualClicks = [];
  individualNpcFound = [];
  individualSkipped = [];
  loadTask();
  totalClicks = 0;
  totalNpcFound = 0;
  document.body.classList.remove("debug-mode"); // remove red frames of NPCs
}

function loadTask() {
  clearGameArea(); // clear NPC areas from last task
  if (currentTaskIndex >= tasks.length) {
    endTest();
    return;
  }
  resetCounts();
  const task = tasks[currentTaskIndex];
  screenshot.src = task.image;
  screenshot.style.display = "block";

  screenshot.onload = () => {
    taskStartTime = Date.now();
    startTimer();
    createNPCAreas(task.npcs);
  };
}

function resetCounts() {
  currentTaskClicks = 0;
  currentTaskNpcsFound = 0;
}

// create clickable NPC areas
function createNPCAreas(npcs) {
  remainingNPCs = npcs.map((npc, index) => {
    const div = document.createElement("div");
    div.className = "npcArea";
    div.style.left = npc.x + "px";
    div.style.top = npc.y + "px";
    div.style.width = npc.width + "px";
    div.style.height = npc.height + "px";
    div.dataset.index = index;
    div.addEventListener("click", npcClicked);
    gameArea.appendChild(div);
    return div;
  });
}

function npcClicked(event) {
  currentTaskNpcsFound++;
  currentTaskClicks++;
  const div = event.target;
  div.classList.add("clicked"); // Add red border
  // div.remove();
  // remainingNPCs = remainingNPCs.filter((d) => d !== div);
  // if (remainingNPCs.length === 0) {
  //   completeTask();
  // }
}

function completeTask() {
  const elapsed = (Date.now() - taskStartTime) / 1000;
  individualTimes.push(elapsed);
  individualNpcFound.push(currentTaskNpcsFound);
  individualClicks.push(currentTaskClicks);
  individualSkipped.push("No");
  totalElapsedTime += elapsed;
  totalClicks += currentTaskClicks;
  stopTimer();
  currentTaskIndex++;
  loadTask();
}

function skipTask() {
  const elapsed = (Date.now() - taskStartTime) / 1000;
  individualTimes.push(elapsed);
  totalElapsedTime += elapsed;
  stopTimer();
  individualNpcFound.push(currentTaskNpcsFound);
  individualClicks.push(currentTaskClicks);
  individualSkipped.push("Yes");
  totalClicks += currentTaskClicks;
  currentTaskIndex++;
  loadTask();
}

function endTest() {
  screenshot.style.display = "none";
  skipButton.disabled = true;
  startButton.disabled = false;

  let html =
    "<h2>Results</h2><ul style='list-style-type: none; padding-left: 0;'>";
  let totalExpectedNPCs = 0;
  let totalNPCsFound = 0;
  tasks.forEach((task, i) => {
    const expected = task.npcs.length;
    const found = individualNpcFound[i];
    const time = individualTimes[i];
    const click = individualClicks[i];
    const skipped = individualSkipped[i];
    totalExpectedNPCs += expected;
    totalNPCsFound += found;
    html += `<li>Task ${i + 1}: ${time.toFixed(
      2
    )}s, Objectives found: ${found}/${expected}, Clicks on image: ${click}`;
  });

  html += `</ul>
        <h3>Total Time: ${totalElapsedTime.toFixed(2)}s</h3>
        <h3>Total Clicks on Image: ${totalClicks}</h3>
        <h3>Total Objectives Found: ${totalNPCsFound} / ${totalExpectedNPCs}</h3>`;

  resultsDisplay.innerHTML = html;
  resultsDisplay.style.display = "block";
  startButton.style.display = "block";
  startButton.innerHTML = "Restart";
  startButton.dataset.read = "Restart";
  skipButton.style.display = "none";
  const testInstruction = document.getElementById("testInstruction");

  if (testInstruction) {
    testInstruction.innerHTML = "Thank you for your participation!";
    testInstruction.setAttribute(
      "data-read",
      "Thank you for your participation!"
    );
  }
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "block";
  downloadBtn.onclick = () => downloadCSV();
}

// remove all the NPC detective areas
function clearGameArea() {
  const areas = document.querySelectorAll(".npcArea");
  areas.forEach((area) => area.remove());
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - taskStartTime) / 1000;
    timerDisplay.textContent = `Elapsed Time: ${elapsed.toFixed(2)}s`;
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "";
}

let firstClick = null;
// Debug: click to log mouse position relative to image
screenshot.addEventListener("click", (e) => {
  const rect = screenshot.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log(`Mouse Position - X: ${Math.round(x)}, Y: ${Math.round(y)}`);

  // Count all clicks inside the screenshot (even if not on an NPC)
  currentTaskClicks++;

  if (!firstClick) {
    firstClick = { x, y };
    console.log(`First Click - X: ${x}, Y: ${y}`);
  } else {
    const secondClick = { x, y };

    const x1 = Math.min(firstClick.x, secondClick.x);
    const y1 = Math.min(firstClick.y, secondClick.y);
    const width = Math.abs(secondClick.x - firstClick.x);
    const height = Math.abs(secondClick.y - firstClick.y);

    console.log(`Area from first to second click:`);
    console.log(`x: ${x1}, y: ${y1}, width: ${width}, height: ${height}`);

    // Reset for next measurement
    firstClick = null;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "D") {
    document.body.classList.toggle("debug-mode");
  }
});

// Speech function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.cancel(); // cancel previous speech
  window.speechSynthesis.speak(utterance);
}

// Toggle reader mode
readerToggle.addEventListener("click", () => {
  readerOn = !readerOn;
  speak(readerOn ? "Reader On" : "Reader Off");
  document.body.classList.toggle("reader-mode", readerOn);
});

document.addEventListener("mouseover", (e) => {
  if (!readerOn) return;
  const target = e.target.closest("[data-read]");
  if (target) {
    const text = target.getAttribute("data-read") || target.textContent;
    speak(text);
  }
});

// Toggle day/night mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("night-mode");
  const isNight = document.body.classList.contains("night-mode");
  modeToggle.textContent = isNight ? "🌙" : "🌞";
  localStorage.setItem("nightMode", isNight ? "true" : "false");
});

function downloadCSV() {
  let csv = "Task,Time(s),Objectives Found,Expected,Clicks\n";
  let totalExpected = 0,
    totalFound = 0;

  tasks.forEach((task, i) => {
    const expected = task.npcs.length;
    const found = individualNpcFound[i];
    const time = individualTimes[i];
    const clicks = individualClicks[i];
    totalExpected += expected;
    totalFound += found;

    csv += `Task ${i + 1},${time.toFixed(2)},${found},${expected},${clicks}\n`;
  });

  csv += `Total,,${totalFound},${totalExpected},${totalClicks},\n`;
  csv += `Total Time,${totalElapsedTime.toFixed(2)}\n`;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Get set number from the dropdown
  const setNumber = document.getElementById("setSelect")?.value || "unknown";

  // Get timestamp: YYYYMMDD_HHMMSS
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 15);

  const filename = `${setNumber}_${timestamp}.csv`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
