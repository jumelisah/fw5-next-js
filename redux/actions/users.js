import http from "../../helpers/http"

export const getAllUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_LOADING'
      })
      const data = await http(token).get('/users')
      dispatch({
        type: 'GET_ALL_USERS',
        payload: data
      })
      dispatch({
        type: 'USERS_LOADING'
      })
    } catch (e) {
      dispatch({
        type: 'USERS_ERROR',
        payload: e.response.data.message
      })
      dispatch({
        type: 'USERS_LOADING'
      })
    }
  }
  return({
    type: 'GET_ALL_USERS',
    payload: http(token).get('/users')
  })
}