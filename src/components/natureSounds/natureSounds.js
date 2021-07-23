import { useEffect, useRef, useState } from 'react'
import Tree from '../../tree.png'
import Sound from '../../sound.png'
import Sounds from '../../natureSounds.wav'

import './natureSounds.css'


const NatureSounds = () => {
	const [playing, setPlaying] = useState(false)
	const [player, setPlayer] = useState()

	useEffect(() => {
		setPlayer(document.getElementById('player'))
	}, []);

	useEffect(() => {
		if (player && playing) {
			player.play()
		} else if (player && !playing) {
			player.pause()
		}
	}, [playing])

	return (
		<div onClick={() => setPlaying(!playing)} className='NatureSounds'>
			<audio id='player' loop src={Sounds} type="audio/wav" style={{display: 'none'}}/>
			<img src={Tree} className='NatureSounds-tree'/>
			<img src={Sound} className={`NatureSounds-sound ${!playing ? 'NatureSounds-notPlaying' : 'NatureSounds-playing'}`}/>
			<span>Listen to Nature</span>
		</div>
	)
}

export default NatureSounds