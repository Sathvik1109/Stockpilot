import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

  const addProduct = async (newProduct) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }

    const savedProduct = await res.json();

    setProducts((prev) => [...prev, savedProduct]);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      await getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          price: updatedProduct.price,
          quantity: updatedProduct.quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the product");
      }

      await getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <AddProduct onAddProduct={addProduct} />

      {loading ? (
        <p>Loading Products....</p>
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            onDeleteProduct={deleteProduct}
            onEditProduct={updateProduct}
          />
        ))
      )}
    </div>
  );
};

export default App;
