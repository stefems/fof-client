import './amountSelection.css'

const AmountSelection = ({ ticketCount, setTicketCount, confirm }) => {

	return (
		<div className='AmountSelection'>
			<h1 className='AmountSelection-heading'>
				General Admission: $250
			</h1>
			<div className='AmountSelection-paragraph'>
				includes 3 chef lunch x dinners,
				campsite, access to all workshops, 
				music,2 vouchers to the general store. 
			</div>
			<div className='AmountSelection-paragraph'>
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