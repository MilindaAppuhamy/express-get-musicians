const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

app.post("/musicians", async (req, res) => {
  const newMusician = await Musician.create({
    name: req.body.name,
    instrument: req.body.instrument,
  });
  res.json(newMusician);
});

app.put("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  const updatedmusician = await musician.update({
    name: req.body.name,
    instrument: req.body.instrument,
  });
  res.json(updatedmusician);
});

app.delete("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  const deletedMusician = await musician.destroy();
  res.json(deletedMusician);
});

module.exports = app;
