import { useState } from "react"
import { Link } from "react-router-dom";
import { HomeLogo } from '../components'
import './home.css'

const Home = ({ authenticated }) => {

	const [code, setCode] = useState()

	const handleChange = (e) => {
		setCode(e.target.value)
	}

	const changeCode = () => {
		localStorage.setItem('fof-code', code);
		window.location.reload()
	}

	return (
		<div className='Home'>
			{!authenticated && <div className='Home-unauth'>
				<h1 className='Home-title'>FOF</h1>
				<form className='Home-form' onSubmit={changeCode}>
					<span>secret password:</span>
					<input className='Home-input' type="text" value={code} onChange={handleChange} />
				</form>
			</div>}
			{authenticated && <div>
				<HomeLogo />
				<Link to="/tickets" className='Home-ticketLink'>
					get tickets
				</Link>
			</div>}
		</div>
	)
}

export default Home

