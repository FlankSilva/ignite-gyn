import { Text, View } from 'react-native'

export function HistoryCard() {
  return (
    <View
      className={`
      w-full 
      px-5 
      py-4 
      mb-3 
      bg-gray-600 
      rounded-2xl 
      items-center 
      justify-between
      flex-row
    `}
    >
      <View className="mr-5 flex-1">
        <Text className="text-white text-base capitalize" numberOfLines={1}>
          Costas
        </Text>
        <Text className="text-gray-100 text-lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </View>

      <Text className="text-gray-300 text-base">08:56</Text>
    </View>
  )
}
