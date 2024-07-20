import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to create and import the CSS file

const Header = ({ onSearch, onFilter, isLoggedIn, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <header className="App-header">
      <h1>K & P</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSearch(searchTerm);
            } else if (event.key === " " && event.currentTarget.selectionStart === 0) {
              event.preventDefault();
            }
          }}
        />
        <select value={filterCategory} onChange={handleFilterChange} placeholder="Filter by category">
          <option value="" disabled selected="selected" hidden>Filter by category</option>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <nav>
        <ul className="nav-links">
          {isLoggedIn ? (
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
