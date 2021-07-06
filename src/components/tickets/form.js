import env from "react-dotenv"
import { useEffect, useRef, useState } from "react"
import { createPayment } from '../../requests'

import './form.css'

const customeStyle = {
	input: {
		color: '#2300FA',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	'.input-container': {
		borderColor: '#2300FA',
	},
	'input::placeholder': {
		color: '#2300FA',
	},
}

const initializeCard = async (payments) => {
	const card = await payments.card({
		style: customeStyle
	});
	await card.attach('#card-container'); 
	return card; 
}

const tokenize = async (paymentMethod) => {
	const tokenResult = await paymentMethod.tokenize();
	if (tokenResult.status === 'OK') {
		return tokenResult.token;
	} else {
		let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
		if (tokenResult.errors) {
			errorMessage += ` and errors: ${JSON.stringify(
				tokenResult.errors
			)}`;
		}
		throw new Error(errorMessage);
	}
}

const Form = ({ back, ticketCount, done }) => {

	const $cardButton = useRef()
	const [formData, setFormData] = useState({})

	const handlePaymentMethodSubmission = async (event, paymentMethod) => {
		event.preventDefault();
	
		try {
			// disable the submit button as we await tokenization and make a
			// payment request.
			$cardButton.current.disabled = true;
			const token = await tokenize(paymentMethod);
			const paymentResults = await createPayment(token);
			done();
		} catch (e) {
			$cardButton.current.disabled = false;
			console.error(e.message);
		}
	}

	useEffect(async () => {
		if (!window.Square) {
			throw new Error('Square.js failed to load properly');
		}
		const payments = window.Square.payments(env.SQUARE_ID, env.SQUARE_LOCATON_ID);
		let card;
		try {
			card = await initializeCard(payments);
		} catch (e) {
			console.error('Initializing Card failed', e);
			return;
		}

		$cardButton.current.addEventListener('click', async function (event) {
			await handlePaymentMethodSubmission(event, card);
		});
	}, [])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value})
	}

	return (
		<div className='Form'>
			<div className='Form-left'>
				<div className='Form-circle'>
					{ticketCount}
					<span className='Form-ticket'>TICKET{ticketCount === 2 && 'S'}</span>
				</div>
				<div className='Form-subtotal'>
					SUBTOTAL: ${ticketCount * 250}
				</div>
				<div className='Form-tax'>
					TAX: ${ticketCount * 10}
				</div>
				<div className='Form-total'>
					TOTAL: ${ticketCount * 10 + ticketCount * 250}
				</div>
			</div>
			<div className='Form-right'>
				<div className='Form-data'>
					<span className='Form-input-label'>
						FIRST NAME:
					</span>
					<input name={'firstName'} className='Form-input' type="text" value={formData.firstName || ''} onChange={handleChange}/>
				</div>
				<div className='Form-data'>
					<span className='Form-input-label'>
						LAST NAME:
					</span>
					<input name={'lastName'} className='Form-input' type="text" value={formData.lastName || ''} onChange={handleChange}/>
				</div>
				<div className='Form-data'>
					<span className='Form-input-label'>
						PHONE NUMBER:
					</span>
					<input name={'phone'} className='Form-input' type="text" value={formData.phone || ''} onChange={handleChange}/>
				</div>
				<div className='Form-data'>
					<span className='Form-input-label'>
						EMAIL:
					</span>
					<input name={'email'} className='Form-input' type="text" value={formData.email || ''} onChange={handleChange}/>
				</div>
				<div className='Form-data Form-card'>
					<span className='Form-input-label'>
						NAME ON CARD:
					</span>
					<input name={'cardName'} className='Form-input' type="text" value={formData.cardName || ''} onChange={handleChange}/>
				</div>
				<form id="payment-form">
					<div className='Form-square' id="card-container"></div>
					<button onClick={back} className='Form-back Form-buttonClear' >
						BACK
					</button>
					<button className='Form-submit Form-buttonClear' ref={$cardButton} type="button">
						PURCHASE
					</button>
				</form>
			</div>
		</div>
	)
}

export default Form