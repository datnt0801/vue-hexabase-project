import api from '@/services/api'

export const authService = {
  login: async (payload: { email: string; password: string }) => {
    const res = await api.post('/login', payload)
    console.log('URL', api.defaults.baseURL)
    return res.data
  },

  register: async (payload: { userCode: string; password: string }) => {
    const res = await api.post('/register', payload)
    return res.data
  },

  logout: async () => {
    const res = await api.post('/logout')
    return res.data
  },

  refreshToken: async () => {
    const res = await api.post('/refresh-token')
    return res.data
  },
  userLogin: async (user_code: string, password: string) => {
    const res = await api.post('/login', {
      user_code: user_code,
      password: password,
      exclusive_w_id: '6980819286bbce7dbccd7efb',
    })
    return res.data
  },
}
