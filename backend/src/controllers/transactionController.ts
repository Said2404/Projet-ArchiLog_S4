import { Request, Response } from "express";
import db from "../config/db";

// 🔹 Récupérer toutes les transactions
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM transactions ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des transactions :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// 🔹 Ajouter une transaction
// 🔹 Ajouter une transaction
export const addTransaction = async (req: Request, res: Response) => {
  const { amount, category, type, description } = req.body;

  // Conversion explicite en nombre
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || !category || !type) {
    console.error("❌ Données invalides :", req.body);
    return res.status(400).json({ error: "Veuillez remplir tous les champs avec des valeurs valides." });
  }

  try {
    await db.query(
      "INSERT INTO transactions (amount, category, type, description, date) VALUES (?, ?, ?, ?, NOW())",
      [numericAmount, category, type, description || ""]
    );
    console.log("✅ Transaction ajoutée :", { numericAmount, category, type, description });
    res.status(201).json({ message: "Transaction ajoutée avec succès" });
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout de la transaction :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// 🔹 Supprimer toutes les transactions
export const resetTransactions = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM transactions");
    res.json({ message: "Toutes les transactions ont été supprimées" });
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err);
    res.status(500).json({ error: "Erreur lors de la suppression des transactions" });
  }
};
