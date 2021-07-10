import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Link } from "react-router-dom";

import img from '../../music.png'
import joinButton from '../../joinButton.svg'

import './popups.css'

const titles = ['where, what, when???', 'music', 'workshops & talks', 'tickets']
const talks = [
	{
		title: 'YESFOLK KOMBUCHA',
		description: 'Lorem ipsum dolor sit amet,sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
	},
	{
		title: 'CARA MARIE PIAZZA',
		description: 'Lorem ipsum dolor sit amet,sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
	},
	{
		title: 'MARY MA',
		description: 'Lorem ipsum dolor sit amet,sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
	},
	{
		title: 'DANIEL GRAUR',
		description: 'Lorem ipsum dolor sit amet,sectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
	}
]

const Popups = () => {

	const [activeDrags, setActiveDrags] = useState(false)
	const [showInfo, setShowInfo] = useState(false)
	const [showMusic, setShowMusic] = useState(false)
	const [showTalks, setShowTalks] = useState(false)
	const [showJoin, setShowJoin] = useState(false)
	const dragStates = [showInfo, showMusic, showTalks, showJoin]
	const drags = [setShowInfo, setShowMusic, setShowTalks, setShowJoin]

	useEffect(() => {
		for (let i = 0; i < drags.length; i++){
			const drag = drags[i]
			setTimeout(() => {
				drag(true)
			}, 4000*(i+1))
		}
	}, [])

	const onStart = () => {
		setActiveDrags(activeDrags + 1);
	};
	
	const onStop = () => {
		setActiveDrags(activeDrags - 1);
	}

	const minimize = (index) => {
		drags[index](false)
		setTimeout(() => {
			drags[index](true)
		}, 4000)
	}

	const renderBox = (index) => {
		switch (index) {
			case 0:
				return (
					<>
						<div className='Popups-purple'>
							THE SWEEP <br/>BOVINA CENTER, NY
						</div>
						<div className='Popups-purple'>
							4 DAY CAMPING
						</div>
						<div className='Popups-purple'>
							SEPTEMBER 4-6
						</div>
					</>
				)
			case 1:
				return (
					<img className='Popups-image' src={img} alt='' />
				)
			case 2:
				return (
					<div className='Popups-talks'>
						{talks.map((talk) => (
							<React.Fragment key={talk.title}>
								<div className='Popups-talkTitle'>
									{talk.title}
								</div>
								<div className='Popups-talkDescription'>
									{talk.description}
								</div>
							</React.Fragment>
						))}
					</div>
				)
			case 3:
				return (
					<div className='Popups-joinContainer'>
						<Link to={'/tickets'} className='Popups-join'> 
							JOIN<br/>US
							<img src={joinButton} className='Popups-joinButtonIcon' />
						</Link>
						<div className='Popups-smile'>
							;-)
						</div>
					</div>
				)
		}
	}

	const dragHandlers = { onStart: onStart, onStop: onStop };

	return (
		<div className="Popups">
			{dragStates.map((drag, index) => (
				<Draggable
					key={titles[index]}
					handle="strong" {...dragHandlers}>
					<div
						style={{ visibility: drag ? 'visible' : 'hidden'}}
						className={`Popups-box Popups-no-cursor Popups-box${index}`}
					>
						<strong className="Popups-cursor">
							<span className="Popups-title">{titles[index]}</span>
							<span onClick={() => minimize(index)} className="Popups-cursor Popups-close">X</span>
						</strong>
						<div className="Popups-content">
							{renderBox(index)}
						</div>
					</div>
				</Draggable>
			))}
		</div>
	)
}

export default Popups