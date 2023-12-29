import { useState } from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/flanksilva.png',
  )

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return true
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )

        if (photoInfo.exists) {
          if (photoInfo.size && photoInfo.size / 1024 / 1024 > 2) {
            return ToastAndroid.show('Imagem muito grande', ToastAndroid.SHORT)
          }
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <View className="w-full items-center mt-6 px-10 ">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size={148}
            isLoadingPhoto={photoIsLoading}
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 font-bold text-base mt-2 mb-8">
              Aleterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="bg-gray-600" />
          <Input value="E-mail" bg="bg-gray-600" isDisabled={true} />
        </View>

        <View className="px-10 mt-12 mb-9">
          <Text className="text-gray-200 text-base mb-2">Alterar senha</Text>

          <Input placeholder="Senha antiga" bg="bg-gray-600" secureTextEntry />
          <Input placeholder="Nova senha" bg="bg-gray-600" secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg="bg-gray-600"
            secureTextEntry
          />

          <View className="w-full mt-4">
            <Button title="Atualizar" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
