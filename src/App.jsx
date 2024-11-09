import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";
import Login from "./Login";
import ProductDetail from "./ProductDetail";
import Register from "./Register"; // Import Register component
// import "./style.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add Register route */}
        <Route path="/products" element={<Products test={products} loading={loading} />} />
        <Route path="/products/:id" element={<ProductDetail product={products} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;