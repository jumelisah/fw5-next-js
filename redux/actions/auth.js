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
    type: 'AUTH_GET_PHONE',
    payload: http(token).get('/profile/phones')
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