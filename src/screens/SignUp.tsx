import { useState } from 'react'
import { View, Image, Text, ScrollView, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import BackgroundImg from '@assets/background.png'
import LogoSVG from '@assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { setDataAPI } from '@services/api'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: Yup.string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos'),
  password_confirm: Yup.string()
    .required('Confirme a senha')
    .oneOf([Yup.ref('password')], 'A confirmação da senha não confere'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { handleUpdateDataUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const navigation = useNavigation()

  function handleLogin() {
    navigation.goBack()
  }

  async function handleSignUp(data: FormDataProps) {
    setIsLoading(true)

    const response = await setDataAPI({
      data,
      endpoint: '/users',
      setIsLoading,
    })

    if (response && typeof response === 'string') {
      setIsLoading(false)
      ToastAndroid.show(response, ToastAndroid.SHORT)

      return
    }

    const userDataResponse = await setDataAPI({
      endpoint: '/sessions',
      data: { email: data.email, password: data.password },
    })

    setIsLoading(false)
    handleUpdateDataUser({
      id: userDataResponse.user.id,
      name: userDataResponse.user.name,
      email: userDataResponse.user.email,
      avatar: userDataResponse.user.avatar,
    })
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
        <View className="items-center my-24 mb-10">
          <LogoSVG />
          <Text className="text-gray-100 text-sm">
            Treine sua mente e o seu corpo
          </Text>
        </View>
        <View className="items-center mb-6">
          <Text className="text-gray-100 font-roboto_bold text-xl">
            Crie sua conta
          </Text>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme a Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />

        <View className="mt-4">
          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </View>

        <View className="space-y-3 items-center mt-8">
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleLogin}
          />
        </View>
      </View>
    </ScrollView>
  )
}
