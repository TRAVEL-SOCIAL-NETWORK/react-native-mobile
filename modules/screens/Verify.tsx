import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Verify: {
    email: string;
  };
};
type ScreenBRouteProp = RouteProp<RootStackParamList, 'Verify'>;

type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};

const VerifyScreen = (props: Props) => {
  const [otp, setOtp] = useState<number>();
  return (
    <View className="h-full bg-blue-50">
      <View className="w-full h-16 m-4 flex-row items-center justify-start">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text
          className="text-2xl pl-4 font-bold text-start text-black
        ">
          Xác thực tài khoản
        </Text>
      </View>
      <View className="flex-[1] items-center justify-center ">
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start m-4">
            Kiểm tra {props.route.params.email} để xác minh mã code
          </Text>
        </View>
        <TextInput
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          placeholder="Nhập mã code"
          onChangeText={text => {
            setOtp(parseInt(text));
          }}
          keyboardType="phone-pad"
        />
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start m-4 text-blue-500 font-semibold">
            Gửi lại mã
          </Text>
        </View>

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            props.navigation.navigate('Reset', {
              email: props.route.params.email,
              otp: otp,
            });
          }}>
          <Text className="text-white font-semibold text-center text-base">
            Tiếp tục
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-start w-5/6 gap-1 mt-8">
          <Text className="text-start m-4">
            Nếu bạn không tìm thấy mã code trong hộp thư, hãy kiểm tra thư mục
            spam. Nếu không tìm thấy , địa chỉ mail có thể không chính xác hoặc
            có thể không tồn tại tài khoản Travelolo tương ứng.
          </Text>
        </View>
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <Text className="text-start m-4 text-blue-500 font-semibold">
            Không thể truy cập email này?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;
