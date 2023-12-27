import { TextInput, TextInputProps } from 'react-native'

type InputProps = TextInputProps & {
  bg?: string
  isDisabled?: boolean
}

export function Input({
  bg = 'bg-gray-700',
  isDisabled = false,
  ...rest
}: InputProps) {
  return (
    <TextInput
      className={`
         ${bg} 
          w-full
          h-14 
          px-4
          text-gray-300 
          font-roboto_regular 
          mb-4
          focus:border border-green-500
      `}
      placeholderTextColor={'#ccc'}
      {...rest}
      editable={!isDisabled}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    />
  )
}
