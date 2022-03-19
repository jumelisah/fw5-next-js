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