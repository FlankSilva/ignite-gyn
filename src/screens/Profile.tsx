import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  async function handleUserPhotoSelect() {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    })
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <View className="w-full items-center mt-6 px-10 ">
          <UserPhoto
            source={{ uri: 'https://github.com/flanksilva.png' }}
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
