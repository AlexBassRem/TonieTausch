import React from 'react';
import '../../styles/styles.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} TonieTausch
      </div>
    </footer>
  );
};

export default Footer;
