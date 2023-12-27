import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  return (
    <View className="flex-row bg-gray-600 pt-16 pb-8 px-8 items-center">
      <UserPhoto
        source={{ uri: 'https://avatars.githubusercontent.com/u/51212629?v=4' }}
        size={40}
        alt="user"
        className="mr-4"
      />
      <View className="flex-1">
        <Text className="text-gray-100 text-sm">Olá</Text>
        <Text className="text-gray-100 text-sm font-roboto_bold">Flank</Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons name="logout" color="#C4C4CC" size={28} />
      </TouchableOpacity>
    </View>
  )
}
