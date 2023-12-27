import { View, Image, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'
import LogoSVG from '@assets/logo.svg'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
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

        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />

        <Button title="Acessar" />

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
