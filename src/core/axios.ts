import axios from 'axios'

import { getCookie } from 'utils'

export const API = axios.create({
  baseURL: '/api/v1',
  withCredentials: true
})

API.interceptors.request.use((req) => {
  const accessToken = getCookie('accessToken')

  if (req.headers && accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req
})
