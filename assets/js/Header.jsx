import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import { logoutUserRequest } from './actions/user'
import Auth from './auth'
import css from './css/style.css';

export default class Header extends Component {

  constructor(props) {
		super(props)
		this.state = {
			user: {
        username: this.props.username
      }
		}
		this.loadUserData = this.loadUserData.bind(this)
		this.logoutHandler = this.logoutHandler.bind(this)
	}

	componentDidMount() {
		this.loadUserData()
	}

	logoutHandler() {
		Auth.logout()
	}

	changePassword() {

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

  render () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <IndexLink to="/" className="navbar-brand">Django-React Starter</IndexLink>
          </div>
          <div className="collapse navbar-collapse" id="top-menu">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/features">Features</Link>
              </li>
              {
                this.state.user &&
                <li>
                  <Link to="/app/users">Users</Link>
                </li>
              }
            </ul>
            {
              this.state.user.username ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/profile">
                      Hello {this.state.user.username}
                    </Link>
                  </li>
                  <li>
                    <Link to ="/app/login" onClick={this.logoutHandler}>Logout</Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/app/login">Login</Link>
                  </li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    )
  }
}

