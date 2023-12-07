import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const MeineTausche = () => {
  const [tausche, setTausche] = useState([]);
  const [error, setError] = useState("");

  const fetchTausche = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.get("/api/tausche/meine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTausche(response.data);
    } catch (err) {
      setError("Fehler beim Laden der Tauschanfragen: " + err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTausche();
  }, []);

  const handleTauschConfirm = async (tauschId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/tausche/confirm/${tauschId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Bestätigungsnachricht anzeigen oder die Seite aktualisieren, um den geänderten Status anzuzeigen
      fetchTausche(); // Um die Liste der Tauschanfragen zu aktualisieren
    } catch (error) {
      console.error("Fehler beim Bestätigen des Tausches:", error);
      setError("Fehler beim Bestätigen des Tausches: " + error.message);
    }
  };

  return (
    <div>
      <h1>Meine Tauschanfragen</h1>
      {error && <p>{error}</p>}
      <ul>
        {tausche.map((tausch) => (
          <li key={tausch._id}>
            Tausch zwischen Angebot A und Angebot B
            <button onClick={() => handleTauschConfirm(tausch._id)}>
              Tausch bestätigen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeineTausche;
