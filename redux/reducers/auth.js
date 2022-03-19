const initialState = {
  token: null,
  user: {},
  isLoading: false,
  isError: false,
  errMessage: null
}

const auth = (state=initialState, action) => {
  switch(action.type){
    case 'AUTH_LOADING_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'AUTH_LOADING_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.token = data.results.token
      console.log(token)
      window.localStorage.setItem('token', state.token)
      return {...state}
    }
    case 'AUTH_LOADING_REJECTED': {
      const { data } = action.payload
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