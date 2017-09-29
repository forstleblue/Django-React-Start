import * as types from './types'

export const loginUser = (token, user) => {
  localStorage.setItem(token, user.username)
  return {
    type: types.LOGIN_USER,
    user
  }
}

export const logoutUserRequest = () => ({
  type: types.LOGOUT_USER_REQUEST,
})

export const logoutUser = () => {
  delete localStorage.token
  return { type: types.LOGOUT_USER }
}

export const changePasswordRequest = password => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  password,
})
