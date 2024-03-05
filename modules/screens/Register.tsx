import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import apiInstance from '../../configs/apiInstance';

type Props = {
  navigation: any;
  route: any;
};

const RegisterScreen = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const {first_name, last_name} = props.route.params;
  console.log(first_name, last_name);

  const handleRegister = async () => {
    try {
      const response = await apiInstance.post('/auth/register', {
        phone: phone,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      });
      console.log(response.data);
      if (response.data.status_code === 200) {
        props.navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="h-full bg-blue-50">
      <View className="w-full h-16 m-4">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text className="text-2xl font-bold ml-2 text-start text-black">
            {'<'}
          </Text>
        </TouchableOpacity>
        <Text
          className="text-2xl font-bold ml-4 text-start text-black
        ">
          Đăng ký
        </Text>
      </View>

      <View className="flex-[1] items-center justify-center mt-16">
        <TextInput
          placeholder="Email"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Mật khẩu"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Số di dộng"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={phone}
          onChangeText={text => {
            setPhone(text);
          }}
          keyboardType='phone-pad'
        />

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            handleRegister();
          }}>
          <Text className="text-white font-semibold text-center text-base">
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>

        <Text className="text-center m-4">
          Bạn da có tài khoản chưa? Đăng nhập ngay
        </Text>
        <TouchableOpacity
          className="bg-white px-4 py-2 rounded-3xl w-5/6 border-2 border-blue-400 mt-16"
          onPress={() => props.navigation.navigate('Login')}>
          <Text className="text-blue-500 font-semibold text-center text-base">
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RegisterScreen;
