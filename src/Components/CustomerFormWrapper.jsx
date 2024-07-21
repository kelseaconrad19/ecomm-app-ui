import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";

function CustomerFormWrapper({ onUpdateCustomerList }) {
	let params = useParams();
	let navigate = useNavigate();

	return (
		<CustomerForm
			params={params}
			navigate={navigate}
			onUpdateCustomerList={onUpdateCustomerList}
		/>
	);
}

export default CustomerFormWrapper;
