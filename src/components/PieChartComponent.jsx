import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4567", "#19FFA1", "#FF19E0"];

const PieChartComponent = ({ transactions }) => {
  // Filtrer uniquement les dépenses (montants négatifs)
  const expenseTransactions = transactions.filter(transaction => transaction.amount < 0);

  // Regrouper les dépenses par catégorie
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount); // Valeur absolue
    return acc;
  }, {});

  // Transformer les données pour recharts
  const data = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category], // Montants positifs pour affichage
    color: COLORS[index % COLORS.length] // Associe une couleur unique à chaque catégorie
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie 
        data={data} 
        cx="50%" 
        cy="50%" 
        labelLine={false}
        outerRadius={150} 
        fill="#8884d8" 
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
