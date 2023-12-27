import { Image, ImageProps } from 'react-native'
import { Skeleton } from './Skeleton'

type UserPhotoProps = ImageProps & {
  size: number
  alt: string
  isLoadingPhoto?: boolean
}

export function UserPhoto({
  size,
  alt,
  isLoadingPhoto,
  ...rest
}: UserPhotoProps) {
  if (isLoadingPhoto) {
    return <Skeleton width={size} height={size} rounded={size} />
  }

  return (
    <Image
      width={size}
      height={size}
      alt={alt}
      {...rest}
      className="rounded-full"
    />
  )
}
