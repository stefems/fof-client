import { Popups } from '../components'

import './about.css'

const About = () => {

	return (
		<div className='About'>
			<Popups />
			<div className='About-grid'>
				<div className='About-row About-topLeft'>
					<span>Friends</span>
					<span>of</span>
					<span>Friends</span>
				</div>
				<div className='About-row About-festival'>
					<span>Festival</span>
				</div>
				<div className='About-row About-is'>
					<span>is a</span>
				</div>
				<div className='About-row About-celebration'>
					<span>celebration</span>
				</div>
				<div className='About-row About-community'>
					<span>of</span>
				</div>
				<div className='About-row About-celebration'>
					<span>summer's end</span>
				</div>
				<div className='About-row About-how'>
					<span>&amp;</span>
				</div>
				<div className='About-row About-know'>
					<span>deep</span>
				</div>
				<div className='About-row About-love'>
					<span className='About-'>friendship love</span>
				</div>
			</div>
		</div>
	)
}

export default About