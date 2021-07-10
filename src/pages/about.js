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
					<span>of community</span>
				</div>
				<div className='About-row About-how'>
					<span>&amp; how</span>
				</div>
				<div className='About-row About-know'>
					<span>we are</span>
					<span>interconnected,</span>
				</div>
				<div className='About-row About-community'>
					<span className='About-'>in ways</span>
				</div>
				<div className='About-row About-know'>
					<span className='About-'>we</span>
					<span className='About-'>don't</span>
					<span className='About-'>even</span>
					<span className='About-'>know.</span>
				</div>
			</div>
		</div>
	)
}

export default About