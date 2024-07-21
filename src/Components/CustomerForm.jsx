import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const CustomerForm = ({ onUpdateCustomerList }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState({});
	const [selectedCustomerId, setSelectedCustomerId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (id) {
			fetchCustomerData(id);
		}
	}, [id]);

	const fetchCustomerData = (id) => {
		axios
			.get(`http://127.0.0.1:5000/customers/${id}`)
			.then((response) => {
				const customerData = response.data;
				setName(customerData.name);
				setEmail(customerData.email);
				setPhone(customerData.phone);
				setSelectedCustomerId(id);
			})
			.catch((error) => {
				console.error("Error fetching customer data:", error);
			});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "name") setName(value);
		else if (name === "email") setEmail(value);
		else if (name === "phone") setPhone(value);
	};

	const validateForm = () => {
		const errors = {};
		if (!name) errors.name = "Name is required";
		if (!email) errors.email = "Email is required";
		if (!phone) errors.phone = "Phone is required";
		return errors;
	};

	const closeModal = () => {
		setShowSuccessModal(false);
		setName("");
		setEmail("");
		setPhone("");
		setSelectedCustomerId(null);
		navigate("/customers");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = validateForm();
		if (Object.keys(errors).length === 0) {
			const customerData = {
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
			};

			const apiUrl = selectedCustomerId
				? `http://127.0.0.1:5000/customers/${selectedCustomerId}`
				: "http://127.0.0.1:5000/customers";

			const httpMethod = selectedCustomerId ? axios.put : axios.post;

			setIsLoading(true);

			httpMethod(apiUrl, customerData)
				.then((response) => {
					console.log("Customer created successfully", response.data);
					onUpdateCustomerList();
					setName("");
					setEmail("");
					setPhone("");
					setErrors({});
					setSelectedCustomerId(null);
					setIsLoading(false);
					setShowSuccessModal(true);
				})
				.catch((error) => {
					console.error("Error submitting customer data:", error);
					setError("Error submitting customer data: " + error.message);
					setIsLoading(false);
				});
		} else {
			setErrors(errors);
		}
	};

	return (
		<Container>
			{isLoading && <Alert variant="info">Submitting customer data...</Alert>}
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formGroupName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
					{errors.name && <Alert variant="danger">{errors.name}</Alert>}
				</Form.Group>

				<Form.Group controlId="formGroupEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						name="email"
						value={email}
						onChange={handleChange}
					/>
					{errors.email && <Alert variant="danger">{errors.email}</Alert>}
				</Form.Group>

				<Form.Group controlId="formGroupPhone">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						type="tel"
						name="phone"
						value={phone}
						onChange={handleChange}
					/>
					{errors.phone && <Alert variant="danger">{errors.phone}</Alert>}
				</Form.Group>

				<Button variant="primary" type="submit" className="mt-3 ms-2">
					Submit
				</Button>
			</Form>

			<Modal show={showSuccessModal} onHide={closeModal}>
				<Modal.Header>
					<Modal.Title>Success</Modal.Title>
				</Modal.Header>
				<Modal.Body>Customer data submitted successfully!</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={closeModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default CustomerForm;
