import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import { logout } from '../../auth'
import { logoutUser } from '../../actions/user'
import * as types from '../../actions/types'
class Header extends Component {

  constructor(props) {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
    this.loadUserData = this.loadUserData.bind(this)
  }

  logoutHandler() {
    logout()
    this.props.dispatch(logoutUser())
  }

  componentDidMount() {
    this.loadUserData()
  }

  loadUserData() {
    console.log("refresh working")
    $.ajax({
      method: 'GET',
      url: '/api/users/i/',
      datatype: 'json',
      headers: {
        'Authorization': 'Token ' + localStorage.token
      },
      success: function (res) {
        this.props.dispatch({
					type: types.LOGIN_USER,
					user: {
						username: res.username
					},
				})
      }.bind(this),
      error: (xhr, status, err) => {
        console.log("Fail to get user data")
        this.props.dispatch({
					type: types.LOGOUT_USER
				})
      }
    })
  }

  render() {
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
            <IndexLink to="/app" className="navbar-brand">Django-React Starter</IndexLink>
          </div>
          <div className="collapse navbar-collapse" id="top-menu">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/features">Features</Link>
              </li>
              {
                this.props.user &&
                <li>
                  <Link to="/app/users">Users</Link>
                </li>
              }
              {
                this.props.user &&
                <li>
                  <Link to="/app/reset-password">Reset Password</Link>
                </li>
              }
            </ul>
            {
              this.props.user ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/profile">
                      Hello {this.props.user.username}
                    </Link>
                  </li>
                  <li>
                    <Link to="/app/login" onClick={this.logoutHandler}>Logout</Link>
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

Header.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Header)