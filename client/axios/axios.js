import axios from 'axios'

const api = axios.create({
  baseURL: 'https://e-c-ommerce.herokuapp.com/api/v1',
})

export default api
