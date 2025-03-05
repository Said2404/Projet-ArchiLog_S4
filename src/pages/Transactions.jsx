import React, { useState } from "react";
import "../styles/Transactions.css";

const Transactions = () => {
  // Vérifie si le solde total est déjà stocké, sinon initialise à 0
  const storedTotal = localStorage.getItem("total");
  const initialTotal = storedTotal ? parseFloat(storedTotal) : 0;

  // Charge les transactions stockées ou initialise une liste vide
  const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
  const [transactions, setTransactions] = useState(storedTransactions);
  const [total, setTotal] = useState(initialTotal);

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
  });

  // Gérer les changements des inputs
  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  // Ajouter une transaction et forcer le rafraîchissement
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const amount = parseFloat(newTransaction.amount);
    const isRevenue = newTransaction.category === "Revenus";
    const signedAmount = isRevenue ? amount : -Math.abs(amount);

    const newEntry = {
      id: new Date().getTime(), // Génération d'un ID unique
      description: newTransaction.description,
      amount: signedAmount,
      category: newTransaction.category,
    };

    const updatedTransactions = [...transactions, newEntry];
    const updatedTotal = total + signedAmount;

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("total", updatedTotal.toString());

    window.location.reload(); // 🔄 Rafraîchit la page pour voir les changements
  };

  // Supprimer une transaction et forcer le rafraîchissement
  const handleDelete = (id) => {
    const transactionToDelete = transactions.find((t) => t.id === id);
    if (!transactionToDelete) return;

    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    const updatedTotal = total - transactionToDelete.amount;

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("total", updatedTotal.toString());

    window.location.reload(); // 🔄 Rafraîchit la page après suppression
  };

  return (
    <div className="transactions-container">
      <h2>📜 Liste des Transactions</h2>
      <h3 className="account-balance">💰 Solde total : {total}€</h3>

      <ul className="transactions-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.amount < 0 ? "expense" : "income"}>
            <strong>{transaction.description}</strong> - {transaction.amount}€
            <button className="delete-button" onClick={() => handleDelete(transaction.id)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>➕ Ajouter une transaction</h3>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTransaction.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Montant"
          value={newTransaction.amount}
          onChange={handleChange}
        />
        <select name="category" value={newTransaction.category} onChange={handleChange}>
          <option value="">-- Sélectionnez une catégorie --</option>
          <option value="Revenus">Revenus</option>
          <option value="Nourriture">Nourriture</option>
          <option value="Loyer">Loyer</option>
          <option value="Transport">Transport</option>
          <option value="Divertissement">Divertissement</option>
          <option value="Santé">Santé</option>
          <option value="Shopping">Shopping</option>
          <option value="Autres">Autres</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Transactions;
