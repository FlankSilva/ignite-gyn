import { useContext } from 'react'

import { AuthContext } from '@context/AuthContext'
import { UserDataPropsDTO } from '@dtos/UserDTO'

export function useAuth(): UserDataPropsDTO {
  const context = useContext(AuthContext)

  return context
}
