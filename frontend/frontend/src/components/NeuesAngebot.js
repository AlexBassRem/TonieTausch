import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 

const NeuesAngebot = () => {
  const [aktiv] = useState(true);
  const [tonieHaben, setTonieHaben] = useState('');
  const [tonieWollen, setTonieWollen] = useState('');
  const [tonies, setTonies] = useState([]); // Zustand für die Tonie-Daten
  const [condition, setCondition] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Funktion, um Tonie-Daten beim Laden der Seite abzurufen
    const fetchTonies = async () => {
      try {
        const response = await axios.get('/api/tonies'); // URL anpassen
        setTonies(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Tonies:', error);
      }
    };

    fetchTonies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tonieHaben || !tonieWollen) {
      setMessage('Bitte wählen Sie gültige Tonies aus.');
      return;
    }

    console.log(tonieHaben + ' HABEN');
    console.log(tonieWollen + ' WOLLEN');

    try {
      const token = localStorage.getItem('token');
      

      const response = await axios.post('/api/angebote', {
        aktiv,
        tonieHaben,
        tonieWollen,
        condition
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage('Angebot erfolgreich erstellt.');
      console.log(response.data); // Für Debugging-Zwecke
    } catch (error) {
      console.error('Fehler beim Erstellen des Angebots:', error);
      setMessage('Fehler beim Erstellen des Angebots.');
    }
  };


  return (
    <div>
      <h2>Neues Angebot erstellen</h2>
      <form onSubmit={handleSubmit}>
        
        <label>
          Tonie Haben:
          <select value={tonieHaben} onChange={(e) => setTonieHaben(e.target.value)}>
            {tonies.map((tonie) => (
              <option key={tonie._id} value={tonie._id}>
                {tonie.name} {/* Name des Tonies anzeigen */}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Tonie Wollen:
          <select value={tonieWollen} onChange={(e) => setTonieWollen(e.target.value)}>
            {tonies.map((tonie) => (
              <option key={tonie._id} value={tonie._id}>
                {tonie.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Zustand:
          <input
            type="number"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <br />
        <button type="submit">Angebot Erstellen</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NeuesAngebot;
