import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'
import Login from './login.jsx'
import { loggedIn } from './auth.js'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import 'react-hot-loader/patch';
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store'
import { AppContainer } from 'react-hot-loader';

const initialState = {};
const store = configureStore(initialState, browserHistory);
// const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(nextState, replace) {
	if (!loggedIn()) {
		replace({
			pathname: '/app/login',
			state: { nextPathname: '/app/' }
		})
	}
}

ReactDOM.render(
	<AppContainer store={store}>
		<Router history={browserHistory}>
			<Route path='/app' component={App} onEnter={requireAuth} />
			<Route path='/app/login' component={Login} />
		</Router>
	</AppContainer>,
	document.getElementById('app')
)

if (module.hot) {
	module.hot.accept('./reducers', () => {
		ReactDOM.render(
			<AppContainer store={store}>
				<Router history={browserHistory}>
					<Route path='/app/' component={App} onEnter={requireAuth} />
					<Route path='/app/login/' component={Login} />
				</Router>
			</AppContainer>,
			document.getElementById('app')
		)
	})
}


