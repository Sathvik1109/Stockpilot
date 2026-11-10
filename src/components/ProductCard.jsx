const ProductCard = ({ id, name, price, quantity, onDeleteProduct }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
      <span>{quantity > 0 ? "In stock" : "Out of stock"}</span>
      <p>Available quantity</p>
      <span>{quantity}</span>
      <button onClick={() => onDeleteProduct(id)}>delete</button>
    </div>
  );
};

export default ProductCard;
