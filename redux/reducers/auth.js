const initialState = {
  token: null,
  user: {},
  phones: [],
  balance: 0,
  userForm : {},
  isLoading: false,
  isError: false,
  errMessage: null,
  successMsg: null
}

const auth = (state=initialState, action) => {
  switch(action.type){
    case 'AUTH_LOGIN_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_LOGIN_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.token = data.results.token
      window.localStorage.setItem('token', state.token)
      return {...state}
    }
    case 'AUTH_LOGIN_REJECTED': {
      const { data } = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return {...state}
    }
    case 'REGISTER_FORM': {
      const { data } = action.payload
      console.log(data)
      state.isLoading = false
      state.isError = false
      state.userForm = data
      return {...state}
    }
    case 'AUTH_REGISTER_PENDING': {
      state.isLoading = false
      state.isError = false
      return {...state}
    }
    case 'AUTH_REGISTER_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      return {...state}
    }
    case 'AUTH_REGISTER_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    case 'AUTH_GET_USER_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_GET_USER_FULFILLED': {
      const { data } = action.payload
      console.log(data)
      state.isLoading = false
      state.isError = false
      state.user = data.results
      return {...state}
    }
    case 'AUTH_GET_USER_REJECTED': {
      const { data } = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
    }
    case 'AUTH_GET_PHONES_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_GET_PHONES_FULFILLED': {
      const { data } = action.payload
      console.log(data)
      state.isLoading = false
      state.isError = false
      state.phones = data.results
      return {...state}
    }
    case 'AUTH_GET_PHONES_REJECTED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
    }
    case 'AUTH_GET_BALANCE_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_GET_BALANCE_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.balance = data.results
      return {...state}
    }
    case 'AUTH_GET_BALANCE_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    case 'AUTH_FORGOT_PASSWORD_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_FORGOT_PASSWORD_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.successMsg = data.message
      return {...state}
    }
    case 'AUTH_FORGOT_PASSWORD_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    case 'AUTH_NEW_PASSWORD_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_NEW_PASSWORD_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.successMsg = data.message
      return {...state}
    }
    case 'AUTH_NEW_PASSWORD_REJECTED': {
      const { data } = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PASSWORD_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_CHANGE_PASSWORD_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.successMsg = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PASSWORD_REJECTED': {
      const { data } = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PIN_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_CHANGE_PIN_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.successMsg = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PIN_REJECTED': {
      const { data } = action.payload.response
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default auth