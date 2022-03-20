const initialState = {
  token: null,
  user: {},
  phones: [],
  userForm : {},
  isLoading: false,
  isError: false,
  errMessage: null
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
      const { data } = action.payload
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return {...state}
    }
    case 'REGISTER_FORM_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'REGISTER_FORM_FULFILLED': {
      const { data } = action.payload
      console.log(data)
      state.isLoading = false
      state.isError = false
      state.userForm = data
      return {...state}
    }
    case 'REGISTER_FORM_REJECTED': {
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
      const { data } = action.payload
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
    }
    case 'AUTH_GET_PHONE_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_GET_PHONE_FULFILLED': {
      const { data } = action.payload
      console.log(data)
      state.isLoading = false
      state.isError = false
      state.phones = data.results
      return {...state}
    }
    case 'AUTH_GET_PHONE_REJECTED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
    }
    default: {
        return {...state}
    }
  }
}

export default auth