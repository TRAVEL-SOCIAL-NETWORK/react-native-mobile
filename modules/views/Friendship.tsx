import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import DateTime from './DateTime';
type Props = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  request: boolean;
  navigation: any;
};

const Friendship = (props: Props) => {
  const [isFriend, setIsFriend] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);
  const handleRequest = async () => {
    try {
      let response;
      if (props.request) {
        response = await apiInstance.post('/friendship/accept-friendship', {
          from: props.id,
        });
        setIsFriend(true);
      } else {
        response = await apiInstance.post('/friendship/request-friendship', {
          to: props.id,
        });
        setIsRequest(true);
      }
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
          source={props.avatar || require('../../assets/avatar.png')}
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
          {props.request ? (
            <DateTime date={props.time} navigation={props.navigation} />
          ) : null}
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          {isFriend ? null : (
            <TouchableOpacity
              className="bg-blue-500 flex-1 rounded-lg"
              onPress={() => {
                handleRequest();
              }}>
              <Text className="text-base font-medium m-2 text-white text-center">
                {props.request ? 'Xác nhận' : 'Thêm bạn bè'}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-gray-200 flex-1 rounded-lg"
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Text className="text-base font-medium m-2 text-black text-center">
              {isFriend ? 'Chúng ta đã là bạn bè' : 'Xoá'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Friendship;
