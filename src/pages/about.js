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
				<div className='About-row About-celebration'>
					<span>is a celebration</span>
				</div>
				<div className='About-row About-community'>
					<span>of summer's end</span>
				</div>
				<div className='About-row About-how'>
					<span>&amp;</span>
				</div>
				<div className='About-row About-know'>
					<span>deep friendship</span>
				</div>
				<div className='About-row About-celebration'>
					<span className='About-'>&amp; love</span>
				</div>
			</div>
		</div>
	)
}

export default About