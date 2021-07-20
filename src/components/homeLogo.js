import { Link } from "react-router-dom";
import './homeLogo.css'

const HomeLogo = () => {
	return (
		<div className='HomeLogo'>
			<Link to="/" className='HomeLogo-home'>
				FoF
			</Link>
			<Link to="/tickets" className='HomeLogo-link'>
				tickets
			</Link>
			<Link to="/about" className='HomeLogo-link'>
				about
			</Link>
		</div>
		
	)
}

export default HomeLogo