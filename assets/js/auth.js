import * as types from './actions/types'
import { showMessage } from './actions/messages'
import { store } from './store'

const getToken = (username, pass, cb) => {
	$.ajax({
		type: 'POST',
		url: '/api/obtain-auth-token/',
		data: {
			username: username,
			password: pass
		},
		success: function (res) {
			cb({
				authenticated: true,
				token: res.token
			})
		},
		error: (xhr, status, err) => {
			cb({
				authenticated: false
			})
		}
	})
}

export const login = (username, pass, cb) => {
	if (localStorage.token) {
		if (cb) cb(true)
		return
	}
	getToken(username, pass, (res) => {
		if (res.authenticated) {
			localStorage.token = res.token
			if (cb) {
				cb(true);
				// store.dispatch({
				// 	type: types.LOGIN_USER,
				// 	user: {
				// 		username,
				// 	},
				// })
			}
		} else {
			if (cb) cb(false)
		}
	})
}

export const logout = () => {
	delete localStorage.token
	// store.dispatch({
	// 	type: types.LOGOUT_USER,
	// })
}

export const loggedIn = () => {
	return !!localStorage.token
}

export const changepass = (username, newpass, cb) => {
	$.ajax({
		type: 'POST',
		url: '/api/users/i/change-password/',
		data: {
			username: username,
			newpass: newpass
		},
		datatype: 'json',
		headers: {
			'Authorization': 'Token ' + localStorage.token
		},
		success: function (res) {
			console.log("change password success")
			// store.dispatch(showMessage('Password is updated successfully.'))
			// 	.then(() => {
			// 		resolve()
			// 	})
		},
		error: (xhr, status, err) => {
			console.log("change password error")
		}
	})
}



