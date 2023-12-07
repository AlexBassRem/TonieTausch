import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import GenericList from "./UI/ListeTemplate";
import { useNavigate } from "react-router-dom";

const AngeboteListe = () => {
  const navigate = useNavigate();
  const [angebote, setAngebote] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAngebote = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("fetchAngebote");
        const response = await axios.get("/api/angebote/alleangebote", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAngebote(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Fehler beim Laden der Angebote");
        console.error(error);
      }
    };

    fetchAngebote();
  }, []);

  const handleTauschInit = async (angebotId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.patch(`/api/angebote/${angebotId}/initiateTausch`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Tausch erfolgreich initiiert');
        
    } catch (error) {
        console.error('Fehler beim Initiieren des Tausches:', error);
    }
};
  
  
  

  // Render-Funktion für jedes Angebot
  const renderAngebot = (angebot) => (
    <div>
      <h3>
        {angebot.tonieHaben.name} von {angebot.besitzer.username} Tauschen gegen : {angebot.tonieWollen.name}
      </h3>
      <button onClick={() => handleTauschInit(angebot._id)}>
        Tausch initiieren
      </button>
      
    </div>
  );

  const handleButtonClick = () => {
    navigate('/angebote/neues'); 
  };

  return (
    <div>
      <h1>Hier finden sich alle Angebote der anderen Nutzer</h1>
      {error && <p>{error}</p>}
      <GenericList items={angebote} renderItem={renderAngebot} />
      <button onClick={handleButtonClick}>Neues Angebot erstellen</button>
    </div>
  );
};

export default AngeboteListe;
