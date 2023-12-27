import { StatusBar, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = '#121214'

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent
        />
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
