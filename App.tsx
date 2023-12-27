import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Routes } from '@routes/index'
import { Loading } from '@components/Loading'

export default function App() {
  const [fonstLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fonstLoaded) {
    return <Loading />
  }

  return <Routes />
}
