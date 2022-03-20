const initialState = {
  message: null,
  isLoading: false,
  isError: false,
  errMessage: null
}

const transactions = (state=initialState, action) => {
  switch(action.type){
    case 'TOP_UP_PENDING': {
      state.isLoading = true
      state.isError = false
      return state
    }
    case 'TOP_UP_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.message = data.results
      return state
    }
    case 'TOP_UP_REJECTED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = true
      state.errMessage = data.message
      return state
    }
    // case 'AUTH_GET_USER_PENDING': {
    //   state.isLoading = true
    //   state.isError = false
    //   return {...state}
    // }
    // case 'AUTH_GET_USER_FULFILLED': {
    //   const { data } = action.payload
    //   console.log(data)
    //   state.isLoading = false
    //   state.isError = false
    //   state.user = data.results
    //   return {...state}
    // }
    // case 'AUTH_GET_USER_REJECTED': {
    //   const { data } = action.payload
    //   state.isLoading = false
    //   state.isError = true
    //   state.errMessage = data.message
    // }
    default: {
        return {...state}
    }
  }
}

export default transactions