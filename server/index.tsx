
// @ts-ignore
const express = require('express');
const app = express(); // create express app
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "build")));

const port = process.env.PORT || 300;

// start express server on port 5000
app.set('port', port);
app.listen(port, () => {
  console.log("server started on port 300");
});

module.exports = {};
