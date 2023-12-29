/* eslint-disable no-useless-catch */
import { ReactNode, createContext, useEffect, useState } from 'react'

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '@storage/storageUser'

import { UserDataDTO, UserDataPropsDTO } from '@dtos/UserDTO'

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as UserDataPropsDTO)

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDataDTO>({} as UserDataDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function handleUpdateDataUser({ id, name, email, avatar }: UserDataDTO) {
    setUser({
      id,
      name,
      email,
      avatar,
    })
    storageUserSave({
      id,
      name,
      email,
      avatar,
    })
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
        setIsLoadingUserStorageData(false)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDataDTO)

      await storageUserRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, handleUpdateDataUser, isLoadingUserStorageData, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
