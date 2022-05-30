import http from "../../helpers/http"

export const topUp = (amount, token) =>{
  const data = new URLSearchParams()
  data.append('amount', amount)
  return({
    type: 'TOP_UP',
    payload: http(token).post('/transactions/topup', data)
  })
}

export const getHistory = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
      const data = await http(token).get('/transactions/history')
      dispatch({
        type: 'GET_HISTORY',
        payload: data
      })
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: e.response.data.message
      })
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
    }
  }
}

export const transferBalance = (dataTransfer, token) => {
  const params= new URLSearchParams()
  for (let x in dataTransfer) {
    params.append(x, dataTransfer[x])
  }
  return async(dispatch) => {
    try {
      console.log(dataTransfer)
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
      const data = await http(token).post('/transactions/transfer', params)
      dispatch({
        type: 'TRANSFER',
        payload: data
      })
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
    } catch (e) {
      console.log(e)
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: e.response.data.message
      })
      dispatch({
        type: 'TRANSACTION_LOADING'
      })
    }
  }
}