const { products } = require("../models/productModel");
const { randomUUID } = require("node:crypto");

const getProducts = (req, res) => {
  res.json(products);
};

const addProduct = (req, res) => {
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
};

const deleteProduct = (req, res) => {
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
};

module.exports = {
  deleteProduct,
  getProducts,
  addProduct,
};
