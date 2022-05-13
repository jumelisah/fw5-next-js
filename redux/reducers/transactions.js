const initialState = {
  history: [],
  users: [],
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
    case 'GET_HISTORY_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'GET_HISTORY_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.history = data.results
      return state
    }
    case 'GET_HISTORY_REJECTED': {
      state.isLoading = false
      state.isError = true
      return {...state}
    }
    case 'GET_ALL_USERS_PENDING': {
      state.isLoading = true
      state.isError = false
      return {...state}
    }
    case 'GET_ALL_USERS_FULFILLED': {
      const { data } = action.payload
      state.isLoading = false
      state.isError = false
      state.users = data.results
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

export default transactions