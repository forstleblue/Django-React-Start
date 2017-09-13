import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changePasswordRequest } from './actions/user'
import ProfileView from './ProfileView'

class ProfileContainer extends Component {

  constructor(props) {
    super(props)

    this.handlSubmit = this.handlSubmit.bind(this)
  }

  handlSubmit(password) {
    this.props.changePasswordRequest(password)
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
