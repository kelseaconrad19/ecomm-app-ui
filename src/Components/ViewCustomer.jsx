import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewCustomer = () => {
	const [customer, setCustomer] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCustomer = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:5000/customers/${id}`
				);
				setCustomer(response.data);
			} catch (error) {
				console.error("Error fetching customer", error);
			}
		};

		fetchCustomer();
	}, [id]);

	if (!customer) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{customer.name}</h2>
			<p>Email: {customer.email}</p>
			<p>Phone: {customer.phone}</p>
			<button className="go-back" onClick={() => navigate(-1)}>
				Go Back
			</button>
		</div>
	);
};

export default ViewCustomer;
