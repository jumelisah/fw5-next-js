import http from "../../helpers/http"
const { NEXT_PUBLIC_FRONTEND_URL } = process.env

export const login = (email, password) => {
  const data= new URLSearchParams()
  data.append('email', email)
  data.append('password', password)
  return async (dispatch) => {
    try{
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const dataLogin = await http().post('/auth/login', data)
      console.log(dataLogin)
      dispatch({
        type: 'AUTH_LOGIN',
        payload: dataLogin
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      const dataLogin = await http().post('/auth/login', data)
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || dataLogin?.data.message
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}

export const getUserData = (token) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).get('/profile')
      dispatch({
        type: 'AUTH_GET_USER',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}

export const getPhoneNumber = (token) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).get('/profile/phones')
      dispatch({
        type: 'AUTH_GET_PHONES',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}

export const getBalance = (token) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).get('/profile/balance')
      dispatch({
        type: 'AUTH_GET_BALANCE',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
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
  const param = new URLSearchParams()
  param.append('email', email)
  return async (dispatch) => {
    try {
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http().post(`auth/forgot-password?callback_url=${NEXT_PUBLIC_FRONTEND_URL}`, param)
      dispatch({
        type: 'AUTH_FORGOT_PASSWORD',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  };
}

export const createNewPassword = (data) => {
  console.log(data)
  const params = new URLSearchParams()
  params.append('otp', data.otp)
  params.append('newPassword', data.newPassword)
  params.append('confirmPassword', data.confirmPassword)
  return async (dispatch) => {
    try{
      console.log('a')
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http().post('auth/forgot-password', params)
      dispatch({
        type: 'AUTH_NEW_PASSWORD',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}

export const changePassword = (dataPassword, token) => {
  console.log(dataPassword)
  const params = new URLSearchParams()
  for(let x in dataPassword) {
    console.log(x, dataPassword[x])
    params.append(x, dataPassword[x])
  }
  return async (dispatch) => {
    try{
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).patch('/profile/change-password', params)
      dispatch({
        type: 'AUTH_CHANGE_PASSWORD',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}

export const changePinNumber = (dataPin, token) => {
  console.log(token)
  const params = new URLSearchParams()
  params.append('oldPin', dataPin.oldPin)
  params.append('newPin', dataPin.newPin)
  return async (dispatch) => {
    try{
      dispatch({
        type: 'RESET_AUTH_STATE'
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).patch('/profile/change-pin', params)
      dispatch({
        type: 'AUTH_CHANGE_PIN',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
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

export const updateProfile = (userData, token) => {
  return async (dispatch) => {
    try{
      const params = new FormData()
      for (const x in userData) {
        params.append(x, userData[x])
      }
      dispatch({
        type: 'AUTH_LOADING'
      })
      const data = await http(token).patch('/profile', params)
      dispatch({
        type: 'AUTH_CHANGE_PROFILE',
        payload: data
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response?.data.message || String(e)
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
}