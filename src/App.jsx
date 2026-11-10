import { useState } from "react";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}

      <AddProduct onAddProduct={addProduct} />
    </div>
  );
};

export default App;
