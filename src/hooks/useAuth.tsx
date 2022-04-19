import { useContext } from 'react'

import { AuthContext } from 'providers/auth'

export const useAuth = () => {
  return useContext(AuthContext)
}
