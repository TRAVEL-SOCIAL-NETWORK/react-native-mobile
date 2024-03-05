import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
type Props = {
  navigation: any;
};

const ResetPassword = (props: Props) => {
  const [email, setEmail] = React.useState('');

  return (
    <View className="h-full bg-blue-50">
      <View className="w-full h-16 m-4">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text
          className="text-2xl font-bold m-4 text-start text-black
        ">
          Quên mật khẩu
        </Text>
      </View>
      <View className="flex-[1] items-center justify-center ">
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Nhập mật khẩu mới của bạn </Text>
        </View>
        <TextInput
          placeholder="Mật khẩu mới"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-4 w-5/6"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          secureTextEntry={true}
        />
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Nhập lại mật khẩu mới </Text>
        </View>
        <TextInput
          placeholder="Nhập lại mật khẩu mới "
          className="text-base border-2 border-gray-300 rounded-md p-2 m-4 w-5/6"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          secureTextEntry={true}
        />

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text className="text-white font-semibold text-center text-base">
            Thay đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
