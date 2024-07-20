import React from 'react';
import './ProductListing.css';


function ProductListing({  products, onAddToCart}) {
  

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} />
          <div className="product-details">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
