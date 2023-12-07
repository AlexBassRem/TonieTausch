// Importiere die dotenv-Bibliothek und konfiguriere sie, um Umgebungsvariablen zu laden
require("dotenv").config();

// Importiere die Express-Bibliothek
const express = require("express");
const cors = require("cors");

// Erstelle eine Instanz der Express-Anwendung
const app = express();

// Importiere die Mongoose-Bibliothek, um MongoDB zu verwenden
const mongoose = require("mongoose");

// Importiere eine Funktion, um die Verbindung zur Datenbank herzustellen, wahrscheinlich in einer separaten Datei (./config/dbConn)
const connectDB = require("./config/dbConn");

// Definiere einen Port, auf dem der Server laufen soll, indem du die Umgebungsvariable PORT verwendest, standardmäßig 3500
const PORT = process.env.PORT || 3500;

// Rufe die Funktion connectDB auf, um eine Verbindung zur MongoDB herzustellen
connectDB();

// Middleware: Parse JSON-Anfragen automatisch
app.use(express.json());
app.use(cors());

//Testroute
app.get("/testregister", (req, res) => {
  res.send("Test register route is working");
});

// routes

app.use("/api/tonies", require("./routes/tonie"));
app.use("/auth", require("./routes/auth"));
app.use("/api/angebote", require("./routes/angebot"));
app.use("/api/tausche", require("./routes/tausch"));

//Fallback 404-Route
app.use((req, res) => {
  res.status(404).send("404 - Not REALLY! Found");
});

// Sobald die Verbindung zur MongoDB geöffnet ist, führe diese Funktion aus
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  // Starte den Express-Server und höre auf dem angegebenen Port
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
