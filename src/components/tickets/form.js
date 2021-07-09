import env from "react-dotenv"
import { useEffect, useRef, useState } from "react"
import { createPayment, canPurchase } from '../../requests'

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

const Form = ({ back, ticketCount, done, setInvalidToken }) => {

	const $cardButton = useRef()
	const [formData, setFormData] = useState({})
	const [showError, setShowError] = useState(false)
	const [showValidationError, setShowValidationError] = useState(false)
	const [card, setCard] = useState()
	const [processing, setProcessing] = useState(false)


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
			$cardButton.current.disabled = false;
		}
	}

	const validateData = () => {
		setShowValidationError(false)
		if (!formData.firstName || formData.firstName === '' ||
			!formData.lastName || formData.lastName === '' ||
			!formData.email || formData.email === '' ||
			!formData.phone || formData.phone === '' ||
			!formData.cardName || formData.cardName === '') {
			setTimeout(() => setShowValidationError(true), 700)
			return false
		}
		return true
	}

	const handlePaymentMethodSubmission = async (event, paymentMethod) => {
		event.preventDefault();
		$cardButton.current.disabled = true;
		if (validateData()) {
			try {
				setProcessing(true)
				const token = await tokenize(paymentMethod);
				if (!token) {
					return
				}
				const paymentResults = await createPayment(token, formData);
				done();
			} catch (e) {
				// todo lots of possible errors here
				//setInvalidToken()
				console.error(e.message);
			}
		} else {
			setProcessing(false)
			setTimeout(() => {
				$cardButton.current.disabled = false
			}, 800)
		}
	}

	useEffect(async () => {
		$cardButton.current.disabled = true;

		if (!window.Square) {
			setShowError(true)
			return
			// throw new Error('Square.js failed to load properly');
		}
		const payments = window.Square.payments(env.ENV === 'prod' ? env.SQUARE_ID_PROD : env.SQUARE_ID, env.SQUARE_LOCATON_ID);
		try {
			let card = await initializeCard(payments);
			setCard(card);
		} catch (e) {
			setShowError(true)
			console.error('Initializing Card failed', e);
			return;
		}
		$cardButton.current.disabled = false
	}, [])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value})
	}

	useEffect(() => {
		if (showError) {
			$cardButton.current.disabled = true
		}
	}, [showError])
	
	return (
		<div className='Form'>
			{processing && <div className={'Form-processing'}>
				processing
				<div className='Form-processing-container' />
			</div>}
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
				{showError && <div className='Form-error'>
					we've had a problem with our payment system :( Please try again later!
				</div>}
				<div className={`Form-error ${showValidationError ? 'Form-validationShown' : 'Form-validation'}`}>
					we need your information! please fill out all the inputs above
				</div>
				<form id="payment-form">
					<div className='Form-square' id="card-container"></div>
					<button onClick={back} className='Form-back Form-buttonClear' >
						BACK
					</button>
					<button
						onClick={(event) => handlePaymentMethodSubmission(event, card)}
						className='Form-submit Form-buttonClear'
						ref={$cardButton} 
						type="button"
					>
						PURCHASE
					</button>
				</form>
			</div>
		</div>
	)
}

export default Form