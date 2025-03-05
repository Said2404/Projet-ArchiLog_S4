import React from "react";
import "../styles/Transactions.css";

const Transactions = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const total = parseFloat(localStorage.getItem("total")) || 0;

  return (
    <div className="transactions-container">
      <h2>📜 Liste des Transactions</h2>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <p key={transaction.id}>{transaction.description} - {transaction.amount}€</p>
        ))}
      </div>
      <h3 className="account-balance">💰 Solde total : {total}€</h3>
    </div>
  );
};

export default Transactions;
