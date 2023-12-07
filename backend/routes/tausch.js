const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTausch, confirmTausch, deleteTausch, getTauscheForUser } = require("../controllers/tauschController");

// Route zum Erstellen eines neuen Tausches
router.post("/", createTausch);

// Route zum Bestätigen eines Tausches
router.patch("/confirm", confirmTausch);

// Route zum Löschen eines Tausches
router.delete("/:tauschId", deleteTausch);

// Route zu allen Tauschanfragen
router.get('/meine', authMiddleware, getTauscheForUser);

// Route zum Initiieren eines Tausches
router.post("/initiate", authMiddleware, async (req, res) => {
    try {
      const { angebotAId } = req.body; // Stellen Sie sicher, dass dies mit dem Schlüssel im Request-Body übereinstimmt
      console.log(`AngebotAId aus Route: ${angebotAId}`);
  
      if (!angebotAId) {
        return res.status(400).json({ message: 'Angebot A ID ist erforderlich.' });
      }
  
      const tausch = await createTausch(angebotAId);
      res.status(201).json(tausch);
    } catch (error) {
      console.error(`Fehler beim Initiieren des Tausches: ${error}`);
      res.status(500).json({ message: 'Fehler beim Initiieren des Tausches.' });
    }
  });
  
// Route zum Bestätigen eines Tausches
router.patch("/confirm/:tauschId", authMiddleware, async (req, res) => {
  try {
    const { tauschId } = req.params;
    const nutzerId = req.user.userId; // ID des Nutzers A

    // Funktion zum Bestätigen des Tausches
    const updatedTausch = await confirmTausch(tauschId, nutzerId);
    res.status(200).json(updatedTausch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Bestätigen des Tausches.' });
  }
});

module.exports = router;
