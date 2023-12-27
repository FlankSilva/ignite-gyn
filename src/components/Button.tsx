import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

type ButtonProp = TouchableOpacityProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProp) {
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
      `}
      {...rest}
    >
      <Text className="text-white font-bold text-sm">{title}</Text>
    </TouchableOpacity>
  )
}
