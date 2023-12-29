import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native'

type ButtonProp = TouchableOpacityProps & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'solid',
  isLoading,
  ...rest
}: ButtonProp) {
  return (
    <TouchableOpacity
      className={`
        w-full 
        h-14 
        ${
          variant === 'outline'
            ? 'bg-transparent border border-green-500'
            : 'bg-green-700'
        }
        items-center 
        justify-center 
        rounded
        active:bg-green-500
        ${isLoading ? 'opacity-70' : ''}
      `}
      {...rest}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={30} />
      ) : (
        <Text className="text-white font-bold text-sm">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
