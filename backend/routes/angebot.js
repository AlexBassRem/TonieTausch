const express = require("express");
const router = express.Router();
const angebotController = require("../controllers/angebotController");
const authMiddleware = require('../middleware/authMiddleware');

router
  .get("/", angebotController.getAngebote)
  .post("/", authMiddleware, angebotController.createAngebot);

router.get("/nutzerangebote", authMiddleware ,angebotController.getAngeboteByNutzerId);
router.get("/alleangebote", authMiddleware ,angebotController.getAngeboteNotByThisUser);

// Route für das Deaktivieren eines Angebots
router.route("/:id/deactivate").patch(angebotController.deactivateAngebot);

// Route für das Aktualisieren eines Angebots
router.route("/:id").put(angebotController.updateAngebot);

//Route für das Simulieren von Tauschen
router.patch('/:id/initiateTausch', authMiddleware, angebotController.initiateTausch);


module.exports = router;
