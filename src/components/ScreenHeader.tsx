import { Text, View } from 'react-native'

type ScreenHeaderProps = {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <View className="bg-gray-600 pb-6 pt-16 items-center justify-center">
      <Text className="text-gray-100 text-xl">{title}</Text>
    </View>
  )
}
