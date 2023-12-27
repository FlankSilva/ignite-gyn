import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-lg mb-3">
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgqrA6g4aPy5maOMZxpb3dHAAjdmRFvUDwQ&usqp=CAU',
          }}
          alt="Imagem do execício"
          width={67}
          height={67}
          className="rounded-lg mr-4"
          resizeMode="cover"
        />

        <View className="flex-1">
          <Text className="text-lg text-white">Remada unilateral</Text>
          <Text className="text-sm text-gray-200 mt-1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </View>

        <Entypo name="chevron-thin-right" color={'#7C7C8A'} />
      </View>
    </TouchableOpacity>
  )
}
