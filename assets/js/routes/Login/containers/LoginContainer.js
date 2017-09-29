import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginView from '../components/LoginView'
import {login} from '../../../auth'
import { showMessage } from '../../../actions/messages'
import * as types from '../../../actions/types'
import { loginUser } from '../../../actions/user'
class LoginContainer extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(username, password) {
		login(username, password, (token) => {
			if (token) {
				this.props.dispatch(loginUser(token, {username: username}))
				this.props.router.push('/app')
			} else {
				this.props.dispatch(showMessage('Invalid username and password.'))
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

LoginContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
}

export default connect()(LoginContainer)