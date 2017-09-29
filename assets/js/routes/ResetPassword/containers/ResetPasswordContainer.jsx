import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResetPasswordView from '../components/ResetPasswordView'
import { changePassword } from '../../../auth'
import { showMessage } from '../../../actions/messages'
class ResetPasswordContainer extends Component {

	constructor(props) {
		super(props)
		this.handlSubmit = this.handlSubmit.bind(this)
	}

	handlSubmit(password) {
		changePassword(this.props.user.username, password, (res) => {
			if (res == "password set") {
				this.refs.passwordView.setState({
					resetSuccess: true
				})
				this.props.dispatch(showMessage("Password changed Successfully."))
				setTimeout(() => {
					this.props.router.push('/app')
				}, 3000)
			} else {
				this.props.dispatch(showMessage("Password Reset Error."))
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
	user: PropTypes.object,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(ResetPasswordContainer)
