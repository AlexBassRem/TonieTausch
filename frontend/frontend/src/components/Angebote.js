import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AngeboteListe = () => {
  const navigate = useNavigate();
  const [angebote, setAngebote] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAngebote = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/angebote/nutzerangebote", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAngebote(response.data);
      } catch (error) {
        setError("Fehler beim Laden der Angebote");
        console.error(error);
      }
    };
    fetchAngebote();
  }, []);

  const handleTauschInit = (angebotId) => {
    console.log('Tausch initiieren für Angebot ID:', angebotId);
  };

  const handleButtonClick = () => {
    navigate("/angebote/neues");
  };

  return (
    <div>
      <h1>Angebot erstellen !</h1>
      {error && <p>{error}</p>}
      {angebote.map((angebot) => (
        <div key={angebot._id}>
          <h3>
            {angebot.tonieHaben.name} Tauschen gegen: {angebot.tonieWollen.name}
          </h3>
          <button onClick={() => handleTauschInit(angebot._id)}>
            Tausch initiieren
          </button>
        </div>
      ))}
      <button onClick={handleButtonClick}>Neues Angebot erstellen</button>
    </div>
  );
};

export default AngeboteListe;
