import { useEffect, useCallback, useMemo } from 'react'
import { View, Animated } from 'react-native'

type SkeletonProps = {
  width: number
  height: number
  rounded?: number
  startColor?: string
  endColor?: string
}

export function Skeleton({
  width,
  height,
  rounded,
  startColor,
  endColor,
}: SkeletonProps) {
  const AnimatedValue = useMemo(() => new Animated.Value(0), [])

  const translateX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 220],
  })

  const skeletonAnimated = useCallback(() => {
    AnimatedValue.setValue(0)
    Animated.timing(AnimatedValue, {
      toValue: 1,
      duration: 950,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        skeletonAnimated()
      }, 400)
    })
  }, [AnimatedValue])

  useEffect(() => {
    skeletonAnimated()

    return () => skeletonAnimated()
  }, [skeletonAnimated])

  return (
    <View
      className={`
        flex-row
        items-center
        bg-gray-100
        overflow-hidden
      `}
      style={{
        height,
        width,
        borderRadius: rounded,
        backgroundColor: startColor || '#202024',
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          width: 30,
          height,
          backgroundColor: endColor || 'rgba(99, 110, 114, 0.1)',
        }}
      />
    </View>
  )
}
