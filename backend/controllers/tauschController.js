const mongoose = require('mongoose');
const { getTauschModel } = require("../models/Tausch");
const { getAngebotModel } = require("../models/Angebot");

const Tausch = getTauschModel();
const Angebot = getAngebotModel();

const createTausch = async (angebotAId) => {
  try {
    console.log(`AngebotAId: ${angebotAId}`);
    const angebotA = await Angebot.findById(angebotAId).exec();

    if (!angebotA) {
      throw new Error("Angebot A existiert nicht.");
    }

    const existingTausch = await Tausch.findOne({
      $or: [{ angebotA: angebotAId }, { angebotB: angebotAId }],
      status: { $in: ["pending", "confirmed"] },
    }).exec();

    if (existingTausch) {
      throw new Error("Das Angebot ist bereits an einem anderen Tausch beteiligt.");
    }

    const tausch = new Tausch({
      angebotA: angebotAId,
      bestaetigungA: true,
      bestaetigungB: false,
      status: "pending",
    });

    const savedTausch = await tausch.save();
    console.log(`Tausch erstellt: ${savedTausch}`);
    return savedTausch;
  } catch (error) {
    console.error(`Fehler beim Erstellen des Tausches: ${error}`);
    throw new Error(`Fehler beim Erstellen des Tausches: ${error.message}`);
  }
};

const confirmTausch = async (tauschId, nutzerId) => {
  try {
    const tausch = await Tausch.findById(tauschId);
    if (!tausch) {
      throw new Error("Tausch not found");
    }

    // Bestätigung setzen basierend darauf, welcher Nutzer (A oder B) die Bestätigung sendet
    if (tausch.angebotA.equals(nutzerId)) {
      tausch.bestaetigungA = true;
    } else if (tausch.angebotB.equals(nutzerId)) {
      tausch.bestaetigungB = true;
    }

    // Wenn beide Nutzer bestätigt haben, den Status aktualisieren
    if (tausch.bestaetigungA && tausch.bestaetigungB) {
      tausch.status = "completed";
    }

    const updatedTausch = await tausch.save();
    return updatedTausch;
  } catch (error) {
    // Fehlerbehandlung
    console.error(error);
    throw new Error("Error confirming tausch");
  }
};

const deleteTausch = async (tauschId, nutzerId) => {
  try {
    const tausch = await Tausch.findById(tauschId);
    if (!tausch) {
      throw new Error("Tausch not found");
    }

    // Überprüfen, ob der anfordernde Nutzer einer der Tauschpartner ist
    if (
      !tausch.angebotA.equals(nutzerId) &&
      !tausch.angebotB.equals(nutzerId)
    ) {
      throw new Error("Nutzer ist nicht berechtigt, diesen Tausch zu löschen");
    }

    // Wenn einer der Nutzer den Tausch löscht, wird er für beide Nutzer gelöscht
    await Tausch.findByIdAndRemove(tauschId);
    return { message: "Tausch erfolgreich gelöscht" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting tausch: " + error.message);
  }
};

const getTauscheForUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(`Abrufen der Tausche für Nutzer-ID: ${userId}`);

    const tausche = await Tausch.find({
      $or: [
        { "angebotA.besitzer": userId },
        { "angebotB.besitzer": userId },
      ],
    })
    .populate("angebotA")
    .populate("angebotB");

    console.log(`Gefundene Tausche: ${JSON.stringify(tausche, null, 2)}`);

    // Überprüfen, ob Tauschanfragen vorhanden sind
    if (tausche.length === 0) {
      console.log("Keine Tauschanfragen gefunden.");
      return res
        .status(500)
        .json({ message: "Keine Tauschanfragen gefunden." });
    }

    res.json(tausche);
  } catch (error) {
    console.error("Fehler beim Abrufen der Tausche:", error);
    res
      .status(500)
      .json({ message: "Fehler beim Abrufen der Tauschanfragen." });
  }
};



module.exports = {
  createTausch,
  confirmTausch,
  deleteTausch,
  getTauscheForUser,
};
