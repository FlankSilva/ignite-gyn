import { ActivityIndicator, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Loading() {
  return (
    <SafeAreaView className="flex-1 bg-gray-700 items-center justify-center">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <ActivityIndicator color={'#00875F'} size={60} />
    </SafeAreaView>
  )
}
