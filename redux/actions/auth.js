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
      dispatch({
        type: 'AUTH_LOGIN',
        payload: dataLogin
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: e.response.data.message
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
        payload: e.response.data.message
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
        payload: e.response.data.message
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
        payload: e.response.data.message
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
        payload: e.response.data.message
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
        payload: e.response.data.message
      })
      dispatch({
        type: 'AUTH_LOADING'
      })
    }
  }
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