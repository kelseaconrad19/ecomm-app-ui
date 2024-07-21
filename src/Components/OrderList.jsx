import { func, number } from "prop-types";
import { useState, useEffect } from "react";

const OrderList = ({ customerID, onOrderSelect }) => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (customerID) {
			const fetchedOrders = [
				{ id: 101, date: "2021-01-01" },
				{ id: 102, date: "2022-02-02" },
				{ id: 103, date: "2023-03-03" },
			];
			setOrders(fetchedOrders);
		}
	}, [customerID]);

	return (
		<div className="order-list">
			<h3>Orders</h3>
			<ul>
				{orders.map((order) => (
					<li key={order.id} onClick={() => onOrderSelect(order.id)}>
						Order ID: {order.date}, Date: {order.date}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrderList;
