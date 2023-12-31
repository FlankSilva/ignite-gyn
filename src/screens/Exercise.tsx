import { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { api, getDataAPI, setDataAPI } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type RoutesParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [sendingRegister, setSendingRegister] = useState(false)
  const [exercises, setExercises] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const { exerciseId } = route.params as RoutesParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleExerciseHistoryRegister() {
    setSendingRegister(true)
    const response = await setDataAPI({
      endpoint: `/history`,
      data: { exercise_id: exerciseId },
      setIsLoading: setSendingRegister,
    })

    setSendingRegister(false)

    if (response && typeof response === 'string') {
      ToastAndroid.show(response, ToastAndroid.SHORT)

      return
    }

    navigation.navigate('history')
  }

  useEffect(() => {
    async function fetchExercisesByGroup() {
      setIsLoading(true)
      const response = await getDataAPI({
        endpoint: `/exercises/${exerciseId}`,
        setIsLoading,
      })

      setIsLoading(false)

      if (response && typeof response === 'string') {
        ToastAndroid.show(response, ToastAndroid.SHORT)

        return
      }

      setExercises(response)
    }

    fetchExercisesByGroup()
  }, [exerciseId])

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
            {exercises.name}
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">
              {exercises.group}
            </Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View className="p-8">
            <View className="rounded-lg mb-3 overflow-hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercises.demo}`,
                }}
                height={364}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </View>

            <View className="bg-gray-600 rounded-md pb-4 px-4">
              <View className="flex-row items-center justify-around mb-6 mt-5">
                <View className="flex-row">
                  <SeriesSvg />
                  <Text className="text-gray-200 ml-2">
                    {exercises.series} séries
                  </Text>
                </View>
                <View className="flex-row">
                  <RepetitionsSvg />
                  <Text className="text-gray-200 ml-2">
                    {exercises.repetitions} repetições
                  </Text>
                </View>
              </View>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
