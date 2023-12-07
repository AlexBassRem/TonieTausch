const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Ihr_Secret_Key";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extrahiert das Token aus dem Authorization Header
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // Speichert das dekodierte Benutzerobjekt in req.user
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentifizierung fehlgeschlagen" });
  }
};

module.exports = authMiddleware;
