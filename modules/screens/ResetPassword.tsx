import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  OTP: {
    otp: number;
    email: string;
  };
};
type ScreenBRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};

const ResetPassword = (props: Props) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleResetPassword = async () => {
    console.log(props.route.params.email + props.route.params.otp + password);
    try {
      const response = await apiInstance.post('/auth/reset-password', {
        email: props.route.params.email,
        otp: props.route.params.otp,
        password: password,
      });
      if (response.data.statusCode === 200) {
        props.navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };
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
          Đặt lại mật khẩu
        </Text>
      </View>
      <View className="flex-[1] items-center justify-center ">
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Nhập mật khẩu mới của bạn </Text>
        </View>
        <TextInput
          placeholder="Mật khẩu mới"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-4 w-5/6"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Nhập lại mật khẩu mới </Text>
        </View>
        <TextInput
          placeholder="Nhập lại mật khẩu mới "
          className="text-base border-2 border-gray-300 rounded-md p-2 m-4 w-5/6"
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          secureTextEntry={true}
        />

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            handleResetPassword();
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
