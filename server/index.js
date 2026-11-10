const express = require("express");

const app = express();

const products = [
  { id: 1, name: "Samsung Charger", price: 19.99, quantity: 15 },
  { id: 2, name: "Logitech Mouse", price: 29.99, quantity: 8 },
];

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Stockpilot API running",
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
