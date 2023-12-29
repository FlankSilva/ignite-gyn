import { Text, TextInput, TextInputProps, View } from 'react-native'

type InputProps = TextInputProps & {
  bg?: string
  isDisabled?: boolean
  errorMessage?: string | null
}

export function Input({
  bg = 'bg-gray-700',
  isDisabled = false,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <View className="mb-2">
      <TextInput
        className={`
           ${bg} 
            w-full
            h-14 
            px-4
            text-gray-300 
            font-roboto_regular 
            border
            border-gray-600
            focus:border-green-500
            ${errorMessage ? 'border border-red-300' : 'focus:border-green-500'}
        `}
        placeholderTextColor={'#ccc'}
        {...rest}
        editable={!isDisabled}
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      />
      <View className="h-4">
        {!!errorMessage && (
          <Text className=" text-xs text-red-300">{errorMessage}</Text>
        )}
      </View>
    </View>
  )
}
