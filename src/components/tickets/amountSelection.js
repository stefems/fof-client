import './amountSelection.css'

const AmountSelection = ({ ticketCount, setTicketCount, confirm }) => {

	return (
		<div className='AmountSelection'>
			<h1 className='AmountSelection-heading'>
				general admission: $260
			</h1>
			<div className='AmountSelection-paragraph'>
				ticket includes:<br />3 dinners and 2 lunches<br />by chef Tara Norvell
			</div>
			<div className='AmountSelection-paragraph'>
				A tent site, communal utilities, and access to all music and programming.
			</div>
			<div className='AmountSelection-paragraph AmountSelection-secondary'>
				max 2 tickets per person
			</div>
			<div className='AmountSelection-circle'>
				<div className='AmountSelection-button'>
					<button className='AmountSelection-buttonClear' onClick={() => setTicketCount(2)}>
						<span className='AmountSelection-triangleUp' />
					</button>
					<span className='AmountSelection-count'>{ticketCount}</span>
					<button className='AmountSelection-buttonClear' onClick={() => setTicketCount(1)}>
						<span className='AmountSelection-triangleDown' />
					</button>
				</div>
				<div className='AmountSelection-ticket'>
					TICKET{ticketCount === 2 && 'S'}
				</div>
			</div>
			<button className='AmountSelection-buttonClear AmountSelection-confirm' onClick={confirm}>
				CONFIRM
			</button>
		</div>
	)
}

export default AmountSelection