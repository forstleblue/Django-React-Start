import React, { Component, PropTypes } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
export default class UserListView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users:[]
		}
		this.loadUserListData = this.loadUserListData.bind(this)
	}

	componentDidMount(){
		this.loadUserListData()
	}

	loadUserListData() {
		$.ajax({
			method: 'GET',
			url: '/api/users/',
			datatype: 'json',
			headers: {
				'Authorization': 'Token ' + localStorage.token
			},
			success: function (res) {
				this.setState({ users: res })
			}.bind(this),
			fail: function (err) {
				console.log("error message: " + err.message)
			}
		})
	}
	render() {
		var rows= [];
		this.state.users.map((user, index)=> {
			rows.push(
				<tr>
					<th>{index}</th>
					<th>{user.username}</th>
				</tr>
			)
		})

		function indexN(cell, row, enumObject, index) {
			return (<div>{index+1}</div>)
		}

		return(
			<div>
				<h1>Super User Table</h1>
				{this.state.users ?
					<BootstrapTable data={ this.state.users }>
						<TableHeaderColumn dataField='id' isKey dataFormat={indexN}>User ID</TableHeaderColumn>
						<TableHeaderColumn dataField='username'>User Name</TableHeaderColumn>
					</BootstrapTable>
					:
					<table>
						<thead>
							<tr>
								<th>Number</th>
								<th>User name</th>
							</tr>
						</thead>
					</table>
				}
			</div>
		)
	}
}