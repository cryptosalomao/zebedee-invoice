const axios = require('axios')

const apiKey = localStorage.getItem('apiKey') || ''

const instance = axios.create({
  baseURL: 'https://api.zebedee.io/v0/',
  headers: {
    apiKey,
    'Content-Type': 'application/json'
  }
})

export default instance
