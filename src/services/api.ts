import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const api = axios.create({
  baseURL: import.meta.env.VITE_HEXABASE_API_BASE_URL,
  withCredentials: false, //true neu dung cookie
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const res = await api.post('/refresh-token', {
        token: authStore.token,
      })
      authStore.token = res.data.token
      return api(originalRequest)
    }
  },
)

export default api
