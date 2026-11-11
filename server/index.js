const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();

const products = [
  { id: 1, name: "Samsung Charger", price: 19.99, quantity: 15 },
  { id: 2, name: "Logitech Mouse", price: 29.99, quantity: 8 },
];

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Stockpilot API running",
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  // 1. Extract data from the request
  const { name, price, quantity } = req.body;

  // 2. Validate product data
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    return res.status(400).json({
      message: "Invalid product data",
    });
  }

  // 3. Create a new product
  const newProduct = {
    id: randomUUID(),
    name: name.trim(),
    price,
    quantity,
  };

  // 4. Store
  products.push(newProduct);

  // 5. Send the response
  return res.status(200).json(newProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(
    (product) => String(product.id) == id,
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.splice(productIndex, 1);

  return res.status(200).send();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
