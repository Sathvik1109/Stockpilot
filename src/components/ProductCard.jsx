import { useState } from "react";
import EditProduct from "./EditProduct";

const ProductCard = ({
  id,
  name,
  price,
  quantity,
  onDeleteProduct,
  onEditProduct,
}) => {
  const [editToggle, setEditToggle] = useState(false);

  return (
    <div>
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
        <span>{quantity > 0 ? "In stock" : "Out of stock"}</span>
        <p>Available quantity</p>
        <span>{quantity}</span>
        <button onClick={() => onDeleteProduct(id)}>Delete</button>
        <button onClick={() => setEditToggle((prev) => !prev)}>Edit</button>
      </div>

      {editToggle && (
        <EditProduct
          onEditProduct={onEditProduct}
          product={{ id, name, price, quantity }}
          editToggle={setEditToggle}
        />
      )}
    </div>
  );
};

export default ProductCard;
