import {  Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fonstLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fonstLoaded) {
    return <View />
  }

  return (
    <View >
      <Text>Hello App</Text>
    </View>
  );
}