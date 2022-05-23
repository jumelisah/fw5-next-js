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
    case 'AUTH_LOGIN': {
      const {data} = action.payload
      state.errMessage = null
      state.token = data.results.token
      window.localStorage.setItem('beWalletToken', state.token)
      return {...state}
    }
    case 'REGISTER_FORM': {
      const { data } = action.payload
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
    case 'AUTH_GET_USER': {
      const {data} = action.payload
      state.user = data.results
      window.localStorage.setItem('beWalletUser', JSON.stringify(state.user))
      return {...state}
    }
    case 'AUTH_GET_PHONES': {
      const { data } = action.payload
      state.phones = data.results
      return {...state}
    }
    case 'AUTH_GET_BALANCE': {
      const { data } = action.payload
      state.balance = data.results
      return {...state}
    }
    case 'AUTH_FORGOT_PASSWORD': {
      const { data } = action.payload
      state.successMsg = data.message
      return {...state}
    }
    case 'AUTH_NEW_PASSWORD': {
      const { data } = action.payload
      state.successMsg = data.message
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
    case 'AUTH_CHANGE_PROFILE_PENDING': {
      state.isLoading = true
      state.isError = false
    }
    case 'AUTH_CHANGE_PROFILE_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.message = data.message
    }
    case 'AUTH_CHANGE_PROFILE_PENDING': {
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
    }
    case 'AUTH_LOGOUT': {
      state.token = null
      state.userData = {}
      window.localStorage.removeItem('beWalletToken')
      window.localStorage.removeItem('beWalletUser')
      window.localStorage.removeItem('beWalletUsers')
      return state
    }
    case 'RESET_AUTH_STATE':{
      state = initialState
      return {...state}
    }
    case 'AUTH_LOADING': {
      state.isLoading = !state.isLoading
      return {...state}
    }
    case 'AUTH_ERROR': {
      state.errMessage = action.payload
      state.isError = true
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default auth