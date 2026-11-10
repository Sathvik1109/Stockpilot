import { useState } from "react";

const EditProduct = ({ onEditProduct, product, editToggle }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (price.trim() === "" || !Number.isFinite(+price) || +price < 0) {
      newErrors.price = "Enter a valid non negative price";
    }

    if (
      quantity.trim() === "" ||
      !Number.isInteger(+quantity) ||
      +quantity < 0
    ) {
      newErrors.quantity = "Enter a valid non-negative whole number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newProduct = {
      id: product.id,
      name,
      price: +price,
      quantity: +quantity,
    };

    onEditProduct(newProduct);

    setName("");
    setPrice("");
    setQuantity("");

    editToggle((prev) => !prev);
  };

  return (
    <div>
      <h2>Edit Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            id="quantity"
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors && <p style={{ color: "red" }}>{errors.quantity}</p>}
        </div>
        <button
          type="submit"
          style={{
            width: "80px",
          }}
        >
          Submit
        </button>
        <button onClick={() => editToggle((prev) => !prev)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
