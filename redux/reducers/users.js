const initialState = {
  userList: [],
  message: null,
  isLoading: false,
  isError: false,
  errMessage: null
}

const users = (state=initialState, action) => {
  switch(action.type){
    case 'GET_ALL_USERS_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'GET_ALL_USERS_FULFILLED': {
      const { data } = action.payload
      console.log(data.results)
      state.isLoading = false
      state.isError = false
      state.userList = data.results
      console.log(state.users)
      return {...state}
    }
    case 'GET_ALL_USERS_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default users