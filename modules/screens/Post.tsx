import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import store from '../../libs/redux/store';
import apiInstance from '../../configs/apiInstance';
import {RouteProp} from '@react-navigation/native';
import DateTime from '../views/DateTime';
import Comment from '../views/Comment';

type RootStackParamList = {
  Post: {
    post_id: string;
    name: string;
    avatar: string;
    user_id: string;
    time: string;
    content: string;
    like: number;
    isLike: boolean;
    comment: number;
    image: string;
    destination: string;
  };
};

type ScreenBRouteProp = RouteProp<RootStackParamList, 'Post'>;

type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};

const PostScreen = (props: Props) => {
  const [textComment, setTextComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);
  const [commentId, setCommentId] = useState('');
  const {
    post_id,
    name,
    avatar,
    user_id,
    time,
    content,
    like,
    isLike,
    comment,
    image,
    destination,
  } = props.route.params;
  useEffect(() => {
    fetchCommentPost();
  }, []);

  const fetchCommentPost = async () => {
    try {
      const response = await apiInstance.get(`/comments/${post_id}`);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setComments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [isLiked, setIsLiked] = React.useState(isLike);
  const [cmtCount, setCmtCount] = React.useState(comment);
  const [likeCount, setLikeCount] = React.useState(like);
  const [isReply, setIsReply] = React.useState(false);
  const [replyId, setReplyId] = React.useState('');
  const [replyName, setReplyName] = React.useState('');

  const handleLike = async () => {
    try {
      const response = await apiInstance.post('/reaction/like', {
        post_id: post_id,
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
          post_id: post_id,
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
      let body;
      if (isReply) {
        body = {
          parent_comment: replyId,
          post_id: post_id,
          content: content,
        };
      } else {
        body = {
          post_id: post_id,
          content: content,
        };
      }
      console.log(body);
      const response = await apiInstance.post('/comments', body);
      if (response.data.status_code === 200) {
        setCmtCount(cmtCount + 1);
        setTextComment('');
        fetchCommentPost();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReply = async (comment_id: string, page: number) => {
    try {
      const response = await apiInstance.get(`/replies/${comment_id}`, {
        params: {
          page,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setReplies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 flex-col items-start justify-center bg-white">
      <View className="flex flex-row items-center justify-between bg-white w-full p-2 h-20">
        <View className="flex flex-row items-center justify-evenly bg-white gap-2">
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            className="w-8 h-8 rounded-full flex items-center justify-center">
            <Image
              source={require('../../assets/back.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Info', {user_id: user_id})
            }
            className="rounded-full flex items-center justify-center border-2 border-gray-300">
            <Image
              source={avatar || require('../../assets/avatar.png')}
              width={10}
              height={10}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
          <View className="flex flex-col items-start justify-center">
            <Text className="text-lg font-bold text-start text-black">
              {name}
            </Text>
            <View className="flex flex-row items-center justify-center">
              <DateTime date={time} navigation={props.navigation} />
              <Image
                source={require('../../assets/earth.png')}
                className="w-3 h-3"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="w-8 h-8 rounded-full flex items-center justify-center">
          <Image
            source={require('../../assets/menu-dot.png')}
            width={24}
            height={24}
            className="w-4 h-4"
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-col items-start justify-between w-full pr-2 pl-2">
          <View className="flex flex-row items-center justify-between gap-2 pb-2">
            <Text className="text-sm text-start text-black">{content}</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="rounded-lg bg-gray-300 flex items-center justify-center w-full h-40 mb-2">
            <Image
              source={
                image !== '' ? {uri: image} : require('../../assets/avatar.png')
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
                  {destination}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row items-center justify-between w-full pb-2">
            <Text className="text-sm text-start text-black">
              {likeCount} lượt thích
            </Text>
            <Text className="text-sm mr-4 text-end text-black">
              {cmtCount} bình luận
            </Text>
          </View>
          {comments.length > 0 ? (
            comments.map((item, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-col items-center justify-between bg-white w-full">
                  <View className="flex flex-row items-start justify-start gap-2  w-full">
                    <TouchableOpacity
                      onPress={() => {}}
                      className="rounded-full flex items-center justify-center  border-2 border-gray-300">
                      <Image
                        source={
                          item.avatar !== undefined
                            ? {uri: item.avatar}
                            : require('../../assets/avatar.png')
                        }
                        width={16}
                        height={16}
                        className="w-8 h-8 rounded-full"
                      />
                    </TouchableOpacity>
                    <View className="flex flex-col items-start justify-center">
                      <View className="flex flex-col items-start justify-center p-2 bg-gray-100 rounded-xl">
                        <Text className="text-lg font-bold text-start text-black">
                          {item.full_name}
                        </Text>
                        <Text className="text-sm text-start text-black">
                          {item.content}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center justify-center pt-1 pl-1">
                        <DateTime
                          date={item.created_at}
                          navigation={item.navigation}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setIsReply(true);
                            setReplyId(item._id);
                            setReplyName(item.full_name);
                          }}>
                          <Text className="text-xs mr-4 text-end text-black font-bold">
                            Phản hồi
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {replies.length > 0 && item._id === commentId
                    ? replies.map((item, index) => {
                        return (
                          <View
                            key={index}
                            className="flex flex-row items-start justify-start w-full p-2 ml-16">
                            <TouchableOpacity
                              onPress={() => {
                                handleReply(item._id, 1);
                              }}
                              className="flex flex-row items-center justify-start gap-1">
                              <Image
                                source={
                                  item.user_id.avatar !== undefined
                                    ? {uri: item.user_id.avatar}
                                    : require('../../assets/avatar.png')
                                }
                                className="w-4 h-4 rounded-full"
                              />
                            </TouchableOpacity>
                            <View className="flex flex-col items-start justify-center pl-2">
                              <View className="flex flex-col items-start justify-center p-2 bg-gray-100 rounded-xl">
                                <Text className="text-xs font-bold text-start text-black">
                                  {item.user_id.first_name +
                                    ' ' +
                                    item.user_id.last_name}
                                </Text>
                                <Text className="text-xs text-start text-black">
                                  {item.content}
                                </Text>
                              </View>
                              <View className="flex flex-row items-center justify-center pt-1 pl-1">
                                <DateTime
                                  date={item.created_at}
                                  navigation={item.navigation}
                                />
                                <TouchableOpacity
                                  onPress={() => {
                                    setIsReply(true);
                                    setReplyId(item._id);
                                    setReplyName(item.full_name);
                                  }}>
                                  <Text className="text-xs mr-4 text-end text-black font-bold">
                                    Phản hồi
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        );
                      })
                    : null}

                  {item.replies_count > 0 ? (
                    <View className="flex flex-row items-start justify-start w-full p-2 ml-16">
                      <TouchableOpacity
                        onPress={() => {
                          setCommentId(item._id);
                          handleReply(item._id, 1);
                        }}
                        className="flex flex-row items-center justify-start gap-1">
                        <Image
                          source={
                            item.replies_avatar !== undefined
                              ? {uri: item.replies_avatar}
                              : require('../../assets/avatar.png')
                          }
                          className="w-4 h-4 rounded-full"
                        />
                        <Text className="text-xs text-black font-bold">
                          {item.replies_name}
                        </Text>
                        <Text className="text-xs text-black">đã trả lời</Text>
                        <Text className="text-xs text-black">
                          {item.replies_count} phản hồi
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                // <Comment
                //   key={item._id}
                //   id={item._id}
                //   user_id={item.user_id._id}
                //   name={item.user_id.first_name + ' ' + item.user_id.last_name}
                //   avatar={
                //     item.user_id.avatar !== undefined ? item.user_id.avatar : ''
                //   }
                //   content={item.content}
                //   time={item.created_at}
                //   navigation={props.navigation}
                // />
              );
            })
          ) : (
            <View className="flex flex-row items-center justify-center">
              <Text>Chưa có bình luận nào</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View className="flex flex-col items-start justify-start w-full bg-white pt-2 border-t-2 border-gray-100">
        {isReply ? (
          <View className="flex flex-row items-center justify-center gap-1 w-full bg-white pb-1">
            <Text className="text-xs font-normal  text-start text-black">
              Đang trả lời
            </Text>
            <Text className="text-xs font-bold text-start text-black">
              {replyName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsReply(false);
                setReplyId('');
                setReplyName('');
              }}
              className=" rounded-full flex items-center justify-center">
              <Text className="text-xs font-semibold text-start text-black">
                - Hủy
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View className="h-9 flex flex-row items-center justify-start w-full gap-2 mb-4 ml-2">
          <TouchableOpacity
            onPress={() => {}}
            className="border-2 border-gray-300 rounded-full flex items-center justify-center w-8 h-8">
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
          </TouchableOpacity>

          <TextInput
            placeholder="Viết bình luận..."
            className="w-3/4 rounded-full bg-gray-100 p-1"
            value={textComment}
            onChangeText={text => {
              setTextComment(text);
            }}
            onSubmitEditing={e => {
              if (e.nativeEvent.text.trim().length > 0) {
                setTextComment(e.nativeEvent.text);
                handleComment(textComment);
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleComment(textComment);
            }}
            className="w-8 h-8 flex items-center justify-center">
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

export default PostScreen;
