import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import { HomeLogo } from '../components'
import './home.css'
import img from '../illo.PNG'


const Home = ({ authenticated }) => {

	const $title = useRef()
	const [hovered, setHovered] = useState(false)
	const [diagonal, setDiagonal] = useState(false)

	const [code, setCode] = useState()

	useEffect(() => {
		if ($title.current) {
			$title.current.addEventListener("mouseenter", ( event ) => {
				setHovered(true)
			})
		}
	}, [])

	const handleChange = (e) => {
		setCode(e.target.value)
	}

	const changeCode = () => {
		localStorage.setItem('fof-code', code);
		window.location.reload()
	}

	const onPress = async () => {
		if (hovered === false) {
			setTimeout(() => {
				setHovered(true)
				setDiagonal(true)
			}, 1000)
		} else {
			setDiagonal(true)
		}
	}

	return (
		<div className='Home'>
			{!authenticated && <div className='Home-unauth'>
				<h1 ref={$title} className={`Home-title ${diagonal ? 'Home-diagonal' : ''} ${hovered ? 'Home-spread' : ''}`}>
					<span>F</span>
					<span>o</span>
					<span>F</span>
				</h1>
				<div className='Home-formContainer'>
					<form className='Home-form' onSubmit={changeCode}>
						<span>secret password:</span>
						<input onKeyPress={onPress} className='Home-input' type="text" value={code} onChange={handleChange} />
					</form>
				</div>
			</div>}
			{authenticated && <div className='Home-auth'>
				<HomeLogo />
				<Link to="/about" className='Home-link'>
					<img src={img} className='Home-illo'/>
				</Link>
			</div>}
		</div>
	)
}

export default Home

