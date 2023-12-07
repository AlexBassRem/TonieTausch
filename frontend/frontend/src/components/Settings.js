import React, { useState } from "react";
import axios from "../api/axios";

const Settings = () => {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [passwort, setPasswort] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "/auth/settings",
        { vorname, nachname, passwort },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Einstellungen erfolgreich aktualisiert.");
      } else {
        setMessage("Fehler beim Aktualisieren der Einstellungen.");
      }
    } catch (error) {
      setMessage(
        "Fehler beim Aktualisieren der Einstellungen: " + error.response.data
      );
    }
  };

  return (
    <div>
      <h2>Kontoeinstellungen</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vorname:</label>
          <input
            type="text"
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
          />
        </div>
        <div>
          <label>Nachname:</label>
          <input
            type="text"
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
          />
        </div>
        <div>
          <label>Passwort:</label>
          <input
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
          />
        </div>
        <button type="submit">Änderungen speichern</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
