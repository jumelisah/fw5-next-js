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
    case 'TOP_UP': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'TRANSFER': {
      const { data } = action.payload
      state.message = data.message
      return {...state}
    }
    case 'GET_HISTORY': {
      const { data } = action.payload
      state.history = data.results
      window.localStorage.setItem('beWalletHistory', JSON.stringify(state.history.sort((a,b) => b.id - a.id)))
      return {...state}
    }
    case 'TRANSACTION_LOADING': {
      state.isLoading = !state.isLoading
      return {...state}
    }
    case 'TRANSACTION_ERROR': {
      state.isError = true
      state.errMessage = action.payload
      return {...state}
    }
    case 'TRANSACTION_CLEAR': {
      state.isError = false
      state.errMessage = null
      state.message = null
      return {...state}
    }
    default: {
        return {...state}
    }
  }
}

export default transactions