import { useEffect, useState } from "react"

import { canPurchase } from '../requests'

import { AmountSelection, Form } from '../components'

import './tickets.css'

const Tickets = () => {

	const [loading, setLoading] = useState(true)
	const [allowPurchase, setAllowPurchase] = useState(null)
	const [ticketCount, setTicketCount] = useState(1)
	const [step, setStep] = useState(1)

	useEffect(async () => {
		await check();
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	const check = async () => {
		const result = await canPurchase(localStorage.getItem('fof-code'), 1)
		setAllowPurchase(result)
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
						/>
					}
					{step === 3 &&
						<div className={'Tickets-doneContainer'}>
							<div className={'Tickets-done'}>
								<div className={'Tickets-in'}>You're in</div>
								<div>:&nbsp;)</div>
							</div>
							<div className={'Tickets-email'}>
								{`we’ll send an email with confirmation, guest codes & newsletter updates leading up to FOF!`}
							</div>
						</div>
					}
				</>
			)}
			{!loading && allowPurchase === false && (
				<div className='Tickets-loadingText max'>
					The tickets available for this passcode have already been purchased :(
				</div>
			)}
		</div>
	)
}

export default Tickets

