import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes";
import db from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Routes API
app.use("/api", transactionRoutes);

// 🔹 Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
