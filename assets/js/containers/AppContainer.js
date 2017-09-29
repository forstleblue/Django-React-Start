import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

const AppContainer = ({ store, children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

AppContainer.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
}

export default AppContainer