const express = require("express");
const {
  deleteProduct,
  getProducts,
  addProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.patch(":/id", updateProduct);

module.exports = router;
