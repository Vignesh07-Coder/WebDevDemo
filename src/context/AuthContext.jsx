import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const value = useMemo(
    () => ({ user, login: setUser, logout: () => setUser(null) }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
