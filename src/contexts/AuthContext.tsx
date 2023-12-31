/* eslint-disable no-useless-catch */
import { ReactNode, createContext, useEffect, useState } from 'react'

import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from '@storage/storageUser'

import { UserDataDTO, UserDataPropsDTO } from '@dtos/UserDTO'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAhthToken'
import { api } from '@services/api'

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as UserDataPropsDTO)

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDataDTO>({} as UserDataDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function storageToken(token: string) {
    await storageAuthTokenSave(token)

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

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

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDataDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const userLogged = await storageUserGet()
        const token = await storageAuthTokenGet()

        if (token && userLogged) {
          setUser(userLogged)
          storageUserSave(userLogged)
          storageToken(token)

          setIsLoadingUserStorageData(false)
        }
      } catch (error) {
        throw error
      } finally {
        setIsLoadingUserStorageData(false)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUpdateDataUser,
        isLoadingUserStorageData,
        signOut,
        storageToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
