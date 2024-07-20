import React from 'react';
import jsPDF from 'jspdf';
import './ShoppingCart.css'; // Ensure this CSS file is created and styled as needed

function ShoppingCart({ cart }) {
  const delcharge = 20;
  const taxRate = 0.1; // 10% tax rate, you can adjust this value

  const getTotal = (cart) => {
    let total = 0;
    cart.forEach((product) => {
      if (product.price >= 0 && product.quantity >= 0) {
        total += product.price * product.quantity + delcharge;
      } else {
        console.error('Invalid price or quantity:', product);
      }
    });
    return total.toFixed(2);
  };

  const calculateTax = (amount) => {
    return (amount * taxRate).toFixed(2);
  };

  const combineProducts = () => {
    const combinedCart = {};
    cart.forEach((product) => {
      if (combinedCart[product.id]) {
        combinedCart[product.id].quantity += 1;
      } else {
        combinedCart[product.id] = {
          ...product,
          quantity: 1,
        };
      }
    });
    return Object.values(combinedCart);
  };

  const combinedCart = combineProducts();

  const totalBeforeTax = parseFloat(getTotal(combinedCart));
  const tax = parseFloat(calculateTax(totalBeforeTax));
  const totalAfterTax = (totalBeforeTax + tax).toFixed(2);



  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.setFillColor(33, 150, 243); // Blue header
    doc.rect(0, 0, 210, 30, 'F'); // Full width header
  
    // Store title
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255); // White text color
    doc.text('React Shop', 105, 20, null, null, 'center');
  
    // Billing Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text('BILL TO:', 20, 50);
    doc.text('Company Name', 20, 55);
    doc.text('Address', 20, 60);
    doc.text('City', 20, 65);
    doc.text('Country', 20, 70);
    doc.text('Postal', 20, 75);
  
    // Invoice Information
    doc.text('INVOICE #', 150, 50);
    doc.text('000001', 150, 55);
    doc.text('DATE', 150, 60);
    doc.text('12/31/20', 150, 65);
    doc.text('INVOICE DUE DATE', 150, 70);
    doc.text('12/31/20', 150, 75);
  
    // Table Headers
    doc.setFontSize(12);
    doc.setFillColor(33, 150, 243); // Blue background for headers
    doc.setTextColor(255, 255, 255); // White text color for headers
    doc.rect(20, 90, 180, 10, 'F');
    doc.text('ITEMS', 25, 97);
   
    doc.text('QUANTITY', 100, 97);
    doc.text('PRICE', 125, 97);
    doc.text('TAX', 150, 97);
    doc.text('AMOUNT', 175, 97, { width: 100 }); // Adjust the width as needed

  
    // Table Content
    doc.setTextColor(0, 0, 0); // Black text color for table content
    let startY = 105; // Initial Y-coordinate for the first row of table content
const cellWidths = [30, 40, 20, 25]; // Adjust widths as needed for each column

combinedCart.forEach((product) => {
    // Calculate the height of product title text
    const textDimensions = doc.getTextDimensions(product.title);
    const textHeight = textDimensions.h + 5; // Add padding and a bit more for safety
    const cellHeight = Math.max(20, textHeight + 10); // Minimum 20 units to accommodate two lines

    // Render each column of table content for the current product
    const amount = (product.price * product.quantity).toFixed(2);
    doc.text(product.title, 25, startY, { maxWidth:75, lineHeightFactor: 1.2 }); // Adjust maxWidth to prevent overlapping
    
    doc.text(product.quantity.toString(), 100, startY, { maxWidth: cellWidths[2] });
    doc.text(`$${product.price.toFixed(2)}`, 125, startY, { maxWidth: cellWidths[3] });
    doc.text('0%', 150, startY); // Assuming tax is 0%
    doc.text(`$${amount}`, 175, startY, { maxWidth: 25 }); // Adjust maxWidth for amount

    startY += cellHeight + 5; // Adjust Y-coordinate for next row
});

    const offset = startY + 20;

    // Total Section
    doc.setFontSize(14);
    doc.text(`Delivery Charge: $${delcharge.toFixed(2)}`, 20, offset);
    doc.text(`Total before tax: $${totalBeforeTax.toFixed(2)}`, 20, offset + 10);
    doc.text(`Tax: $${tax.toFixed(2)}`, 20, offset + 20);
    doc.text(`Total after tax: $${totalAfterTax}`, 20, offset + 30);
  
    // Footer Notes
    doc.setFontSize(12);
    doc.text('NOTES:', 20, offset + 50);
    doc.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 20, offset + 55);
    doc.text('Praesent ut nisi tempus massa blandit luctus.', 20, offset + 60);
  
    // Total Amount
    doc.setFontSize(16);
    doc.text(`TOTAL: $${totalAfterTax}`, 140, offset + 50); // Shifted slightly left
  
   doc.save('bill.pdf');
  };
  

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {combinedCart.length === 0 ? (
        <p>The cart is empty.</p>
      ) : (
        <div>
          {combinedCart.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="quantity">Quantity: {product.quantity}</p>
              </div>
              <div className="product-price">
                ${product.price.toFixed(2)}
              </div>
            </div>
          ))}
          <div className="total-section">
            <h3>Delivery Charge: ${delcharge.toFixed(2)}</h3>
            <h3>Total before tax: ${totalBeforeTax.toFixed(2)}</h3>
            <h3>Tax: ${tax.toFixed(2)}</h3>
            <h3>Total after tax: ${totalAfterTax}</h3>
          </div>
          <button onClick={generatePDF}>Download Invoice</button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
