import { useState } from 'react'
import { View, Image, Text, ScrollView, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'
import LogoSVG from '@assets/logo.svg'
import { useAuth } from '@hooks/useAuth'
import { setDataAPI } from '@services/api'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { handleUpdateDataUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {
    setIsLoading(true)

    const response = await setDataAPI({
      endpoint: '/sessions',
      data: { email, password },
    })

    setIsLoading(false)

    if (response && typeof response === 'string') {
      ToastAndroid.show(response, ToastAndroid.SHORT)

      return
    }

    handleUpdateDataUser({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      avatar: response.user.avatar,
    })

    // return data
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-10">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          className="absolute"
        />
        <View className="items-center my-24">
          <LogoSVG />
          <Text className="text-gray-100 text-sm">
            Treine sua mente e o seu corpo
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-100 font-roboto_bold text-xl">
            Acesse sua conta
          </Text>
        </View>

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Informe o e-mail' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Informe a senha' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              onSubmitEditing={handleSubmit(handleSignIn)}
              returnKeyType="send"
            />
          )}
        />

        <View className="w-full mt-4">
          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </View>

        <View className="space-y-3 items-center mt-24">
          <Text className="text-gray-100 text-sm">Ainda não tem acesso?</Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </View>
      </View>
    </ScrollView>
  )
}
