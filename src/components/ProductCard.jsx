const ProductCard = ({ name, price, quantity }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
      <span>{quantity > 0 ? "In stock" : "Out of stock"}</span>
      <p>Available quantity</p>
      <span>{quantity}</span>
    </div>
  );
};

export default ProductCard;
