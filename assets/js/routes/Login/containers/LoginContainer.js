import React, { Component, PropTypes } from 'react'
import LoginView from '../components/LoginView'
import {login} from '../../../auth'
class LoginContainer extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(username, password) {
		login(username, password, (loggedIn) => {
			if (loggedIn) {
				this.props.setUser(username)
				this.props.router.push('/app/')
			} else {
				this.setState({ login_error: true })
			}
		})
	}

	render() {
		return (
			<LoginView
				handleSubmit={this.handleSubmit} />
		)
	}
}

export default LoginContainer