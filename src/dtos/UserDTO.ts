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
  signOut: () => void
}
