import axios from 'axios'

import { getCookie } from 'utils'

const isDev = process.env.NODE_ENV === 'development'

export const API = axios.create({
  baseURL: isDev ? '/api/v1' : 'http://api.oner.ru/api/v1',
  withCredentials: true
})

API.interceptors.request.use((req) => {
  const accessToken = getCookie('accessToken')

  if (req.headers && accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req
})
