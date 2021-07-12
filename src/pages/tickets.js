import { useEffect, useState } from "react"
import { canPurchase } from '../requests'

import { AmountSelection, Form } from '../components'

import './tickets.css'
import { Link } from "react-router-dom"

const Tickets = () => {

	const [loading, setLoading] = useState(true)
	const [allowPurchase, setAllowPurchase] = useState(null)
	const [ticketCount, setTicketCount] = useState(1)
	const [step, setStep] = useState(1)

	useEffect(async () => {
		await check();
		setTimeout(() => {
			setLoading(	)
		}, 1000)
	}, [])

	const check = async () => {
		const result = await canPurchase(localStorage.getItem('fof-code'))
		setAllowPurchase(result.status)
	}

	return (
		<div className={`Tickets-${loading || !allowPurchase ? 'loading' : 'loaded'}`}>
			{loading &&
				<div className='Tickets-loadingText'>
					loading
					<div className='Tickets-loadingText-container' />
				</div>
			}
			{!loading && allowPurchase && (
				<>
					{step === 1 && <AmountSelection
						ticketCount={ticketCount}
						setTicketCount={setTicketCount}
						confirm={() => setStep(2)}
					/>}
					{step === 2 &&
						<Form
							ticketCount={ticketCount}
							back={() => setStep(1)}
							done={() => setStep(3)}
							setInvalidToken={() => setAllowPurchase(false)}
						/>
					}
					{step === 3 &&
						<div className={'Tickets-doneContainer'}>
							<div className={'Tickets-done'}>
								<div className={'Tickets-in'}>You're in</div>
								<div>:&nbsp;)</div>
							</div>
							<div className={'Tickets-email'}>
								{`Congratulations! We’re so excited to see you. In the next week you will receive a confirmation email with further details and a unique code to share with one friend who you’d like to have join you. Let the mycelial friendship network grow...`}
								<Link to='/about' className={'Tickets-linkHome'}>
									back home
								</Link>
							</div>
						</div>
					}
				</>
			)}
			{!loading && allowPurchase === false && (
				<div className='Tickets-loadingText Tickets-max'>
					The tickets available for this passcode have already been purchased :(
					<a href="/about" className={'Tickets-link'}>
						return home
					</a>
				</div>
			)}
		</div>
	)
}

export default Tickets

