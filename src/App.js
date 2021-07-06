import './App.css';
import {
	BrowserRouter as Router,
	Switch, Route
} from "react-router-dom";
import { PrivateRoute } from './components'
import { Home, Tickets } from './pages'
import { useEffect, useState } from 'react'

import { checkCode } from './requests'

const App = () => {
	const [authenticated, setAuthenticated] = useState(null)

	useEffect( async () => {
		console.log("SESSION BEGIN")
		const code = localStorage.getItem('fof-code')
		if (code) {
			const valid = await checkCode(code)
			if (valid) {
				setAuthenticated(true)
				return
			}
		}
		setAuthenticated(false)
	}, [])

	if (authenticated === null) {
		return null
	}

	return (
		<Router>
			<Switch>
				{/* <Route path="/about">
					<About />
				</Route>
				<Route path="/schedule">
					<Schedule />
				</Route>
				<Route path="/music">
					<Music />
				</Route> */}
				<PrivateRoute authenticated={authenticated} path="/tickets">
					<Tickets />
				</PrivateRoute>
				<Route path="/">
					<Home  authenticated={authenticated}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
