import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';

type Props = {
  navigation: any;
};

const FullnameScreen = (props: Props) => {
  const [first_name, setFirst_name] = React.useState('');
  const [last_name, setLast_name] = React.useState('');

  const handleRegister = () => {
    console.log('Register');
    props.navigation.navigate('Register', {first_name, last_name});
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
          Bạn tên gì?
        </Text>
        <Text className="text-start ml-4">Nhập tên bạn sử dụng hàng ngày</Text>
      </View>

      <View className="flex-[1] items-center justify-center ">
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Họ</Text>
        </View>
        <TextInput
          placeholder="Nhập họ của bạn"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={first_name}
          onChangeText={text => {
            setFirst_name(text);
          }}
        />
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start">Tên</Text>
        </View>
        <TextInput
          placeholder="Nhập tên của bạn"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={last_name}
          onChangeText={text => {
            setLast_name(text);
          }}
        />

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            handleRegister();
          }}>
          <Text className="text-white font-semibold text-center text-base">
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FullnameScreen;
