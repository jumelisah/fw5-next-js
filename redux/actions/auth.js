import http from "../../helpers/http"

export const login = (email, password) => {
  const data= new URLSearchParams()
  data.append('email', email)
  data.append('password', password)
  return({
    type: 'AUTH_LOGIN',
    payload: http().post('/auth/login', data)
  })
}

export const getUserData = (token) => {
  return({
    type: 'AUTH_GET_USER',
    payload: http(token).get('/profile')
  })
}

export const getPhoneNumber = (token) => {
  return({
    type: 'AUTH_GET_PHONES',
    payload: http(token).get('/profile/phones')
  })
}

export const getBalance = (token) => {
  return({
    type: 'AUTH_GET_BALANCE',
    payload: http(token).get('/profile/balance')
  })
}

export const registerForm = (data) => {
  return({
    type: 'REGISTER_FORM',
    payload: {
      data: data
    }
  })
}

export const forgotPassword = (email) => {
  const params = new URLSearchParams()
  params.append('email', email)
  return({
    type: 'AUTH_FORGOT_PASSWORD',
    payload: http().post('auth/forgot-password?callback_url=http://localhost:3000', params)
  })
}

export const createNewPassword = (data) => {
  const params = new URLSearchParams()
  params.append('otp', data.otp)
  params.append('newPassword', data.newPassword)
  params.append('confirmPassword', data.confirmPassword)
  return({
    type: 'AUTH_NEW_PASSWORD',
    payload: http().post('auth/forgot-password', params)
  })
}

export const changePassword = (data, token) => {
  const params = new URLSearchParams()
  params.append('oldPassword', data.oldPassword)
  params.append('newPassword', data.newPassword)
  params.append('confirmPassword', data.confirmPassword)
  return({
    type: 'AUTH_CHANGE_PASSWORD',
    payload: http(token).patch('/profile/change-password', params)
  })
}

export const changePinNumber = (data, token) => {
  const params = new URLSearchParams()
  params.append('oldPin', data.oldPin)
  params.append('newPin', data.newPin)
  return({
    type: 'AUTH_CHANGE_PIN',
    payload: http(token).patch('/profile/change-pin', params)
  })
}

export const register = (data) => {
  const params = new URLSearchParams()
  params.append('fullName', data.fullName)
  params.append('email', data.email)
  params.append('password', data.password)
  params.append('pin', data.pin)

  return({
    type: 'AUTH_REGISTER',
    payload: http().post('/auth/register', params)
  })
}

export const updateProfile = (data) => {
  const params = new FormData()
  for (const x in data) {
    params.append(x, data[x])
  }
  return({
    type: 'AUTH_UPDATE_PROFILE',
    payload: http.patch('/profile', params)
  })
}