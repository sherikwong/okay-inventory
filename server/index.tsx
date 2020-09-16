
// @ts-ignore
const express = require('express');
const app = express(); // create express app
const path = require("path");

const port = process.env.PORT || 300;
app.set('port', port);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "build")));

app.listen(port, () => {
  console.log("server started on port 300");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});


module.exports = {};
