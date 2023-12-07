const express = require("express");
const router = express.Router();
const tonieController = require("../controllers/tonieController");

// Routen für TonieBibliothek
router
  .route("/")
  .get(tonieController.getAllTonies) // Abrufen aller Tonies
  .post(tonieController.createNewTonie); // Erstellen eines neuen Tonies

router
  .route("/:id")
  .get(tonieController.getTonieById) // Abrufen eines Tonies anhand der ID
  .put(tonieController.updateTonieById) // Aktualisieren eines Tonies anhand der ID
  .delete(tonieController.deleteOneTonie); // Löschen eines Tonies anhand der ID

// Spezielle Route für Entwickler, um alle Tonies zu löschen
router
  .route("/delete-all")
  .delete(tonieController.deleteAllTonies);

module.exports = router;
