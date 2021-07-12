import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Link } from "react-router-dom";
import img from '../../music.png'
import { ReactComponent as ReactLogo } from '../../joinButton.svg'

import './popups.css'

const titles = ['FoF', 'where who what', 'music', 'featured friends', 'what to expect', 'tickets']
const talks = [
	{
		title: 'Enlightenment Wines',
		description: ''
	},
	{
		title: 'Tara Norvell',
		description: ''
	},
	{
		title: 'Yesfolk Kombucha ',
		description: ''
	},
	{
		title: 'Star Route Farm',
		description: ''
	},
	{
		title: 'Brooklyn Public Farm',
		description: ''
	},
	{
		title: 'Smallhold',
		description: ''
	},
	{
		title: 'Your Other Left Ear',
		description: ''
	},
	{
		title: 'and more...',
		description: ''
	}
]
const expectations = [
	{
		title: '',
		description: 'This is bare-bones camping. Large canvas shading tents, grassy dance floor, mazes mowed into the tall grass, and composting toilets. Outdoor very simple not fancy composting toilets.'
	},
	{
		title: '',
		description: 'Lunch and dinner will be prepared daily by chef Tara Norvell over the communal fire. '
	},
	{
		title: 'A general store tent with:',
		list: [
			'the basics, local farm veg, local eggs, dairy, and cured sausages - their farmers in  attendance.',
			`A selection of chilled natural wine, meads, and local beers. Kombucha and troy NY seltzer water.`,
			'Handmade snacks',
			'Your Other Left Ear curated bath, beauty, and vintage goods',
			'As well as camping necessities such as headlamps, batteries, personal hygiene items, and natural sunscreen and bug spray.'
		]
	},
	{
		title: 'Slip Away Cafe',
		description: 'A 3-day-only hilltop breakfast diner. Sweet treats and belly-filling plates served up daily with a smile.'
	},
	{
		title: '',
		description: 'Sunsets, live music, sensory games, audio tours, all-night dancing, and more...'
	},
	{
		title: 'Sample Menu',
		description: ''
	},
	{
		title: 'Lunch',
		description: 'Mixed Summer Tomato Gazpacho with Grilled Sourdough Toasts (Anchovy Aioli or Forrest Salsa Verde) and Chaga Chocolate Pudding Cups'
	},
	{
		title: '',
		description: 'Cold Tulsi Lemongrass Tea'
	},
	{
		title: 'Dinner',
		description: 'Grilled Smallhold Oyster and Lionsmane Mushrooms with Beans and Grilled Greens, Wilsons Sourdough Croutons and Seedy Chili Oil'
	},
	{
		title: '',
		description: 'Cold Cinnamon Kava Tea'
	},
	{
		title: 'Sample Schedule:',
		list: [
			'Slip Away Breakfast Cafe is Open',
			'Sun Salute',
			'Send Off',
			'Morning Workshop',
			'Loose Time: Swimming , Hiking, Foraging, Resting',
			'Tara Norvell Lunch',
			'Afternoon Workshop',
			'Sunset Live Music',
			'Tara Norvell Dinner',
			'Dance Floor Opens',
			'Ambient Programming in the Den'
		]
	},
	{
		title: 'Packing List:',
		list: [
			'A tent, weatherproof',
			'Warm clothes',
			'Cold clothes',
			'Swimsuit',
			'A plate',
			'A mug',
			'Utensils',
			'Good shoes'
		]
	}
]

const Popups = () => {

	// const titles = ['FoF', 'where who what', 'music', 'featured friends', 'what to expect', 'tickets']

	const [activeDrags, setActiveDrags] = useState(false)
	const [showIntro, setShowIntro] = useState(false)
	const [showInfo, setShowInfo] = useState(false)
	const [showMusic, setShowMusic] = useState(false)
	const [showTalks, setShowTalks] = useState(false)
	const [showExpect, setShowExpect] = useState(false)
	const [showJoin, setShowJoin] = useState(false)
	const dragStates = [showIntro, showInfo, showMusic, showTalks, showExpect, showJoin]
	const drags = [setShowIntro, setShowInfo, setShowMusic, setShowTalks, setShowExpect, setShowJoin]

	useEffect(async () => {
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
							is a three-day outdoor celebration of interconnectedness and new movements. 100 connected individuals camping side-by-side in the Catskills.
						</div>
						<div className='Popups-purple'>
							Simply bringing together like-minded people who don't know each other yet, but should. 
						</div>
					</>
				)
			case 1:
				return (
					<>
						<div className='Popups-purple'>
							September 3rd-6th<br />
							The Sweep 4275 County Road 6 Bovina Center, NY
						</div>
						<div className='Popups-purple'>
							4 Days 3 Nights
						</div>
						<div className='Popups-purple'>
							Fire Cooked Food, Dancing, Swimming. Natural Wines, Workshops, Movement, Exchange, Flower Picking
						</div>
					</>
				)
			case 2:
				return (
					<img className='Popups-image' src={img} alt='' />
				)
			case 3:
				return (
					<div className='Popups-talks'>
						{talks.map((talk) => (
							<React.Fragment key={talk.title}>
								<div className='Popups-talkTitle'>
									{talk.title}
								</div>
								{talk.description && <div className='Popups-talkDescription'>
									{talk.description}
								</div>}
								{talk.list && <ul className='Popups-bullets'>
									{talk.list.map((item) => <li>{item}</li>)}
								</ul>}
							</React.Fragment>
						))}
					</div>
				)
			case 4:
				return (
					<div className='Popups-talks'>
						{expectations.map((talk) => (
							<React.Fragment key={talk.title}>
								<div className='Popups-talkTitle'>
									{talk.title}
								</div>
								{talk.description && <div className='Popups-talkDescription'>
									{talk.description}
								</div>}
								{talk.list && <ul className='Popups-bullets'>
									{talk.list.map((item) => <li>{item}</li>)}
								</ul>}
							</React.Fragment>
						))}
					</div>
				)
			case 5:
				return (
					<div className='Popups-joinContainer'>
						<Link to={'/tickets'} className='Popups-join'> 
							JOIN<br/>US
							<ReactLogo className='Popups-joinButtonIcon' />
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