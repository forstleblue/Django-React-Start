import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import App from '../app.jsx'
import Login from '../login.jsx'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import { loggedIn } from '../auth.js'
import ResetPasswordContainer from '../ResetPasswordContainer'
import HomeView from '../HomeView'
import Header from '../Header'
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
		<Route path="/app" component={Header} />
        <Route path='/app/login' component={Login} />
		<Route path='/app/reset-password' component={ResetPasswordContainer} onEnter={requireAuth} />

    </Router>

export default routes