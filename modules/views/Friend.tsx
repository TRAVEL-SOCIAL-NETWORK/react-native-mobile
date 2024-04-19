import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import store from '../../libs/redux/store';
type Props = {
  id: string;
  name: string;
  avatar: string;
  navigation: any;
};

const Friend = (props: Props) => {
  const [isFriend, setIsFriend] = React.useState(false);
  const handleCancel = async () => {
    try {
      const response = await apiInstance.post(
        '/friendship/request-friendship',
        {
          to: props.id,
        },
      );
      setIsFriend(true);

      if (response.status !== 200) {
        throw new Error('Error');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="flex-1 flex-row items-center justify-between bg-white gap-2">
      <View className="flex-1 flex-row items-center justify-start gap-2">
        <TouchableOpacity
          onPress={() => {
            if (props.id === store.getState().auth.id) {
              props.navigation.navigate('Profile', {user_id: props.id});
            } else {
              props.navigation.navigate('ProfileUser', {user_id: props.id});
            }
          }}
          className="rounded-full flex items-center justify-center  border-2 border-gray-300">
          <Image
            source={
              props.avatar !== ''
                ? {uri: props.avatar}
                : require('../../assets/avatar.png')
            }
            width={16}
            height={16}
            className="w-16 h-16 rounded-full"
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-start text-black pl-2">
          {props.name}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          className="w-8 h-8 rounded-full flex items-center justify-center m-4">
          <Image
            source={require('../../assets/menu-dot.png')}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Friend;
