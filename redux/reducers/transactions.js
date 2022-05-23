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
    case 'GET_HISTORY': {
      const { data } = action.payload
      state.history = data.results
      window.localStorage.setItem('beWalletHistory', JSON.stringify(state.history))
      return {...state}
    }
    case 'HISTORY_LOADING': {
      state.isLoading = !state.isLoading
      return {...state}
    }
    case 'HISTORY_ERROr': {
      state.isError = true
      state.errMessage = action.payload
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default transactions