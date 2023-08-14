import axios from 'axios'

const instance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   withCredentials: true,
})

export const http = async (url, method, config = {}) => {
   const response = await instance.request({
      url,
      method,
      ...config,
   })
   return response
}
