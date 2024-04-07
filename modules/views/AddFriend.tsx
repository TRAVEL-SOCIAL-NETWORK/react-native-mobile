import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
type Props = {
  id: number;
  name: string;
  avatar: string;
  navigation: any;
};

const AddFriend = (props: Props) => {
  const [isRequest, setIsRequest] = React.useState(false);
  const handleRequest = async () => {
    try {
      const response = await apiInstance.post(
        '/friendship/request-friendship',
        {
          to: props.id,
        },
      );
      setIsRequest(true);

      if (response.status !== 200) {
        throw new Error('Error');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await apiInstance.delete(
        '/friendship/cancel-friendship',
        {
          data: {
            to: props.id,
          },
        },
      );
      setIsRequest(false);

      if (response.status !== 200) {
        throw new Error('Error');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex-1 flex-row items-center justify-around bg-white pb-2 gap-2">
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        className="rounded-full flex items-center justify-center border-2 border-gray-300">
        <Image
          source={
            props.avatar !== ''
              ? {uri: props.avatar}
              : require('../../assets/avatar.png')
          }
          width={20}
          height={20}
          className="w-20 h-20 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-start justify-between w-8/12">
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-lg font-bold text-start text-black">
            {props.name}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          {isRequest ? (
            <TouchableOpacity
              className="bg-gray-300 flex-1 rounded-lg"
              onPress={() => {
                handleCancelRequest();
              }}>
              <Text className="text-base font-bold m-2 text-black text-center">
                Huỷ
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-blue-100 flex-1 rounded-lg"
              onPress={() => {
                handleRequest();
              }}>
              <Text className="text-base font-bold m-2 text-blue-500 text-center">
                Thêm bạn bè
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddFriend;
