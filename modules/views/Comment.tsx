import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import DateTime from './DateTime';
type Props = {
  id: number;
  user_id: string;
  name: string;
  avatar: string;
  content: string;
  time: string;
  navigation: any;
};

const Comment = (props: Props) => {
  return (
    <View className="flex flex-row items-center justify-between bg-white w-full">
      <View className="flex flex-row items-start justify-start gap-2">
        <TouchableOpacity
          onPress={() => {}}
          className="rounded-full flex items-center justify-center  border-2 border-gray-300">
          <Image
            source={
              props.avatar !== ''
                ? {uri: props.avatar}
                : require('../../assets/avatar.png')
            }
            width={16}
            height={16}
            className="w-4 h-4 rounded-full"
          />
        </TouchableOpacity>
        <View className="flex flex-col items-start justify-center">
          <View className="flex flex-col items-start justify-center p-2 bg-gray-100 rounded-xl">
            <Text className="text-lg font-bold text-start text-black">
              {props.name}
            </Text>
            <Text className="text-sm text-start text-black">
              {props.content}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center pt-1 pl-1">
            <DateTime date={props.time} navigation={props.navigation} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text className="text-xs mr-4 text-end text-black font-bold">
                Phản hồi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;
