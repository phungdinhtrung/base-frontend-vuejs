import axios from 'axios'

// http://pfes.gfdapp.net:80/api
const PROTOCOL = import.meta.env.VITE_PROTOCOL || 'http'
const HOST = import.meta.env.VITE_HOST || 'localhost'
const PORT = import.meta.env.VITE_SERVER_PORT || '5555'
const API = import.meta.env.VITE_API_SUFFIX || ''
// const ACCESS_TOKEN  = localStorage.getItem('ACCESS_TOKEN') || ''

const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${PORT}${API}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    charset: 'utf-8',
    // 'Authorization': `Bearer ${ACCESS_TOKEN}`
  },
  timeout: 90000, // 15 minutes
  validateStatus: (status) => {
    return true
  },
})

export default axiosInstance
