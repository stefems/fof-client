import React, { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'
import { Link } from "react-router-dom";
import music from '../../music.png'
import img1 from '../../img1.png'
import img2 from '../../img2.png'
import img3 from '../../img3.png'
import img4 from '../../img4.png'
import { ReactComponent as ReactLogo } from '../../joinButton.svg'


import './popups.css'

const talks = [
	{
		title: 'Enlightenment Wines',
		link: 'https://enlightenmentwines.com/'
	},
	{
		title: 'Tara Norvell',
		link: 'https://www.instagram.com/tara.norvell/?hl=en'
	},
	{
		title: 'Yesfolk Kombucha ',
		link: 'https://www.yesfolktonics.com/'
	},
	{
		title: 'Star Route Farm',
		link: 'http://www.starroutefarmny.com/'
	},
	{
		title: 'Brooklyn Public Farm',
		link: 'https://brooklynpublicfarm.org/'
	},
	{
		title: 'Smallhold',
		link: 'https://www.smallhold.com/'
	},
	{
		title: 'Your Other Left Ear',
		link: 'https://yourotherleftear.com/'
	}
]

const renderIntro = () => {
	return (
		<div className='Popups-container Popups-caps'>
			<div className='Popups-normal'>
				<span className='Popups-g'>F</span><span className='Popups-p'>O</span><span className='Popups-b'>F</span>
				is a three-day outdoor celebration of interconnectedness and new movements.
			</div>
			<div className='Popups-normal'>
				100 connected individuals camping side by side in the Catskills.
			</div>
			<div className='Popups-normal'>
				Simply bringing together like-minded people who don't know each other yet, but should. 
			</div>
		</div>
	)
}

const renderInfo = () => {
	return (
		<div className='Popups-container'>
			<div className='Popups-normal Popups-caps'>
				September 3rd-6th<br />
			</div>
			<div className='Popups-normal Popups-caps'>
				The Sweep<br />4275 County Road 6<br />Bovina Center, NY
			</div>
			<div className='Popups-normal Popups-caps'>
				4 Days 3 Nights
			</div>
			<div className='Popups-rainbow Popups-caps'>
				<span>Fire Cooked Food</span>
				<span>Dancing</span>
				<span>Swimming</span>
				<span>Natural Wine</span>
				<span>Workshops</span>
				<span>Movement</span>
				<span>Exchange</span>
				<span>Flower Picking</span>
			</div>
		</div>
	)
}

const renderFeatured = () => {
	return (
		<div className='Popups-talks'>
			{talks.map((talk) => (
				<a href={talk.link} key={talk.title} className='Popups-talkTitle'>
					{talk.title}
				</a>
			))}
			<div className='Popups-talkTitle'>
				and more...
			</div>
		</div>
	)
}

const renderCampsite = () => {
	return (
		<div className='Popups-container Popups-green'>
			<div>This is bare-bones camping</div>
			<div>Large canvas shading tents, grassy dance floor, mazes mowed into the tall grass, and composting toilets.</div>
			<div>Outdoor very simple not fancy composting toilets.</div>
		</div>
	)
}

const renderMeals = () => {
	return (
		<div className='Popups-container Popups-caps'>
			<div className='Popups-orange'>
				Lunch and dinner daily
			</div>
			<div className='Popups-orange'>
				provided by chef Tara Norvell over the communal fire.
			</div>
			<br />
			<div className='Popups-green'>
				sample menu:
			</div>
			<div className='Popups-green'>
				lunch
			</div>
			<div className='Popups-green'>
				Mixed Summer Tomato Gazpacho with Grilled Sourdough Toasts (Anchovy Aioli or Forrest Salsa Verde) and Chaga Chocolate Pudding Cups
			</div>
			<div className='Popups-green'>
				Cold Tulsi Lemongrass Tea
			</div>
			<br />
			<div className='Popups-green'>
				dinner
			</div>
			<div className='Popups-green'>
				Grilled Smallhold Oyster and Lionsmane Mushrooms with Beans and Grilled Greens, Wilsons Sourdough Croutons and Seedy Chili Oil
			</div>
			<div className='Popups-green'>
				Cold Cinnamon Kava Tea
			</div>
			<br />
			<div>
				slipaway cafe
			</div>
			<div>
				A 3 day only hilltop breakfast diner. Sweet treats and belly-filling plates served up daily with a smile.
			</div>
		</div>
	)
}

const renderStore = () => {
	return (
		<div className='Popups-container Popups-caps'>
			<div>thE BASICS.</div>
			<div>LOCAL FARM VEG, EGGS, DAIRY, AND CURED SAUSAGES - WITH THEIR FARMERS IN ATTENDANCE.</div>
			<div>A SELECTION OF CHILLED NATURAL WINE, MEADS, AND LOCAL BEERS</div>
			<div>KOMBUCHA AND TROY NY SELTZER WATER, HANDMADE SNACKS, YOUR OTHER LEFT EAR CURATED GOODS.</div>
			<div>CAMPING NECESSITIES SUCH AS HEADLAMPS, BATTERIES, HYGIENE ITEMS, AND NATURAL SUNSCREEN + BUGSPRAY.</div>
		</div>
	)
}

const renderSchedule = () => {
	return (
		<div className='Popups-container Popups-caps Popups-blue'>
			<div>Slip Away Breakfast Cafe is Open</div>
			<div>Sun Salute</div>
			<div>Send Off</div>
			<div>Morning Workshop</div>
			<div>Loose Time: Swimming , Hiking, Foraging, Resting</div>
			<div>Tara Norvell Lunch</div>
			<div>Afternoon Workshop</div>
			<div>Sunset Live Music</div>
			<div>Tara Norvell Dinner</div>
			<div>Dance Floor Opens</div>
			<div>Ambient Programming in the Den</div>
		</div>
	)
}

const renderPacking = () => {
	return (
		<div className='Popups-container Popups-caps Popups-red'>
			<div>A tent, weatherproof</div>
			<div>Warm clothes</div>
			<div>Cold clothes</div>
			<div>Swimsuit</div>
			<div>A plate, mug, &amp; Utensils</div>
			<div>Good shoes</div>
		</div>
	)
}

const renderJoin = () => {
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

const popupsInitialData = {
	intro: { shown: false, title: 'FoF', render: renderIntro },
	info: { shown: false, title: 'who? what? where?', render: renderInfo },
	img1: { shown: false, title: '', image: img1 },
	img2: { shown: false, title: '', image: img2 },
	img3: { shown: false, title: '', image: img3 },
	img4: { shown: false, title: '', image: img4 },
	music: { shown: false, title: 'music', image: music },
	featured: { shown: false, title: 'featured friends', render: renderFeatured },
	campsite: { shown: false, title: 'campsite', render: renderCampsite },
	meals: { shown: false, title: 'meals', render: renderMeals },
	store: { shown: false, title: 'general store', render: renderStore },
	schedule: { shown: false, title: 'sample schedule', render: renderSchedule },
	packing: { shown: false, title: 'packing list', render: renderPacking },
	join: { shown: false, title: 'tickets', render: renderJoin }
}

const Popups = () => {

	const [activeDrags, setActiveDrags] = useState(false)
	const [topIndex, setTopIndex] = useState(0)
	const [popupData, setPopupData] = useState(popupsInitialData)
	const popupDataRef = useRef(popupData)
	popupDataRef.current = popupData

	useEffect(async () => {
		Object.entries(popupData).forEach( ([key, value], index) => {
			setTimeout(() => {
					setPopupData({...popupDataRef.current, [key]: {
						...popupDataRef.current[key],
						shown: true
					}})
			}, 4000*(index+1))
		})
	}, [])

	const onStart = () => {
		setActiveDrags(activeDrags + 1);
	};
	
	const onStop = () => {
		setActiveDrags(activeDrags - 1);
	}

	const minimize = (e, key) => {
		setPopupData({...popupData, [key]: {
			...popupData[key],
			shown: false
		}})
		setTimeout(() => {
			setPopupData({...popupDataRef.current, [key]: {
				...popupDataRef.current[key],
				shown: true
			}})
		}, 4000)
		e.stopPropagation()
	}

	const focusBox = (key) => {
		const zIndex = topIndex + 1
		setPopupData({...popupData, [key]: {
			...popupData[key],
			zIndex: zIndex
		}})
		setTopIndex(zIndex)
	}

	const dragHandlers = { onStart: onStart, onStop: onStop };

	return (
		<div className="Popups">
			{Object.entries(popupData).map( ([key, value], index) => (
				<Draggable
					key={value.title + '_'+ index}
					handle="strong" {...dragHandlers}>
					<div
						onClick={() => focusBox(key)}
						style={{ visibility: value.shown ? 'visible' : 'hidden', zIndex: value.zIndex}}
						className={`Popups-box Popups-no-cursor Popups-box${index} ${!value.image ? 'Popups-textContainer' : ''}`}
					>
						<strong className="Popups-cursor">
							<span className="Popups-title">{value.title}</span>
							<span onClick={(e) => minimize(e, key)} className="Popups-cursor Popups-close">X</span>
						</strong>
						<div className="Popups-content">
							{value.image ? <img src={value.image} className='Popups-image' /> : value.render()}
						</div>
					</div>
				</Draggable>
			))}
		</div>
	)
}

export default Popups