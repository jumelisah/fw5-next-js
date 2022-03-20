import http from "../../helpers/http"

export const getAllUser = (token) => {
  return({
    type: 'GET_USER',
    payload: http(token).get('/users')
  })
}