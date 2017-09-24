module.exports = {
	login: function (username, pass, cb) {
		if (localStorage.token) {
			if (cb) cb(true)
			return
		}
		this.getToken(username, pass, (res) => {
			if (res.authenticated) {
				localStorage.token = res.token
				if (cb) cb(true)
			} else {
				if (cb) cb(false)
			}
		})
	},

	logout: function () {
		delete localStorage.token
	},

	loggedIn: function () {
		return !!localStorage.token
	},

	changepass: function(username, newpass, cb) {
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
			success: function(res) {
				console.log("change password success")
			},
			error: (xhr, status, err) => {
				console.log("change password error")
			}
		})
	},

	getToken: function (username, pass, cb) {
		console.log("post method")
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
	},
}
