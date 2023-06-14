import request from './request'

export const axiosService: request = new request({
  baseURL: process.env.VITE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.VITE_APP_BASE_Origin
  },
  withCredentials: true
})

export const warframeService: request = new request({
  baseURL: 'https://api.warframestat.us/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
