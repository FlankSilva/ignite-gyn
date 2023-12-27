import { useState } from 'react'
import { View, SectionList, Text } from 'react-native'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '27.08.22',
      data: ['Puxada frontal'],
    },
  ])

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        className="px-8 "
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Text className="text-gray-200 text-base mt-10 mb-3">
            {section.title}
          </Text>
        )}
        ListEmptyComponent={() => (
          <Text className="text-gray-100 text-center">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        contentContainerStyle={
          [].length === 0 && { flex: 1, justifyContent: 'center' } // Verifica de não tem conteudo
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
