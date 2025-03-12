import express from "express";
import { addTransaction, getTransactions, resetTransactions } from "../controllers/transactionController";

const router = express.Router();

// 🔹 Route pour récupérer toutes les transactions
router.get("/transactions", getTransactions);

// 🔹 Route pour ajouter une transaction
router.post("/transactions", (req, res) => {
  addTransaction(req, res).catch((err) => {
    console.error("Erreur lors de l'ajout d'une transaction:", err);
    res.status(500).json({ error: "Erreur serveur" });
  });
});

// 🔹 Route pour supprimer toutes les transactions
router.delete("/transactions", resetTransactions);

export default router;
