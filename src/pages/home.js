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
				<h1 className='Home-title'>
					FoF
				</h1>
				<div className='Home-formContainer'>
					<form className='Home-form' onSubmit={changeCode}>
						<span>secret password:</span>
						<input className='Home-input' type="text" value={code} onChange={handleChange} />
					</form>
				</div>
			</div>}
			{authenticated && <div>
				<HomeLogo />
				<Link to="/tickets" className='Home-link'>
					get tickets
				</Link>
				<Link to="/about" className='Home-link'>
					about fof
				</Link>
			</div>}
		</div>
	)
}

export default Home

