import { useState } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
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

    if (quantity.trim() === "" || !Number.isInteger(+price) || +quantity < 0) {
      newErrors.quantity = "Enter a valid non-negative whole number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price: +price,
      quantity: +quantity,
    };

    onAddProduct(newProduct);

    setName("");
    setPrice("");
    setQuantity("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
      </form>
    </div>
  );
};

export default AddProduct;
