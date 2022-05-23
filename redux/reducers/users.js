const initialState = {
  userList: [],
  message: null,
  isLoading: false,
  isError: false,
  errMessage: null
}

const users = (state=initialState, action) => {
  switch(action.type){
    case 'GET_ALL_USERS': {
      const { data } = action.payload
      state.userList = data.results
      window.localStorage.setItem('beWalletUsers', JSON.stringify(data.results))
      return {...state}
    }
    case 'GET_ALL_USERS_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    case 'USERS_LOADING': {
      state.isLoading = !state.isLoading
      return {...state}
    }
    case 'USERS_ERROR': {
      state.isError = true
      state.errMessage = action.payload
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default users