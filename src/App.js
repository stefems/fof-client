import './App.css';
import {
	BrowserRouter as Router,
	Switch, Route
} from "react-router-dom";
import { PrivateRoute } from './components'
import { Home, Tickets, About, Errors } from './pages'
import { useEffect, useState } from 'react'

import { checkCode } from './requests'

const App = () => {
	const [authenticated, setAuthenticated] = useState(null)
	const [errors, setErrors] = useState()

	useEffect( async () => {
		const code = localStorage.getItem('fof-code')
		if (code) {
			const valid = await checkCode(code)
			if (valid && !valid.errors) {
				setAuthenticated(true)
				return
			} else if (valid.errors) {
				if (valid.errors !== 'invalid code' && window.location.pathname !== '/errors') {
					window.location.href = '/errors';
					return
				} else if (valid.errors === 'invalid code' && window.location.pathname === '/errors') {
					window.location.href = '/';
					return
				} else {
					setErrors(valid.errors)
				}
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
				<Route path="/errors">
					<Errors errors={errors}/>
				</Route>
				<PrivateRoute authenticated={authenticated} path="/about">
					<About />
				</PrivateRoute>
				<PrivateRoute authenticated={authenticated} path="/tickets">
					<Tickets />
				</PrivateRoute>
				<Route path="/">
					<Home authenticated={authenticated}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
