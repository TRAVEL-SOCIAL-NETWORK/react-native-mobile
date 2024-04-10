import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTime from './DateTime';
import store from '../../libs/redux/store';
import apiInstance from '../../configs/apiInstance';
import Modal from 'react-native-modal';

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
  privacy: string;
  navigation: any;
};

const Post = (props: Props) => {
  const [isLiked, setIsLiked] = useState(props.isLike);
  const [cmtCount, setCmtCount] = useState(props.comment);
  const [likeCount, setLikeCount] = useState(props.like);
  const [privacy, setPrivacy] = useState(props.privacy);
  const [comment, setComment] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
  const handleUpdatePrivacy = async (privacy: string) => {
    try {
      const response = await apiInstance.put(`/posts/privacy/${props.id}`, {
        privacy: privacy,
      });

      if (response.data.status_code === 200) {
        setPrivacy(privacy);
        toggleModal();
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
          <View className="flex flex-row items-center justify-start">
            <DateTime date={props.time} navigation={props.navigation} />
            <TouchableOpacity
              onPress={() => toggleModal()}
              className="rounded-full flex items-center justify-center">
              {privacy === 'public' ? null : (
                <Image
                  source={require('../../assets/private.png')}
                  width={24}
                  height={24}
                  className="w-3 h-3"
                />
              )}
            </TouchableOpacity>
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={toggleModal}
              className="m-1">
              <View className="w-full  bg-white rounded-lg p-4">
                <Text className="text-lg font-bold text-start text-black">
                  Ai có thể xem bài viết của bạn?
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bài viết của bạn có thể hiển thị trên News Feed, trên trang cá
                  nhân và trên các dịch vụ khác trên Travelolo
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn có thể thay đổi ai có thể xem bài viết của bạn bất cứ lúc
                  nào
                </Text>
                <Text className="text-lg font-bold text-start text-black pb-2">
                  Chọn đối tượng
                </Text>
                <TouchableOpacity
                  onPress={() => handleUpdatePrivacy('public')}
                  className="flex flex-row items-center gap-2">
                  <Image
                    source={require('../../assets/earth.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View className="w-full">
                    <Text className="text-normal font-bold ">Công khai</Text>
                    <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                      Mọi người có thể xem bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleUpdatePrivacy('private')}
                  className={
                    privacy === 'private'
                      ? 'flex flex-row items-center gap-2 bg-gray-200 rounded-lg'
                      : 'flex flex-row items-center gap-2'
                  }>
                  <Image
                    source={require('../../assets/private.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View className="w-full">
                    <Text className="text-normal font-bold ">Riêng tư</Text>
                    <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                      Chỉ bạn và một số người được chọn có thể xem bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
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
              privacy: props.privacy,
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
        <View className="h-9 flex flex-row items-center justify-start w-full gap-2 mt-2">
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
            className="h-full rounded-full flex items-center justify-center w-3/4 pl-2 text-sm"
            placeholder="Thêm bình luận..."
            value={comment}
            onChangeText={text => {
              setComment(text);
            }}
            onSubmitEditing={e => {
              if (e.nativeEvent.text.trim().length > 0) {
                handleComment(e.nativeEvent.text);
                setComment('');
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (comment.trim().length > 0) {
                handleComment(comment);
                setComment('');
              }
            }}
            className=" flex items-center justify-center">
            <Image
              source={require('../../assets/send.png')}
              width={24}
              height={24}
              className="w-7 h-7"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;
