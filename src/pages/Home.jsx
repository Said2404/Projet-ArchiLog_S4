import React, { useState } from "react";
import PieChartComponent from "../components/PieChartComponent";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const total = parseFloat(localStorage.getItem("total")) || 0;

  // 🔥 État pour afficher le menu latéral
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* 🔳 Navbar */}
      <header className="home-header">
        <h1>La vie financière</h1>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </header>

      {/* 📊 Conteneur des diagrammes */}
      <div className="charts-wrapper">
        <div className="chart-container">
          <PieChartComponent transactions={transactions} />
        </div>
        <div className="chart-container">
          <PieChartComponent transactions={transactions} />
        </div>
      </div>

      {/* 💰 Solde total */}
      <h3 className="account-balance">💰 Solde total : {total}€</h3>

      {/* 📂 Menu latéral */}
<div className={`sidebar-menu ${isMenuOpen ? "open" : ""}`}>
  <button className="close-menu" onClick={() => setIsMenuOpen(false)}>✖</button>
  <ul>
    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>🏠 Accueil</Link></li>
    <li><Link to="/transactions" onClick={() => setIsMenuOpen(false)}>📜 Voir les transactions</Link></li>
  </ul>
</div>


      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </div>
  );
};

export default Home;
