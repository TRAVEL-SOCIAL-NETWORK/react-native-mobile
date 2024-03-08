import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Friendship from '../views/Friendship';

type Props = {
  navigation: any;
};
const Friends = (props: Props) => {
  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: require('../../assets/avatar.jpg'),
      time: '1 giờ trước',
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: require('../../assets/avatar.jpg'),
      time: '2 giờ trước',
    },
    {
      id: 3,
      name: 'Nguyễn Văn C',
      avatar: require('../../assets/avatar.jpg'),
      time: '3 giờ trước',
    },
    {
      id: 4,
      name: 'Nguyễn Văn D',
      avatar: require('../../assets/avatar.jpg'),
      time: '4 giờ trước',
    },
    {
      id: 5,
      name: 'Nguyễn Văn E',
      avatar: require('../../assets/avatar.jpg'),
      time: '5 giờ trước',
    },
  ];
  return (
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Bạn bè
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full flex items-center justify-center m-4">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="flex flex-row items-center justify-between pl-4 pr-2 bg-white">
          <View className="flex flex-row items-center justify-center gap-4 mb-4">
            <TouchableOpacity
              className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
              onPress={() => props.navigation.navigate('FindAccount')}>
              <Text className="text-xs font-bold text-center text-black">
                Gợi ý
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
              onPress={() => props.navigation.navigate('FindAccount')}>
              <Text className="text-xs font-bold text-center text-black">
                Bạn bè
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between pl-4 pr-4 pt-2 bg-white mt-1">
          <View className="flex flex-row items-center justify-center gap-4 mb-2">
            <Text className="text-xl font-bold text-center text-black">
              Lời mời kết bạn
            </Text>
          </View>
          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-4 mb-2"
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Text className="text-m font-bold text-center text-blue-400">
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        {data.map((item, index) => {
          return (
            <Friendship
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              time={item.time}
              request={true}
              navigation={props.navigation}
            />
          );
        })}
        <View className="flex flex-row items-center justify-between pl-4 pr-4 pt-2 bg-white mt-1">
          <View className="flex flex-row items-center justify-center gap-4 mb-2">
            <Text className="text-xl font-bold text-center text-black">
              Những người bạn có thể biết
            </Text>
          </View>
        </View>
        {data.map((item, index) => {
          return (
            <Friendship
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              time={item.time}
              request={false}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Friends;
