import ProductCard from "./components/ProductCard";

const products = [
  { id: 1, name: "Samsung Charger", price: 19.99, quantity: 15 },
  { id: 2, name: "Logitech Mouse", price: 29.99, quantity: 0 },
  { id: 3, name: "Dell Keyboard", price: 49.99, quantity: 8 },
];

const App = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
    </div>
  );
};

export default App;
