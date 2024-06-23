const express = require("express");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "counters.json");
const app = express();
const port = 3000;

function loadCounters() {
  try {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist return standard values
    return { home: 0, about: 0 };
  }
}

function saveCounters(counters) {
  fs.writeFileSync(dataPath, JSON.stringify(counters, null, 2));
}

let counters = loadCounters(); // starting values

app.get("/", (req, res) => {
  counters.home += 1;
  saveCounters(counters);
  res.send(`<h1>Home Page</h1>
    <p>Home count: ${counters.home}</p>`);
});

app.get("/about", (req, res) => {
  counters.about += 1;
  saveCounters(counters);
  res.send(`<h1>About Page</h1>
    <p>About count: ${counters.about}</p>`);
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
