const express = require("express");
const app = express();
const musicians = require("../routes/musicians");
const bands = require("../routes/bands");

app.use("/musicians", musicians);
app.use("/bands", bands);

module.exports = app;
