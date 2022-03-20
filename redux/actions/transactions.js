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
  return({
    type: 'GET_HISTORY',
    payload: http(token).get('/transactions/history')
  })
}
