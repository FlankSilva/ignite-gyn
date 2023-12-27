import { Text, Pressable, PressableProps } from 'react-native'

type GroupProps = PressableProps & {
  name: string
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Pressable
      className={`
        mr-3 
        w-24 
        h-10 
        bg-gray-600 
        rounded-md 
        justify-center 
        items-center 
        overflow-hidden 
        active:border
        active:border-green-500
        ${isActive ? 'border border-green-500' : ''}
      `}
      {...rest}
    >
      <Text
        className={`
        uppercase text-xs font-bold
        ${isActive ? 'text-green-500' : 'text-gray-200'}
      `}
      >
        {name}
      </Text>
    </Pressable>
  )
}
