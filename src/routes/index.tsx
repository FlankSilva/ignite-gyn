import { StatusBar, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { Loading } from '@components/Loading'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = '#121214'

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent
        />
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
