import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changePasswordRequest } from '../../../actions/user'
import ResetPasswordView from '../components/ResetPasswordView'
import {changePassword} from '../../../auth'
import { showMessage } from '../../../actions/messages'
class ResetPasswordContainer extends Component {

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
    changePassword(this.state.user.username, password, (res) => {
			if(res == "password set") {
				this.refs.passwordView.setState({
					resetSuccess: true
				})
				this.props.dispatch(showMessage("Password changed Successfully."))
				setTimeout(()=> {
					this.props.router.push('/app')
				}, 3000)
			} else {
				this.props.dispatch(showMessage("Password Reset Error."))
			}
		})
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
      <ResetPasswordView ref="passwordView"
        onSubmit={this.handlSubmit}
      />
    )
  }
}

ResetPasswordContainer.propTypes = {
		dispatch: PropTypes.func.isRequired
}

export default connect()(ResetPasswordContainer)
