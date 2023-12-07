import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Login from "./components/Login";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Angebote from "./components/Angebote";
import Sidebar from "./components/UI/Sidebar";
import NeuesAngebot from "./components/NeuesAngebot";
import MeineTausche from "./components/MeineTausche";
import "./styles/styles.css";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main style={{ minHeight: "80vh" }}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />{" "}
        {/* Content-Bereich */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/angebote"
            element={
              <ProtectedRoute>
                <Angebote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/angebote/neues"
            element={
              <ProtectedRoute>
                <NeuesAngebot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meine-tausche"
            element={
              <ProtectedRoute>
                <MeineTausche />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Missing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
