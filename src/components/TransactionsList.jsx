import { useState } from "react";

const categories = [
    "Nourriture",
    "Loyer",
    "Transport",
    "Divertissement",
    "Revenus",
    "Santé",
    "Shopping",
    "Autres"
  ];

  
const TransactionsList = () => {
  // Charger les transactions depuis localStorage au démarrage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Calculer le total au chargement des transactions
  const [total, setTotal] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions).reduce((acc, transaction) => acc + transaction.amount, 0)
      : 0;
  });

  // State pour la nouvelle transaction
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
  });

  // Mise à jour des champs de saisie
  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  // Ajouter une transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    // Convertir en nombre
    const amount = parseFloat(newTransaction.amount);
  
    // Déterminer si c'est un revenu ou une dépense
    const isRevenue = newTransaction.category === "Revenus";
    const signedAmount = isRevenue ? amount : -Math.abs(amount); // Garde positif pour les revenus, négatif pour les dépenses
  
    const newEntry = {
      id: transactions.length + 1,
      description: newTransaction.description,
      amount: signedAmount,
      category: newTransaction.category,
    };
  
    const updatedTransactions = [...transactions, newEntry];
  
    // Mettre à jour le solde
    const updatedTotal = total + signedAmount;
  
    setTransactions(updatedTransactions);
    setTotal(updatedTotal);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    localStorage.setItem("total", updatedTotal.toString()); // Stocker le solde mis à jour
  
    setNewTransaction({ description: "", amount: "", category: "" });
  
    window.location.reload(); // 🔥 Rafraîchissement automatique
  };
  

  // Supprimer une transaction
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);

    setTransactions(updatedTransactions);
    setTotal(updatedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0));
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    window.location.reload(); // 🔥 Rafraîchissement automatique pour bien mettre à jour le total
  };

  const getTransactionsByCategory = () => {
    const groupedTransactions = {};
    categories.forEach(cat => groupedTransactions[cat] = []); // Initialise chaque catégorie
    
    transactions.forEach(transaction => {
      if (!groupedTransactions[transaction.category]) {
        groupedTransactions["Autres"].push(transaction); // Si la catégorie n’existe pas, la mettre en "Autres"
      } else {
        groupedTransactions[transaction.category].push(transaction);
      }
    });
  
    return groupedTransactions;
  };
  
  
  const transactionsByCategory = getTransactionsByCategory();

  return (
    <div className="container">
      <h2 className="balance">📜 Liste des Transactions</h2>
      <h3 className="balance">💰 Solde total : {total}€</h3>
  
      {Object.keys(transactionsByCategory).map((category) => (
        <div key={category}>
          <h3 className="transaction-category">{category}</h3>
          <ul className="transaction-list">
            {transactionsByCategory[category].map((transaction) => (
              <li 
                key={transaction.id} 
                className={`transaction-item ${transaction.amount < 0 ? "negative" : "positive"}`}
              >
                <span className="transaction-description">{transaction.description}</span>
                <span>{transaction.amount}€</span>
                <button className="delete" onClick={() => handleDelete(transaction.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
  
      <h3>➕ Ajouter une transaction</h3>
      <form onSubmit={handleSubmit}>
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
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
  
  
};

export default TransactionsList;
