import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Importieren Sie Ihre CSS-Datei

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Entfernen des Tokens
    localStorage.removeItem("username");
    navigate("/login"); // Umleitung zur Login-Seite
  };
  const handleLogoutAndToggle = () => {
    toggleSidebar();
    handleLogout();
  };
  

  const navigationLinks = [
    {
      path: "/home",
      label: "Home",
    },
    {
      path: "/angebote",
      label: "Angebote",
    },
    {
      path: "/meine-tausche",
      label: "Meine Tauschanfragen",
    },
    {
      path: "/settings",
      label: "Kontoeinstellungen",
    },
    {
      path: "/logout",
      label: "Ausloggen",
    },
    {
      path: "/tausche",
      label: "Tausche",
    },
  ];

  return (
    <div className={`navMain ${isCollapsed ? "collapsed" : ""}`}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      {navigationLinks.map((link, index) => (
        <NavLink key={index} to={link.path} onClick={toggleSidebar}>
          <li>{link.label}</li>
        </NavLink>
      ))}
      <button onClick={handleLogoutAndToggle}>Ausloggen</button> {/* Logout-Button */}
    </div>
  );
};

export default Sidebar;
