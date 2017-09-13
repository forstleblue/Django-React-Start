import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import { logoutUserRequest } from './actions/user'

const Header = ({ user, logoutUserRequest }) => ( // eslint-disable-line no-shadow
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-menu" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <IndexLink to="/" className="navbar-brand">MERN Starter</IndexLink>
      </div>
      <div className="collapse navbar-collapse" id="top-menu">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/features">Features</Link>
          </li>
          {
            user && user.isAdmin &&
            <li>
              <Link to="/users">Users</Link>
            </li>
          }
        </ul>
        {
          user ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/profile">
                  Hello {user.username}
                </Link>
              </li>
              <li>
                <Link to="/" onClick={logoutUserRequest}>Logout</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )
        }
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  user: PropTypes.object,
  logoutUserRequest: PropTypes.func.isRequired,
}

Header.defaultProps = {
  user: null,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { logoutUserRequest })(Header)
