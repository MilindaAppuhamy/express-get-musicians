const express = require("express");
const router = express.Router();
const { Band } = require("../models/index");
const { db } = require("../db/connection");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const band = await Band.findByPk(id);
  res.json(band);
});

router.post("/", async (req, res) => {
  const newBand = await Band.create({
    name: req.body.name,
    genre: req.body.genre,
  });
  res.json(newBand);
});

router.put("/:id", async (req, res) => {
  const band = await Band.findByPk(req.params.id);
  const updatedBand = await band.update({
    name: req.body.name,
    genre: req.body.genre,
  });
  res.json(updatedBand);
});

router.delete("/:id", async (req, res) => {
  const band = await Band.findByPk(req.params.id);
  const deletedBand = await band.destroy();
  res.json(deletedBand);
});

module.exports = router;
