const { getTonieModel } = require("../models/TonieBibliothek");
const mongoose = require("mongoose");

const getAllTonies = async (req, res) => {
  try {
    const Tonie = getTonieModel();
    const tonies = await Tonie.find();
    if (!tonies.length) return res.status(404).json({ message: "No Tonies found." });
    res.json(tonies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteAllTonies = async (req, res) => {
  try {
    const Tonie = getTonieModel();
    await Tonie.deleteMany();
    res.status(200).json({ message: "All Tonies have been deleted." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getTonieById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  try {
    const Tonie = getTonieModel();
    const tonie = await Tonie.findById(id);
    if (!tonie) return res.status(404).json({ message: "Tonie not found." });
    res.json(tonie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteOneTonie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }
  try {
    const Tonie = getTonieModel();
    const tonie = await Tonie.findById(id);
    if (!tonie) return res.status(404).json({ message: "Tonie not found." });
    await Tonie.deleteOne({ _id: id });
    res.status(200).json({ message: `Tonie with ID ${id} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const createNewTonie = async (req, res) => {
  const { name, genre, fsk, duration } = req.body;
  if (!name || !genre || !fsk || !duration) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const Tonie = getTonieModel();
    const newTonie = await Tonie.create({ name, genre, fsk, duration });
    res.status(201).json(newTonie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateTonieById = async (req, res) => {
  const { id } = req.params;
  const { name, genre, fsk, duration } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }
  try {
    const Tonie = getTonieModel();
    const updatedTonie = await Tonie.findByIdAndUpdate(id, { name, genre, fsk, duration }, { new: true });
    if (!updatedTonie) return res.status(404).json({ message: "Tonie not found." });
    res.json(updatedTonie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllTonies,
  createNewTonie,
  deleteOneTonie,
  getTonieById,
  deleteAllTonies,
  updateTonieById,
};
