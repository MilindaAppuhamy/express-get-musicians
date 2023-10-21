const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

router.post("/", async (req, res) => {
  const newMusician = await Musician.create({
    name: req.body.name,
    instrument: req.body.instrument,
  });
  res.json(newMusician);
});

router.put("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  const updatedmusician = await musician.update({
    name: req.body.name,
    instrument: req.body.instrument,
  });
  res.json(updatedmusician);
});

router.delete("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  const deletedMusician = await musician.destroy();
  res.json(deletedMusician);
});

module.exports = router;
