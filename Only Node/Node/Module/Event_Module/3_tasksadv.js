const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const emitter = new EventEmitter();

const dataFile = path.join(__dirname, "eventCounts.json");

// Load existing data or initialize if file doesn't exist
let eventCounts;

try {
  const rawData = fs.readFileSync(dataFile);
  eventCounts = JSON.parse(rawData);
} catch (err) {
  eventCounts = {
    "user-login": 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0,
  };
}

// Helper: Save to file
function saveCounts() {
  fs.writeFileSync(dataFile, JSON.stringify(eventCounts, null, 2));

  //null → means don’t filter any keys.
  //2 → means indent JSON with 2 spaces (for pretty output).

  
  // JSON.stringify(value, replacer, space)
  // value: The object you want to convert.
  // replacer: Something that tells which parts of the object to include or ignore.
  // space: How many spaces to add to format (make it look nice).
}

// Event listeners
emitter.on("user-login", (username) => {
  eventCounts["user-login"]++;
  console.log(`${username} logged in!`);
  saveCounts();
});

emitter.on("user-purchase", (username, item) => {
  eventCounts["user-purchase"]++;
  console.log(`${username} purchased ${item}!`);
  saveCounts();
});

emitter.on("profile-update", (username, field) => {
  eventCounts["profile-update"]++;
  console.log(`${username} updated their ${field}!`);
  saveCounts();
});

emitter.on("user-logout", (username) => {
  eventCounts["user-logout"]++;
  console.log(`${username} logged out!`);
  saveCounts();
});

emitter.on("summary", () => {
  console.log("\n📊 Event Summary:");
  console.log(eventCounts);
});

// Emit test events
emitter.emit("user-login", "Harsh");
emitter.emit("user-purchase", "Harsh", "Laptop");
// emitter.emit("profile-update", "Harsh", "email");
// emitter.emit("user-logout", "Harsh");

emitter.emit("summary");
