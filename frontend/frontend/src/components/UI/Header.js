import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; 

const Header = ({ toggleSidebar }) => {
  const username = localStorage.getItem("username") || "Gast";

  return (
    <header className="header">
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>Toggle Sidebar</button>
      <nav className="header-nav">
        <Link to="/" className="header-home-link">
          TonieTausch
        </Link>

        <span className="header-username">
          {username}
        </span>
      </nav>
    </header>
  );
};

export default Header;
