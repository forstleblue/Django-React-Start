import React, { Component } from 'react'
import Auth from './auth'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
		this.loadUserData = this.loadUserData.bind(this)
		this.logoutHandler = this.logoutHandler.bind(this)
	}

	componentDidMount() {
		this.loadUserData()
	}

	logoutHandler() {
		Auth.logout()
		this.props.router.push('/app/login/')
	}

	loadUserData() {
		$.ajax({
			method: 'GET',
			url: '/api/users/i/',
			datatype: 'json',
			headers: {
				'Authorization': 'Token ' + localStorage.token
			},
			success: function (res) {
				this.setState({ user: res })
			}.bind(this),
			fail: function (err) {
				console.log("error message: " + err.message)
			}
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
				<div className="form-group">
					{this.state.user.username ?
						<h1>You are now logged in, {this.state.user.username}</h1>
						:
						<h1>You are now logged in </h1>
					}
					<button className="btn btn-default" onClick={this.logoutHandler}>Log out</button>
				</div>
			</div>
			</div>

		)
	}
}

App.propTypes = {
	router: PropTypes.object.isRequired,
}



