const Angebot = require("../models/Angebot").getAngebotModel();
const TonieBibliothek = require("../models/TonieBibliothek");
const Nutzer = require("../models/userModel");

// GET /api/angebote
exports.getAngebote = async (req, res) => {
  try {
    const angebote = await Angebot.find({ aktiv: true });
    res.status(200).json(angebote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/angebote
exports.createAngebot = async (req, res) => {
  try {
    // Extrahieren der Angebotsdaten aus dem Request-Body
    const besitzer = req.user.userId;
    const { aktiv, tonieHaben, tonieWollen, condition } = req.body;

    // Erstellen eines neuen Angebots
    const neuesAngebot = new Angebot({
      aktiv,
      tonieHaben,
      tonieWollen,
      besitzer,
      condition,
    });

    // Speichern des neuen Angebots in der Datenbank
    await neuesAngebot.save();
    console.log(neuesAngebot + " NEUES ANGEBOT");

    res.status(201).json(neuesAngebot);
  } catch (error) {
    console.error("Fehler beim Erstellen des Angebots:", error);
    res.status(500).json({ message: "Fehler beim Erstellen des Angebots" });
  }
};

// PUT /api/angebote/:id
exports.updateAngebot = async (req, res) => {
  const { id } = req.params;
  const { aktiv, tonieHaben, tonieWollen, besitzer, condition } = req.body;

  try {
    const updatedAngebot = await Angebot.findByIdAndUpdate(
      id,
      {
        aktiv,
        tonieHaben,
        tonieWollen,
        besitzer,
        condition,
      },
      { new: true }
    ); // Gibt das aktualisierte Dokument zurück

    if (!updatedAngebot) {
      return res.status(404).json({ message: "Angebot nicht gefunden." });
    }

    res.status(200).json(updatedAngebot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /api/angebote/:id/deactivate
exports.deactivateAngebot = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAngebot = await Angebot.findByIdAndUpdate(
      id,
      {
        aktiv: false,
      },
      { new: true }
    ); // Gibt das aktualisierte Dokument zurück

    if (!updatedAngebot) {
      return res.status(404).json({ message: "Angebot nicht gefunden." });
    }

    res
      .status(200)
      .json({ message: "Angebot wurde deaktiviert.", updatedAngebot });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAngeboteByNutzerId = async (req, res) => {
  try {
    // Annahme: Die Benutzer-ID des eingeloggten Nutzers wird aus der Anfrage verwendet.
    const benutzerId = req.user.userId;
    // Suche alle Angebote des eingeloggten Nutzers
    const angebote = await Angebot.find({ besitzer: benutzerId })
      .populate("tonieHaben")
      .populate("tonieWollen");
    res.json(angebote);
  } catch (error) {
    console.error("Fehler beim Abrufen der Angebote:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

exports.getAngeboteNotByThisUser = async (req, res) => {
  try {
    // Annahme: Die Benutzer-ID des eingeloggten Nutzers wird aus der Anfrage verwendet.
    const benutzerId = req.user.userId;
    // Suche alle Angebote des eingeloggten Nutzers
    const angebote = await Angebot.find({ besitzer: { $ne: benutzerId } })
      .populate("tonieHaben")
      .populate("tonieWollen")
      .populate("besitzer");
    res.json(angebote);
  } catch (error) {
    console.error("Fehler beim Abrufen der Angebote:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
};

exports.initiateTausch = async (req, res) => {
  try {
    const angebotId = req.params.id;
    const angebot = await Angebot.findById(angebotId);

    if (!angebot) {
      return res.status(404).json({ message: "Angebot nicht gefunden" });
    }

    angebot.getauscht = true;
    await angebot.save();

    res.status(200).json({ message: "Tausch erfolgreich initiiert", angebot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim Initiieren des Tausches" });
  }
};
