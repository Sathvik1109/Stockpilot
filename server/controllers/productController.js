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

const updateProduct = (req, res) => {
  // 1. Get product ID from url
  const { id } = req.params;

  // 2. Get updated data from request body
  const { name, price, quantity } = req.body ?? {};

  // 3. Find exisiting product
  const productIndex = products.findIndex(
    (product) => String(product.id) === id,
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // 4. Validate incoming data
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    price < 0 ||
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    return res.status(400).json({
      message: "Invalid product data",
    });
  }

  // 5. Update the product
  const updateProduct = {
    id: products[productIndex].id,
    name: name.trim(),
    price,
    quantity,
  };

  products[productIndex] = updateProduct;

  // 6. Return updated product
  return res.status(200).json(updateProduct);
};

module.exports = {
  deleteProduct,
  getProducts,
  addProduct,
  updateProduct,
};
