import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
// import { Players } from '@screens/Players'
// import { NewGroup } from '@screens/NewGroup'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
