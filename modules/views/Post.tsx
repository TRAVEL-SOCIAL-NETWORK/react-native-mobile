import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
import store from '../../libs/redux/store';
import apiInstance from '../../configs/apiInstance';
type Props = {
  id: string;
  name: string;
  avatar: any;
  user_id: number;
  time: string;
  status: string;
  like: number;
  isLike: boolean;
  comment: number;
  image: string;
  destination: string;
  navigation: any;
};

const Post = (props: Props) => {
  const [isLiked, setIsLiked] = React.useState(props.isLike);
  const [cmtCount, setCmtCount] = React.useState(props.comment);
  const [likeCount, setLikeCount] = React.useState(props.like);
  const handleLike = async () => {
    try {
      const response = await apiInstance.post('/reaction/like', {
        post_id: props.id,
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
      const response = await apiInstance.delete('/reaction/like', {
        data: {
          post_id: props.id,
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
  const handleComment = async (content: string) => {
    try {
      const response = await apiInstance.post('/comments', {
        post_id: props.id,
        content: content,
      });
      if (response.data.status_code === 200) {
        setCmtCount(cmtCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 flex-row items-start justify-around bg-white gap-2 mt-1.5 pb-2 pl-2">
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        className="rounded-full flex items-center justify-center ml-2 border-2 border-gray-300">
        <Image
          source={props.avatar || require('../../assets/avatar.png')}
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
          onPress={() =>
            props.navigation.navigate('Post', {
              post_id: props.id,
              name: props.name,
              avatar: props.avatar,
              user_id: props.user_id,
              time: props.time,
              content: props.status,
              like: likeCount,
              isLike: isLiked,
              comment: cmtCount,
              image: props.image,
              destination: props.destination,
            })
          }
          className="rounded-lg bg-gray-300 flex items-center justify-center w-full h-40 mb-2">
          <Image
            source={
              props.image !== ''
                ? {uri: props.image}
                : require('../../assets/avatar.png')
            }
            width={24}
            height={24}
            className="w-full h-40 rounded-lg"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-between w-full">
          <View className="flex flex-row items-center justify-start gap-2">
            <TouchableOpacity
              onPress={() => {
                if (isLiked) {
                  handleUnlike();
                } else {
                  handleLike();
                }
              }}
              className="w-8 h-8 flex items-center justify-center">
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
                source={require('../../assets/share.png')}
                width={24}
                height={24}
                className="w-7 h-7"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="w-8 h-8 flex items-center justify-center">
              <Image
                source={require('../../assets/address.png')}
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="h-8 flex items-end justify-center">
              <Text className="text-sm text-black font-bold text-end">
                {props.destination}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-sm text-start text-black">
            {likeCount} lượt thích
          </Text>
          <Text className="text-sm mr-4 text-end text-black">
            {cmtCount} bình luận
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          className="h-9 flex flex-row items-center justify-start w-full gap-2 mt-2">
          <Image
            source={
              store.getState().auth.avatar !== ''
                ? {uri: store.getState().auth.avatar}
                : require('../../assets/avatar.png')
            }
            width={24}
            height={24}
            className="w-7 h-7 rounded-full"
          />
          <TextInput
            className="h-full rounded-full flex items-center justify-center w-10/12 pl-2 text-sm"
            placeholder="Thêm bình luận..."
            onSubmitEditing={e => {
              if (e.nativeEvent.text.trim().length > 0) {
                handleComment(e.nativeEvent.text);
              }
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;
