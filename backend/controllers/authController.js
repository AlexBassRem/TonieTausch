const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Ihr_Secret_Key"; // Setzen Sie einen sicheren Schlüssel ein

const register = async (req, res) => {
  try {
    const { username, password, email, vorname, nachname } = req.body;

    // Überprüfen, ob der Benutzer bereits existiert (anhand von Benutzername oder E-Mail)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send("Benutzername oder E-Mail bereits vergeben.");
    }

    // Hash das Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstellen eines neuen Benutzers
    const user = new User({
      username,
      password: hashedPassword,
      email,
      vorname,
      nachname,
    });
    await user.save();

    res.status(201).send("Benutzer erfolgreich registriert.");
  } catch (error) {
    res.status(500).send("Fehler bei der Registrierung.");
  }
  
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Überprüfen, ob der Benutzer existiert
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Benutzername oder Passwort falsch.");
    }

    // Überprüfen des Passworts
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Benutzername oder Passwort falsch.");
    }

    // Generieren eines JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send("Fehler beim Login.");
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

module.exports = { register, login, getAllUsers };
