import axios from "axios"

const {BACKEND_URL} = process.env

const http = (token) => {
  const headers = {}
  if(token) {
    headers.Authorization = `Bearer ${token}`
  }
  return axios.create({
    baseURL: 'https://fw5-zwallet.herokuapp.com',
    headers
  })
}

export default http