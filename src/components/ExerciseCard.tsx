import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Entypo } from '@expo/vector-icons'

import { api } from '@services/api'

type Props = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-lg mb-3">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do execício"
          width={67}
          height={67}
          className="rounded-lg mr-4"
          resizeMode="cover"
        />

        <View className="flex-1">
          <Text className="text-lg text-white">{data.name}</Text>
          <Text className="text-sm text-gray-200 mt-1" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </View>

        <Entypo name="chevron-thin-right" color={'#7C7C8A'} />
      </View>
    </TouchableOpacity>
  )
}
