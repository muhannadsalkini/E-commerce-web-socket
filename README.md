# **E-commerce-web-socket**

This project is a backend API built with **Node.js**, **Express**, and **MongoDB** for an e-commerce platform. The API provides functionality for user management, product and variant handling, orders, and live updates, with authentication and role-based access control.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Variants](#variants)
  - [Orders](#orders)
- [TODO List](#todo-list)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

---

## **Project Overview**

This backend API handles operations such as user authentication, product management, and order processing. It is designed to be scalable and secure, with features like JWT-based authentication and Express-validator for input validation.

## **Features**

- User Authentication (Login, Signup)
- Role-based Access Control (Admin, Customer, etc.)
- CRUD operations for Products and Variants
- Order management and live order updates via WebSockets
- Shopping basket and wishlist functionalities
- Integration with payment gateways
- API pagination, sorting, and filtering
- Input validation using **express-validator**
- Error handling middleware
- JWT authentication with token refresh support

---

## **Tech Stack**

- **Node.js**: Server-side runtime
- **Express**: Web framework for building REST APIs
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB ODM (Object Data Modeling)
- **jsonwebtoken**: JWT-based authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation middleware
- **Socket.IO**: Real-time communication for live order updates

---

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/username/E-commerce-web-socket
   ```

2. **Navigate into the project directory**:

   ```bash
   cd E-commerce-web-socket
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

---

## **Environment Variables**

Make sure to configure your environment variables. Create a `.env` file in the root of the project with the following variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/E-commerce-web-socket
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

Additional environment variables for third-party services (e.g., payment gateways) can also be configured here.

---

## **Running the Application**

1. **Development mode**:

   ```bash
   npm run dev
   ```

   This will run the server using `nodemon` for auto-reloading on file changes.

2. **Production mode**:

   ```bash
   npm start
   ```

---

## **API Endpoints**

### **Authentication**

- **POST /api/auth/signup**  
  Create a new user account.

- **POST /api/auth/login**  
  Authenticate a user and return a JWT token.

- **GET /api/auth/me**  
  Get the current logged-in user information.

---

### **Products**

- **GET /api/products**  
  Get all products with support for pagination, sorting, and filtering by category or brand.

- **POST /api/products**  
  Create a new product (Admin only).

- **PUT /api/products/:id**  
  Update a product by ID.

- **DELETE /api/products/:id**  
  Delete a product by ID.

---

### **Variants**

- **POST /api/variants**  
  Create a new product variant.

- **PUT /api/variants/:id**  
  Update an existing variant.

- **DELETE /api/variants/:id**  
  Delete a variant by ID.

---

### **Orders**

- **POST /api/orders**  
  Create a new order.

- **GET /api/orders/:id**  
  Get order details by ID.

---

## **TODO List**

Here are the planned features and improvements:

```plaintext
// TODO: Add an error handle middleware
// TODO: Add the ports functionality for the live orders
// TODO: Add roles to the user
// TODO: Add user basket functionality
// TODO: Add integration for payment gateways (izyco or param iframe)
// TODO: Add email verification and password reset functionality
// TODO: Add user activity logs (login attempts, actions, etc.)
// TODO: Add sorting and filtering for products and orders
// TODO: Add address management for users (shipping addresses)
// TODO: Add review and rating system for products
// TODO: Add wishlist functionality for users
// TODO: Implement file upload validation (image size, file type checks)
```

---

## **Error Handling**

The application includes an error handling middleware that catches any uncaught errors in the API and sends a consistent JSON response.

Example error response:

```json
{
  "message": "An error occurred",
  "error": "Error details here"
}
```

To customize error handling, you can modify the `errorHandler` middleware.

---

## **Contributing**

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.

We welcome contributions of any kind, including bug fixes, new features, or documentation improvements.

---

Let me know if you need further details for any section!
