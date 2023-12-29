import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from '@hooks/useAuth'

import { UserPhoto } from './UserPhoto'

import defaultUserPhoto from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <View className="flex-row bg-gray-600 pt-16 pb-8 px-8 items-center">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserPhoto}
        size={40}
        alt="user"
        className="mr-4"
      />
      <View className="flex-1">
        <Text className="text-gray-100 text-sm">Olá</Text>
        <Text className="text-gray-100 text-sm font-roboto_bold">
          {user.name}
        </Text>
      </View>

      <TouchableOpacity onPress={() => signOut()}>
        <MaterialIcons name="logout" color="#C4C4CC" size={28} />
      </TouchableOpacity>
    </View>
  )
}
