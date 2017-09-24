import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import App from '../app.jsx'
import Login from './Login'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import { loggedIn } from '../auth.js'
import ResetPasswordContainer from '../ResetPasswordContainer'
import Home from './Home'
import MainLayout from '../components/MainLayout'
function requireAuth(nextState, replace) {
	if (!loggedIn()) {
		replace({
			pathname: '/app/login',
			state: { nextPathname: '/app/' }
		})
	}
}

const routes =
	<Router history={browserHistory}>
		<Route path="/app" component={MainLayout} >
			<IndexRoute component={Home} />
			<Route path='login' component={Login} />
			<Route path='/reset-password' component={ResetPasswordContainer} onEnter={requireAuth} />
		</Route>
	</Router>

export default routes