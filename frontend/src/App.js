import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductListing from './ProductListing';
import ShoppingCart from './ShoppingCart';
import Header from './Header';
import Login from './login';
import RegistrationForm from './RegistrationForm';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiUrl = 'https://fakestoreapi.com/products';
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (filterCategory) => {
    const filtered = products.filter((product) =>
      product.category === filterCategory
    );
    setFilteredProducts(filterCategory ? filtered : products);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    
  };

  return (
    <Router>
      <div className="App">
        <Header
          onSearch={handleSearch}
          onFilter={handleFilter}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={<ProductListing products={filteredProducts} onAddToCart={handleAddToCart} />}
            />
            <Route path="/cart" element={<ShoppingCart cart={cart} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
