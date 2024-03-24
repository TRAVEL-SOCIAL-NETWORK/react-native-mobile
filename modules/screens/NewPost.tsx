import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Friend from '../views/Friend';
import apiInstance from '../../configs/apiInstance';
import store from '../../libs/redux/store';

type Props = {
  navigation: any;
};
const NewPost = (props: Props) => {
  const fullname =
    store.getState().auth.last_name + ' ' + store.getState().auth.first_name;
  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row items-center justify-between bg-white border-b-2 border-gray-200">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-300">
          <Image
            source={require('../../assets/close.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold m-4 text-start text-black">
          Tạo bài viết
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text className="text-xl font-bold m-4 text-start text-blue-500">
            Đăng
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-start m-4">
        <TouchableOpacity
          className="w-10 h-10 border border-gray-500 rounded-full border-2 border-gray-300"
          onPress={() => props.navigation.navigate('NewPost')}>
          <Image
            source={require('../../assets/avatar.png')}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('NewPost')}>
          <Text className="text-lg font-bold text-start text-black">
            {fullname}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPost;
