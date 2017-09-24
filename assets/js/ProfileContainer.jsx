import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changePasswordRequest } from './actions/user'
import ProfileView from './ProfileView'
import Auth from './auth'
class ProfileContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
			user: {}
		}
		this.loadUserData = this.loadUserData.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
  }

  componentDidMount() {
		this.loadUserData()
	}

  handlSubmit(password) {
    Auth.changepass(this.state.user.username, password)
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
      <ProfileView
        onSubmit={this.handlSubmit}
      />
    )
  }
}

ProfileContainer.propTypes = {
    changePasswordRequest: PropTypes.func.isRequired,
}

export default connect(undefined, { changePasswordRequest })(ProfileContainer)
