const initialState = {
  token: null,
  user: {},
  phones: [],
  balance: 0,
  userForm : {},
  isLoading: false,
  isError: false,
  errMessage: null,
  message: null
}

const auth = (state=initialState, action) => {
  switch(action.type){
    case 'AUTH_LOGIN': {
      const {data} = action.payload
      state.errMessage = null
      state.token = data.results.token
      window.sessionStorage.setItem('beWalletToken', state.token)
      return {...state}
    }
    case 'REGISTER_FORM': {
      console.log(action.payload)
      const data = action.payload
      state.userForm = action.payload
      return {...state}
    }
    case 'AUTH_REGISTER': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'AUTH_GET_USER': {
      const {data} = action.payload
      console.log(data)
      state.user = data.results
      window.sessionStorage.setItem('beWalletUser', JSON.stringify(state.user))
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
      state.message = data.message
      return {...state}
    }
    case 'AUTH_NEW_PASSWORD': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PASSWORD': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PIN': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'AUTH_CHANGE_PROFILE': {
      const { data } = action.payload
      state.user = data.results
      window.sessionStorage.setItem('beWalletUser', JSON.stringify(data.results))
      state.message = data.message
      return {...state}
    }
    case 'AUTH_LOGOUT': {
      state.token = null
      state.userData = {}
      window.sessionStorage.removeItem('beWalletToken')
      window.sessionStorage.removeItem('beWalletUser')
      window.sessionStorage.removeItem('beWalletUsers')
      window.sessionStorage.removeItem('beWalletHistory')
      return state
    }
    case 'RESET_AUTH_STATE':{
      state.isError = false
      state.isLoading = false
      state.errMessage = null
      state.message = null
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