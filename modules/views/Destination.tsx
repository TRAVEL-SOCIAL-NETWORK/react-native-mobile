import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
import apiInstance from '../../configs/apiInstance';
import store from '../../libs/redux/store';
type Props = {
  id: string;
  destination: string;
  city: string;
  city_id: string;
  user_id: string;
  avatar: string;
  time: string;
  description: string;
  like: number;
  isLiked: boolean;
  tags: number;
  image: string;
  navigation: any;
};

const Destination = (props: Props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likeCount, setLikeCount] = useState(props.like);

  useEffect(() => {
    setIsLiked(props.isLiked);
    setLikeCount(props.like);
  }, [props.isLiked, props.like]);

  const handleLike = async () => {
    try {
      const response = await apiInstance.post('/favorite', {
        destination_id: props.id,
      });
      if (response.data.status_code === 200) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await apiInstance.delete('/favorite', {
        data: {
          destination_id: props.id,
        },
      });
      if (response.data.status_code === 200) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          onPress={() => {}}
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full max-h-60 mb-2">
          <Image
            source={
              props.image !== ''
                ? {uri: props.image}
                : require('../../assets/image.png')
            }
            width={24}
            height={24}
            className="w-full h-full rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-start w-full gap-4">
          <TouchableOpacity
            onPress={() => {
              if (isLiked) {
                handleUnlike();
              } else {
                handleLike();
              }
            }}
            className="flex items-center justify-center">
            <Image
              source={
                isLiked
                  ? require('../../assets/heart-red.png')
                  : require('../../assets/heart.png')
              }
              width={24}
              height={24}
              className="w-7 h-7"
            />
            <Text className="text-sm text-start text-black">
              {likeCount} lượt thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Search', {name: props.destination});
            }}
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
            <TouchableOpacity
              onPress={() => {
                if (props.user_id === store.getState().auth.id) {
                  props.navigation.navigate('Profile', {
                    user_id: props.user_id,
                  });
                } else {
                  props.navigation.navigate('ProfileUser', {
                    user_id: props.user_id,
                  });
                }
              }}
              className="rounded-full flex items-center justify-center">
              <Image
                source={
                  props.avatar !== ''
                    ? {uri: props.avatar}
                    : require('../../assets/avatar.png')
                }
                width={24}
                height={24}
                className="w-7 h-7 rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Destination;
