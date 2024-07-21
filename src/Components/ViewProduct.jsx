import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProduct = () => {
	const [product, setProduct] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:5000/products/${id}`
				);
				setProduct(response.data);
			} catch (error) {
				console.error("Error fetching product", error);
			}
		};

		fetchProduct();
	}, [id]);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{product.name}</h2>
			<p>Price: ${product.price}</p>
			<button className="go-back" onClick={() => navigate(-1)}>
				Go Back
			</button>
		</div>
	);
};

export default ViewProduct;
