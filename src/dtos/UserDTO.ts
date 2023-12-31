export type UserDataDTO = {
  id: string
  name: string
  email: string
  avatar: string
}

export type UserDataPropsDTO = {
  user: UserDataDTO
  isLoadingUserStorageData: boolean
  handleUpdateDataUser: (userData: UserDataDTO) => void
  storageToken: (token: string) => void
  signOut: () => void
}
