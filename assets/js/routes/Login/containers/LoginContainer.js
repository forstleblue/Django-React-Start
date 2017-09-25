import React, { Component, PropTypes } from 'react'
import LoginView from '../components/LoginView'
import {login} from '../../../auth'
// import store from '../../../store'
import { showMessage } from '../../../actions/messages'

import createStore from '../../../store'
const initialState = {};
const store = createStore(initialState);

class LoginContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login_error: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(username, password) {
		login(username, password, (loggedIn) => {
			if (loggedIn) {
				this.props.setUser(username)
				this.props.router.push('/app/')
			} else {
				this.setState({ login_error: true })
				console.log("Invalid password and username")
				// setTimeout(()=> {
				// 	this.setState({login_error: false})
				// }, 3000)
				store.dispatch(showMessage('Invalid username and password.'))
			}
		})
	}

	render() {
		return (
			<div>
				{this.state.login_error == true ?
				<h1>Invalid user name and password</h1> :
				''}
			<LoginView
				handleSubmit={this.handleSubmit} />
			</div>
		)
	}
}

export default LoginContainer