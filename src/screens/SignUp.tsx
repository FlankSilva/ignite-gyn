import { View, Image, Text, ScrollView } from 'react-native'

import BackgroundImg from '@assets/background.png'
import LogoSVG from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation()

  function handleLogin() {
    navigation.goBack()
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
        <View className="items-center mb-6">
          <Text className="text-gray-100 font-roboto_bold text-xl">
            Crie sua conta
          </Text>
        </View>

        <Input placeholder="Nome" />
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />

        <Button title="Criar e acessar" />

        <View className="space-y-3 items-center   mt-24">
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
