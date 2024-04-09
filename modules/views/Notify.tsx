import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import DateTime from './DateTime';
type Props = {
  id: string;
  post_id: string;
  user_id: string;
  name: string;
  avatar: string;
  content: string;
  time: string;
  seen: boolean;
  type: string;
  navigation: any;
};

const Notify = (props: Props) => {
  const [post, setPost] = React.useState<any>({});
  const [seen, setSeen] = React.useState<boolean>(props.seen);

  const fetchPost = async () => {
    try {
      const res = await apiInstance.put(`/notify/${props.id}`);
      if (res.status !== 200) {
        throw new Error('Error');
      }
      setSeen(true);
      const response = await apiInstance.get(`/posts/${props.post_id}`);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      const post = await response.data.data;
      setPost(response.data.data);
      await props.navigation.navigate('Post', {
        post_id: post._id,
        name: post.full_name,
        avatar: post.avatar !== undefined ? post.image : '',
        user_id: post.user_id,
        time: post.created_at,
        content: post.content,
        like: post.likes_count,
        isLike: post.is_liked,
        comment: post.comments_count,
        image: post.image,
        privacy: post.privacy,
        destination: post.travel_destination,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        fetchPost();
      }}
      className={
        seen
          ? 'flex flex-row items-center justify-evenly bg-gray-100 w-11/12 p-2 border-2 border-gray-200 rounded-xl mt-2'
          : 'flex flex-row items-center justify-evenly bg-blue-100 w-11/12 p-2 border-2 border-blue-200 rounded-xl mt-2'
      }>
      <TouchableOpacity
        onPress={() => {
          fetchPost();
        }}
        className="rounded-full flex items-center justify-center border-2 border-gray-300">
        <Image
          source={
            props.avatar !== undefined
              ? {uri: props.avatar}
              : require('../../assets/avatar.png')
          }
          width={16}
          height={16}
          className="w-12 h-12 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex flex-col items-start justify-center w-3/4">
        <View className="flex flex-col items-start justify-center rounded-xl">
          <Text className="text-lg font-bold text-start text-black">
            {props.name}{' '}
            <Text className="text-sm text-start text-black font-normal">
              đã bình luận về một địa đải du lịch trong bài viết:{' '}
              <Text className="text-sm text-start text-black font-bold">
                {props.content.length > 40
                  ? props.content.slice(0, 40) + '...'
                  : props.content}
              </Text>
            </Text>
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center">
          <DateTime date={props.time} navigation={props.navigation} />
          <TouchableOpacity
            onPress={() => {
              fetchPost();
            }}>
            <Text className="text-xs mr-4 text-end text-black font-bold">
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notify;
