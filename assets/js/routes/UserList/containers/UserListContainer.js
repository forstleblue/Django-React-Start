import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserListView from '../components/UserListView'
export default class UserListContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<UserListView />
		)
	}
}