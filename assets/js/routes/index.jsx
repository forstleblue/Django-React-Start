import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import App from '../app.jsx'
import Login from '../login.jsx'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import { loggedIn } from '../auth.js'
import ProfileContainer from '../ProfileContainer'
import HomeView from '../HomeView'
function requireAuth(nextState, replace) {
	if (!loggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: '/' }
		})
	}
}

const routes =
    <Router history={browserHistory}>
        <Route path='/' component={App} onEnter={requireAuth} />
        <Route path='/login' component={Login} />
		<Route path='/profile' component={ProfileContainer} onEnter={requireAuth} />
    </Router>

export default routes