import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'react-hot-loader/patch';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './store'
import AppContainer from './containers/AppContainer';
import routes from './routes'
import * as types from './actions/types'
import { loginUser, logoutUser } from './actions/user'
const initialState = {};
const store = createStore(initialState);
const token = localStorage.getItem('token')
if(token) {
	const lastAccessTime = localStorage.getItem('lastLogin')
	const currentTime = new Date()
	const intervalTime = (currentTime.getTime() - lastAccessTime)/1000/60
	const username = localStorage.getItem(token)
	localStorage.setItem('lastLogin', currentTime.getTime())
	//remove user token if there was not access during 60 minutes
	if(intervalTime < 60 ) {
		store.dispatch(loginUser(token, {username: username}))
	} else {
		store.dispatch(logoutUser())
	}
}
ReactDOM.render(
	<AppContainer store={store}>
		{routes}
	</AppContainer>,
	document.getElementById('app')
)

if (module.hot) {
	module.hot.accept('./reducers', () => {
		ReactDOM.render(
			<AppContainer store={store}>
				{routes}
			</AppContainer>,
			document.getElementById('app')
		)
	})
}


