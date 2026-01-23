const user = ref(null)
const token = ref(localStorage.getItem('token'))

const checkAuth = () => {
  if (token.value) {
    const decoded = jwtDecode(token.value)
    user.value = decoded
  }
}

const logout = () => {
  localStorage.removeItem('token')
  user.value = null
}

const setToken = (newToken) => {
  localStorage.setItem('token', newToken)
  token.value = newToken
  checkAuth()
}

export const useAuth = () => {
  return {
    user,
    token,
    checkAuth,
    logout,
    setToken,
  }
}