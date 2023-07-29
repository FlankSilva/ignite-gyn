import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AppRoutes } from './app.routes'
import { StatusBar } from 'react-native'

export function Routes() {
  return (
    <SafeAreaView className='flex-1 bg-background-page'>
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor='transparent'
          translucent
        />
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaView>
  )
}
