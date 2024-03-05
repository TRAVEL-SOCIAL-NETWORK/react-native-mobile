import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import store from '../../libs/redux/store';

type Props = {
  navigation: any;
};

const HomeScreen = (props: Props) => {
  const {avatar, first_name} = store.getState().auth;
  return (
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between ml-2 mr-2 bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-blue-400">
            travelolo
          </Text>
        </View>

        <View className="flex flex-row items-center justify-center gap-2">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/add.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/message.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between ml-4 mr-2 bg-white">
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            className="w-10 h-10 border border-gray-500 rounded-full"
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Image
              source={avatar || require('../../assets/avatar.jpg')}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Text className="text-center m-4 font-semibold">
              Chia sẻ chuyến du lịch của {first_name}?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full flex items-center justify-center">
            <Image
              source={require('../../assets/image.png')}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
