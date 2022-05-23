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
        type: 'HISTORY_LOADING'
      })
      const data = await http(token).get('/transactions/history')
      dispatch({
        type: 'GET_HISTORY',
        payload: data
      })
      dispatch({
        type: 'HISTORY_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'HISTORY_ERROR',
        payload: e.response.data.message
      })
      dispatch({
        type: 'HISTORY_LOADING'
      })
    }
  }
}

