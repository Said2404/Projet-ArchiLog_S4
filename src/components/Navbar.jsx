import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/App.css"; // Assure-toi que les styles sont bien importés

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">La vie financière</h1>
      <button className="menu-button" onClick={toggleMenu}>☰</button>

      {/* 📂 Menu latéral */}
      <div className={`sidebar-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={toggleMenu}>✖</button>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>🏠 Accueil</Link></li>
          <li><Link to="/transactions" onClick={toggleMenu}>📜 Voir les transactions</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
