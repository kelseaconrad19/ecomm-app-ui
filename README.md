# E-Commerce Application UI

This is a React-based frontend for an E-Commerce application. The application allows users to manage customers and products, including functionalities to add, edit, and delete entries. This project utilizes React Router for navigation, Axios for HTTP requests, and React Bootstrap for styling.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Components](#components)
- [API Endpoints](#api-endpoints)


## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Python (for the backend API)
- MySQL (or your preferred database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kelseaconrad19/ecomm-app-ui.git
    cd ecomm-app-ui
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Database Setup

To set up the database for this project, follow these steps:

1. Clone the backend repository:

    ```bash
    git clone https://github.com/kelseaconrad19/M6ECommerceAPI
    cd ecomm-app-backend
    ```

2. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Create the database schema:

    ```sql
    CREATE DATABASE ecomm_app;
    ```

4. Import the database schema and seed data:

    ```bash
    mysql -u username -p ecomm_app < schema.sql
    mysql -u username -p ecomm_app < seed_data.sql
    ```

5. Configure the backend application to connect to your database by setting the appropriate environment variables or configuration files.

6. Start the backend server:

    ```bash
    flask run
    ```

For detailed information on setting up and running the backend, refer to the [backend repository](https://github.com/yourusername/ecomm-app-backend).

### Detailed Application Overview

#### Application Structure
The application is structured around four main components: Customers, Customer Accounts, Products, and Orders. It uses Flask as the server framework, SQLAlchemy as the Object-Relational Mapping (ORM) layer for database interactions, and Marshmallow for data serialization and validation.

#### Data Models
- **Customer**: Represents the customers of the e-commerce platform. Each customer has attributes such as `name`, `email`, and `phone`.
- **Product**: Represents the items available for purchase. Each product has attributes such as `name`, `price`, and `stock`.
- **Order**: Represents a purchase order placed by a customer. It includes a date, a list of products, and a status which tracks the progress of the order (e.g., pending, processing, shipped).
- **CustomerAccount**: Manages authentication-related details for customers, including usernames and passwords.

#### Database Relationships
- **Customers to Orders**: One-to-many relationship. A single customer can place multiple orders but each order is associated with one customer.
- **Products to Orders**: Many-to-many relationship. Each order can contain multiple products and each product can be part of multiple orders. This relationship is managed through a join table called `OrderProducts`.

#### API Endpoints
The application exposes various RESTful endpoints for managing customers, products, orders, and customer accounts:

- **Customer Endpoints**: These allow for creating, retrieving, updating, and deleting customer information.
- **Product Endpoints**: These manage the product catalog of the store, including adding new products, updating existing products, and managing inventory levels.
- **Order Endpoints**: These endpoints handle everything related to order processing, such as placing new orders, updating order status, and viewing order history.

#### Features
- **Order Placement**: Customers can place orders by specifying product IDs. The system checks product availability and creates an order entry linked to the customer.
- **Stock Management**: Products have a stock level which is updated as orders are placed. Additional endpoints allow for stock adjustments and automated restocking when levels are low.
- **User Authentication**: While the current version does not implement authentication, the structure for customer accounts exists, allowing future implementation of login mechanisms.

#### Marshmallow Schemas
- **Validation and Serialization**: Marshmallow schemas are used to validate incoming data and to serialize database records into JSON. They ensure that data adheres to expected formats and that sensitive data is not inadvertently exposed.
- **Error Handling**: Marshmallow also provides robust error handling during data loading.

#### Flask Extensions
- **Flask-Migrate**: Used for handling database migrations, allowing for changes to the database schema without losing data.
- **Flask-SQLAlchemy**: Integrates SQLAlchemy with Flask, simplifying database management tasks such as creating sessions and queries.
- **Flask-Marshmallow**: Integrates Marshmallow with Flask, enabling easy serialization of query results and automatic handling of ORM objects.

## Usage

- Navigate to `/customers` to view the list of customers.
- Navigate to `/add-customer` to add a new customer.
- Navigate to `/edit-customer/:id` to edit an existing customer.
- Navigate to `/products` to view the list of products.
- Navigate to `/add-product` to add a new product.
- Navigate to `/edit-product/:id` to edit an existing product.

  ## Components

### CustomerForm

A form for adding and editing customer information. Utilizes React Router's `useParams` and `useNavigate` hooks for handling routing and navigation.

### CustomerList

Displays a list of customers with options to edit or delete each customer. Fetches customer data from the backend API using Axios.

### ProductForm

A form for adding and editing product information. Similar in structure to `CustomerForm`.

### ProductList

Displays a list of products with options to edit or delete each product. Fetches product data from the backend API using Axios.

### NavigationBar

A navigation bar for easy access to different parts of the application.

### HomePage

A simple homepage for the application.

## API Endpoints

The application interacts with the following backend API endpoints:

- `GET /customers`: Fetches the list of customers.
- `GET /customers/:id`: Fetches a specific customer by ID.
- `POST /customers`: Adds a new customer.
- `PUT /customers/:id`: Updates an existing customer by ID.
- `DELETE /customers/:id`: Deletes a customer by ID.
- `GET /products`: Fetches the list of products.
- `GET /products/:id`: Fetches a specific product by ID.
- `POST /products`: Adds a new product.
- `PUT /products/:id`: Updates an existing product by ID.
- `DELETE /products/:id`: Deletes a product by ID.
