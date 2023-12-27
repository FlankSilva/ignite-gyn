import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <View
        className={`px-8 bg-gray-600 ${
          Platform.OS === 'android' ? 'pt-16' : 'pt-14'
        }`}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" color="#00B37E" size={24} />
        </TouchableOpacity>

        <View className="flex-row justify-between mt-4 mb-8 items-center ">
          <Text className="text-gray-100 text-lg flex-shrink">
            Puxada frontal
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">Costas</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="p-8">
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgqrA6g4aPy5maOMZxpb3dHAAjdmRFvUDwQ&usqp=CAU',
            }}
            height={183}
            alt="Nome do exercício"
            resizeMode="cover"
            className="rounded-lg mb-3"
          />

          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row items-center justify-around mb-6 mt-5">
              <View className="flex-row">
                <SeriesSvg />
                <Text className="text-gray-200 ml-2">3 séries</Text>
              </View>
              <View className="flex-row">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">12 repetições</Text>
              </View>
            </View>

            <Button title="Marcar como realizado" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
