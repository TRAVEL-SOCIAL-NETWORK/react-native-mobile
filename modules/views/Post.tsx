import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
type Props = {
  id: number;
  name: string;
  avatar: string;
  user_id: number;
  time: string;
  status: string;
  like: number;
  comment: number;
  image: Array<string>;
  navigation: any;
};

const Post = (props: Props) => {
  return (
    <View className="flex-1 flex-row items-start justify-around bg-white gap-2 mt-1.5 pb-2">
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        className="rounded-full flex items-center justify-center pl-2">
        <Image
          source={props.avatar || require('../../assets/avatar.jpg')}
          width={10}
          height={10}
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-start justify-between w-10/12 mr-2">
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-lg font-bold text-start text-black">
            {props.name}
          </Text>
          <DateTime date={props.time} navigation={props.navigation} />
        </View>
        <View className="flex-1 flex-row items-center justify-between gap-2">
          <Text className="text-sm text-start text-black">{props.status}</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full h-40 mb-2">
          <Image
            source={require('../../assets/avatar.jpg')}
            width={24}
            height={24}
            className="w-full h-40 rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 flex items-center justify-center">
            <Image
              source={require('../../assets/heart.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 flex items-center justify-center">
            <Image
              source={require('../../assets/comment.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 flex items-center justify-center">
            <Image
              source={require('../../assets/address.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 flex items-center justify-center">
            <Image
              source={require('../../assets/share.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-sm text-start text-black">
            {props.like} lượt thích
          </Text>
          <Text className="text-sm mr-4 text-end text-black">
            {props.comment} bình luận
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          className="h-9 flex flex-row items-center justify-start w-full gap-2 mt-2">
          <Image
            source={require('../../assets/avatar.jpg')}
            width={24}
            height={24}
            className="w-7 h-7 rounded-full"
          />
          <TextInput
            className="h-full rounded-full flex items-center justify-center w-10/12 pl-2 text-sm"
            placeholder="Thêm bình luận..."
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
