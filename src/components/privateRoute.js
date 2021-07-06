import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ authenticated, children, ...rest }) => {
	return (
		<Route {...rest} render={({ location }) => {
			return authenticated ? children
			: <Redirect
				to={'/'}
			/>
		}} />
	)
}

export default PrivateRoute