import env from "react-dotenv"

const createPayment = async (token) => {
	const body = JSON.stringify({
		locationId: env.SQUARE_LOCATION_ID,
		sourceId: token,
	});
	let url = 'https://fof-festival-api.herokuapp.com/api/square/purchase'
	if (window.location.href.indexOf('localhost') !== -1) {
		url = 'http://localhost:9000/api/square/purchase'
	}
	const paymentResponse = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
	if (paymentResponse.ok) {
		//create person
		//edit parent
		return paymentResponse.json();
	}
	const errorBody = await paymentResponse.text();
	throw new Error(errorBody);
}

export default createPayment