import { Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

function HomePage() {
	return (
		<div className="hero">
			<h1>Welcome to My E-Commerce App!</h1>
			<p className="fs-5 mt-4">
				This is where you can add and manage customers and products for your
				business.
			</p>
			<div className="action-buttons-div">
				<Button
					href="/customers"
					className="me-2 action-buttons action-button-one"
				>
					Customers
				</Button>
				<Button href="/products" className="action-buttons action-button-two">
					Products
				</Button>
			</div>
		</div>
	);
}

export default HomePage;
