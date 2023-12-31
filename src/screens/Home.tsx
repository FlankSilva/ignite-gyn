import { useState, useEffect, useCallback } from 'react'
import { View, FlatList, Text, ToastAndroid } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { getDataAPI } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const [exercicises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState(groups[0])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    const response = await getDataAPI({
      endpoint: '/groups',
    })

    if (response && typeof response === 'string') {
      ToastAndroid.show(response, ToastAndroid.SHORT)

      return
    }

    setGroups(response)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useEffect(() => {
    setGroupSelected(groups[0])
  }, [groups])

  useFocusEffect(
    useCallback(() => {
      async function fetchExercisesByGroup() {
        setIsLoading(true)
        const response = await getDataAPI({
          endpoint: `/exercises/bygroup/${groupSelected}`,
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
    }, [groupSelected]),
  )

  return (
    <View className="flex-1">
      <HomeHeader />
      <FlatList
        className="px-8 my-10 max-h-10 min-h-10"
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toLocaleUpperCase() ===
              String(item).toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingRight: 50 }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <View className="flex-1 px-8">
          <View className="flex-row justify-between mb-5">
            <Text className="text-gray-200 text-base">Exercícios</Text>
            <Text className="text-gray-200 text-base">
              {exercicises.length}
            </Text>
          </View>

          <FlatList
            data={exercicises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>
      )}
    </View>
  )
}
