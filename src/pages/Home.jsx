import React, { useState } from "react";
import PieChartComponent from "../components/PieChartComponent";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const total = parseFloat(localStorage.getItem("total")) || 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* 🔳 Navbar */}
      <header className="home-header">
        <h1>La vie financière</h1>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </header>

      {/* 📊 Conteneur des diagrammes (alignés au centre) */}
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
      {isMenuOpen && (
        <div className="side-menu">
          <button onClick={() => setIsMenuOpen(false)}>✖</button>
          <Link to="/transactions">📜 Voir les transactions</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
