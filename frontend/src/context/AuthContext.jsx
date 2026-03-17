import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('cs_token'))
  const [user, setUser] = useState(localStorage.getItem('cs_user'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('cs_token', token)
    } else {
      localStorage.removeItem('cs_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('cs_user', user)
    } else {
      localStorage.removeItem('cs_user')
    }
  }, [user])

  const login = (tokenValue, username) => {
    setToken(tokenValue)
    setUser(username)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
