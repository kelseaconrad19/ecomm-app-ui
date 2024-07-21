import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import CustomerList from "./Components/CustomerList";
import ProductForm from "./Components/ProductForm";
import ProductList from "./Components/ProductList";
import NavigationBar from "./Components/NavigationBar";
import CustomerFormWrapper from "./Components/CustomerFormWrapper";
import HomePage from "./Components/HomePage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewProduct from "./Components/ViewProduct";
import ViewCustomer from "./Components/ViewCustomer";

const App = () => {
	const customerListRef = useRef();

	const handleUpdateCustomerList = () => {
		if (customerListRef.current) {
			customerListRef.current.fetchCustomers();
		}
	};

	return (
		<div className="app-container">
			<NavigationBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/edit-customer/:id"
					element={
						<CustomerFormWrapper
							onUpdateCustomerList={handleUpdateCustomerList}
						/>
					}
				/>
				<Route
					path="/add-customer"
					element={
						<CustomerFormWrapper
							onUpdateCustomerList={handleUpdateCustomerList}
						/>
					}
				/>
				<Route
					path="/customers"
					element={<CustomerList ref={customerListRef} />}
				/>
				<Route path="/view-customer/:id" element={<ViewCustomer />} />
				<Route path="/add-product" element={<ProductForm />} />
				<Route path="/edit-product/:id" element={<ProductForm />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/view-product/:id" element={<ViewProduct />} />
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>
		</div>
	);
};

export default App;
