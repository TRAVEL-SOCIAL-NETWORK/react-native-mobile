import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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
  return (
    <View className="flex-1 flex-row items-center justify-around bg-white pb-2 gap-2">
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        className="w-3/8 h-20 rounded-full flex items-center justify-center">
        <Image
          source={props.avatar || require('../../assets/avatar.jpg')}
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
          <Text className="text-sm mr-4 text-end text-black">{props.time}</Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          {isFriend ? null : (
            <TouchableOpacity
              className="bg-blue-500 flex-1 rounded-lg"
              onPress={() => {
                setIsFriend(true);
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
              {isFriend ? 'Chúng ta đã là bạn bè' : 'Xoá bạn bè'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Friendship;
