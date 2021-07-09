import env from "react-dotenv"

const createPayment = async (token, person) => {
	const body = JSON.stringify({
		locationId: env.ENV === 'prod' ? env.SQUARE_LOCATION_ID_PROD : env.SQUARE_LOCATION_ID,
		sourceId: token,
		code: localStorage.getItem('fof-code'),
		person: person
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
		body
	});
	if (paymentResponse.ok) {
		// ^^ handles the whole thing!
		// //send request to send email
		return paymentResponse.json();
	}
	const errorBody = await paymentResponse.text();
	throw new Error(errorBody);
}

export default createPayment