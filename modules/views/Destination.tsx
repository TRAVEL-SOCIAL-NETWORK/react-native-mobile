import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
type Props = {
  id: number;
  destination: string;
  city: string;
  user_id: number;
  time: string;
  description: string;
  like: number;
  tags: number;
  image: string;
  navigation: any;
};

const Destination = (props: Props) => {
  return (
    <View className="flex-1 flex-row items-start justify-around bg-white gap-2 mt-1.5 pb-2">
      <View className="flex flex-col items-start justify-between w-11/12">
        <View className="flex flex-row items-center justify-start w-full gap-2">
          <Text className="text-lg font-bold text-start text-black">
            {props.destination}
          </Text>
          <Text className="text-lg font-normal text-start text-black">tại</Text>
          <Text className="text-lg font-bold text-start text-black">
            {props.city}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2 mb-2">
          <Text className="text-sm text-start text-black">
            {props.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full max-h-60 mb-2">
          <Image
            source={require('../../assets/avatar.jpg')}
            width={24}
            height={24}
            className="w-full h-full rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-start w-full gap-4">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="flex items-center justify-center">
            <Image
              source={require('../../assets/heart.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
            <Text className="text-sm text-start text-black">
              {props.like} lượt thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="flex items-center justify-center">
            <Image
              source={require('../../assets/tag.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
            <Text className="text-sm mr-4 text-end text-black">
              {props.tags} lượt gắn thẻ
            </Text>
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center justify-end">
            <DateTime date={props.time} navigation={props.navigation} />
            <Image
              source={require('../../assets/avatar.jpg')}
              width={24}
              height={24}
              className="w-7 h-7 rounded-full"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Destination;
