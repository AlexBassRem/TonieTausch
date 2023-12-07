import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Nicht eingeloggt, leite zur Login-Seite um
    return <Navigate to="/login" />;
  }

  return children; // Zeige Kind-Komponenten, wenn der Benutzer eingeloggt ist
};

export default ProtectedRoute;
