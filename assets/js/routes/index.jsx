import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import App from '../app.jsx'
import Login from '../login.jsx'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import { loggedIn } from '../auth.js'

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
        <Route path='/app' component={App} onEnter={requireAuth} />
        <Route path='/app/login' component={Login} />
    </Router>

export default routes