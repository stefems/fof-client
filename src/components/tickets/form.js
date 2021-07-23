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
			!formData.cardName || formData.cardName === '' ||
			formData.hasCar == null || formData.carpool == null ||
			formData.dietaryRestrictions == null) {
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
					setProcessing(false)
					$cardButton.current.disabled = false;
					return
				}
				console.log(formData)
				const paymentResults = await createPayment(token, formData, ticketCount);
				console.log(paymentResults)
				done();
			} catch (e) {
				window.location.href = '/errors';
				console.log(e)
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
		const payments = window.Square.payments(env.ENV === 'prod' ? env.SQUARE_ID_PROD : env.SQUARE_ID, env.ENV === 'prod' ? env.SQUARE_LOCATON_ID_PROD : env.SQUARE_LOCATON_ID);
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

	const setRadio = (key, value) => {
		if (formData[key] === value) {
			setFormData({ ...formData, [key]: null})
		} else {
			setFormData({ ...formData, [key]: value})
		}
	}
	
	return (
		<div className='Form'>
			{processing && <div className={'Form-processing'}>
				processing
				<div className='Form-processing-container' />
			</div>}
			<div className='Form-info'>
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
				<div className='Form-radio Form-top'>
					<span className='Form-radioLabel'>
						do you have a car?
					</span>
					<div className='Form-radioContainer'>
						<input id="carYes" type="radio" name="car" value="yes" />
						<label
							className={`Form-radioClick ${formData.hasCar ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('hasCar', true)} for="carYes">
								YES
							</label>
						<input id="carNo" type="radio" name="car" value="no" />
						<span className='Form-radioDivider'>/</span>
						<label
							className={`Form-radioClick ${formData.hasCar === false ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('hasCar', false)} for="carNo"
						>
							NO
						</label>
					</div>
				</div>
				<div className='Form-radio'>
					<span className='Form-radioLabel'>
						if yes:
					</span>
					<div className='Form-radioContainer'>
						<input id="2wd" type="radio" name="wheelDrive" value="2wd" />
						<label
							className={`Form-radioClick ${formData.wheelDrive === '2wd' ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('wheelDrive', '2wd')} for="2wd"
						>
							2wd
						</label>
						<span className='Form-radioDivider'>/</span>
						<input id="4wd" type="radio" name="wheelDrive" value="4wd" />
						<label
							className={`Form-radioClick ${formData.wheelDrive === '4wd' ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('wheelDrive', '4wd')} for="4wd"
						>
							4wd
						</label>
					</div>
				</div>
				<br></br>
				<div className='Form-radio'>
					<span className='Form-radioLabel'>
						are you interested in carpooling?
					</span>
					<div className='Form-radioContainer'>
						<input id="carpoolYes" type="radio" name="carpool" value={true} />
						<label
							className={`Form-radioClick ${formData.carpool ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('carpool', true)} for="carpoolYes"
						>
							YES
						</label>
						<input id="carpoolNo" type="radio" name="carpool" value={false} />
						<span className='Form-radioDivider'>/</span>
						<label
							className={`Form-radioClick ${formData.carpool === false ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('carpool', false)} for="carpoolNo"
						>
							NO
						</label>
					</div>
					<div className='Form-radioContainer Form-carpool'>
						<input id="carpooler" type="radio" name="carpoolAs" value="carpooler" />
						<label
							className={`Form-radioClick ${formData.carpoolAs === 'carpooler' ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('carpoolAs', 'carpooler')} for="carpooler"
						>
								carpooler
							</label>
						<input id="carpoolie" type="radio" name="carpoolAs" value="carpoolie" />
						<span className='Form-radioDivider'>/</span>
						<label
							className={`Form-radioClick ${formData.carpoolAs === 'carpoolie' ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('carpoolAs', 'carpoolie')} for="carpoolie"
						>
							carpoolie
						</label>
						<span className='Form-radioDivider'>/</span>
						<input id="either" type="radio" name="carpoolAs" value="either" />
						<label
							className={`Form-radioClick ${formData.carpoolAs === 'either' ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('carpoolAs', 'either')} for="either"
						>
							either
						</label>
					</div>
				</div>
				<div className='Form-radio Form-beforeTextArea'>
					<span className='Form-radioLabel'>
						do you have any dietary restrictions or allergies?
					</span>
					<div className='Form-radioContainer'>
						<input id="dietaryRestrictionsYes" type="radio" name="dietaryRestrictions" value={true} />
						<label
							className={`Form-radioClick ${formData.dietaryRestrictions ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('dietaryRestrictions', true)} for="dietaryRestrictionsYes"
						>
							YES
						</label>
						<span className='Form-radioDivider'>/</span>
						<input id="dietaryRestrictionsNo" type="radio" name="dietaryRestrictions" value={false} />
						<label
							className={`Form-radioClick ${formData.dietaryRestrictions === false ? 'Form-radioActive' : ''}`}
							onClick={() => setRadio('dietaryRestrictions', false)} for="dietaryRestrictionsNo"
						>
							NO
						</label>
					</div>
				</div>
				<textarea className='Form-textArea' name='dietDetails' onChange={handleChange} />
			</div>
			<div className='Form-money'>
				<div className='Form-circle'>
					{ticketCount}
					<span className='Form-ticket'>TICKET{ticketCount === 2 && 'S'}</span>
				</div>
				<div className='Form-subtotal'>
					<i>In the event of inclimate weather the festival's date will be changed.</i>
				</div>
				<div className='Form-subtotal'>
					SUBTOTAL: ${ticketCount * 260}
				</div>
				<div className='Form-subtotal'>
					TAX: ${ticketCount === 1 ? '10.40' : '20.80'}
				</div>
				<div className='Form-subtotal'>
					processing fee: ${ticketCount * 5}
				</div>
				<br />
				<div className='Form-subtotal'>
					TOTAL: ${(ticketCount * 10.40 + ticketCount * 260 + ticketCount * 5).toFixed(2)}
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
					<div style={{ opacity: processing ? 0 : 1}} className='Form-square' id="card-container"></div>
					<div className='Form-buttons'>
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
					</div>
				</form>
			</div>
		</div>
	)
}

export default Form