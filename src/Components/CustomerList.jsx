import React, {
	forwardRef,
	useImperativeHandle,
	useState,
	useEffect,
} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Container, ListGroup } from "react-bootstrap";
import ViewCustomer from "./ViewCustomer";

const CustomerList = forwardRef((props, ref) => {
	const [customers, setCustomers] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useImperativeHandle(ref, () => ({
		fetchCustomers: () => {
			axios
				.get("http://127.0.0.1:5000/customers")
				.then((response) => {
					setCustomers(response.data);
				})
				.catch((error) => {
					console.error("Error fetching data", error);
					setError("Error fetching data");
				});
		},
	}));

	useEffect(() => {
		axios
			.get("http://127.0.0.1:5000/customers")
			.then((response) => {
				setCustomers(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data", error);
				setError("Error fetching data");
			});
	}, []);

	const deleteCustomer = (customerId) => {
		axios
			.delete(`http://127.0.0.1:5000/customers/${customerId}`)
			.then(() => {
				setCustomers((prevCustomers) =>
					prevCustomers.filter((customer) => customer.id !== customerId)
				);
			})
			.catch((error) => {
				console.error("Error deleting customer", error);
				setError("Error deleting customer");
			});
	};

	return (
		<Container>
			{error && <Alert variant="danger">{error}</Alert>}
			<h3 className="mt-3 mb-3 text-center">Customers</h3>
			<ListGroup>
				{customers.map((customer) => (
					<ListGroup.Item
						key={customer.id}
						className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
					>
						<Link to={`/edit-customer/${customer.id}`} className="text-primary">
							{customer.name}
						</Link>
						<div>
							<Button
								variant="secondary"
								onClick={() => navigate(`/view-customer/${customer.id}`)}
								className="me-2"
							>
								View
							</Button>
							<Button
								variant="primary"
								onClick={() => navigate(`/edit-customer/${customer.id}`)}
								className="me-2"
							>
								Edit
							</Button>
							<Button
								variant="danger"
								onClick={() => deleteCustomer(customer.id)}
							>
								Delete
							</Button>
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
});

export default CustomerList;
