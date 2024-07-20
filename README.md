## Shopify
Shopify is an e-commerce platform built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a seamless shopping experience for users, allowing them to browse products, add items to their cart, and complete purchases with ease. The platform also includes features for user authentication, product management, and order tracking.

## Features 🎯

-User Authentication: Secure registration and login process for users.

-Product Listing: Users can browse and search for products by category.

-Shopping Cart: Users can add products to their cart and proceed to checkout.

-Order Management: Users can view their order history and track their orders.

-Admin Dashboard: Admins can manage products, categories, and orders.

## Technologies 💻

## Frontend:

ReactJS: Utilized for building the frontend to ensure efficient UI rendering, interactivity, and responsiveness.

CSS: Custom styling using CSS to tailor the design and layout of the application.

## Backend:
Node.js: Powers the backend, handling server-side logic and API integrations effectively.

Express: Facilitates routing and middleware management, enabling seamless communication between the frontend and backend.

MongoDB: Stores data related to users, products, orders.

## Home Page

![](https://github.com/Khushi-patel1221/Shopify/blob/main/images/home.jpeg)
## Registration Page
![](https://github.com/Khushi-patel1221/Shopify/blob/main/images/registration.jpeg)
## Login Page
![](https://github.com/Khushi-patel1221/Shopify/blob/main/images/login.jpeg)
## Shopping Cart Page
![](https://github.com/Khushi-patel1221/Shopify/blob/main/images/cart.jpeg)


## Installation🚀
## Backend
1. Clone the repository:
```sh
git clone https://github.com/Khushi-patel1221/Shopify.git
cd VoteCast
```

2. Navigate to the backend directory:
```sh
cd backend
```
4. Install dependencies:
```sh
npm install
```

6. Update MongoDB configuration:

   Open backend/src/.env and modify the following :

```javascript
 mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority&appName=<appname>
```
 Replace the following placeholders in your configuration files:

- <username>: Your MongoDB username                                                                        
- <password>: Your MongoDB password                                                                 
- <cluster>: The MongoDB cluster URL                                                                  
- <database>: The MongoDB database name                                                              
- <appname>: Optional. The name of your application                                                         

5. Start the backend server:
```sh
 npm start
```

## Frontend
1. Navigate to the frontend directory:
```sh
 cd frontend
```

3. Install dependencies:
```sh
 npm install
```

3.Start the frontend development server:
```sh
 npm start
```

4.Open your browser and navigate to  http://localhost:3000 to view the application.
