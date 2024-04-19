import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import store from '../../libs/redux/store';
import Post from '../views/Post';
import apiInstance from '../../configs/apiInstance';
import Modal from 'react-native-modal';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  User: {
    user_id: string;
  };
};

type ScreenBRouteProp = RouteProp<RootStackParamList, 'User'>;

type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};
const ProfileUser = (props: Props) => {
  const [tabPost, setTabPost] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>({});
  const [friends, setFriends] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
    fetchProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await apiInstance.get(
        `/user/profile/${props.route.params.user_id}`,
      );
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setProfile(response.data.data);
      setFriends(response.data.data.friends_new);
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(
        `/posts/user/${props.route.params.user_id}`,
        {
          params: {
            page,
          },
        },
      );
      console.log('loadingpost');
      if (page === 1) {
        setData(response.data.data);
      } else {
        setData([...data, ...response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom) {
      setPage(page + 1);
    }
  };

  const handleRequest = async () => {
    try {
      const response = await apiInstance.post(
        '/friendship/request-friendship',
        {
          to: props.route.params.user_id,
        },
      );
      if (response.status !== 200) {
        throw new Error('Error');
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await apiInstance.post('/friendship/accept-friendship', {
        from: store.getState().auth.id,
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiInstance.post('/friendship/reject-friendship', {
        from: store.getState().auth.id,
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="h-full bg-blue-50">
      <View className="flex flex-row items-center justify-between bg-white pr-4 pl-2">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-4">
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Search', {name: profile.full_name})
            }
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex flex-col items-center justify-center static">
          <TouchableOpacity className="rounded-full">
            <Image
              source={
                profile.background !== undefined
                  ? {uri: profile.background}
                  : require('../../assets/background.jpg')
              }
              className="h-40 rounded-full opacity-50"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full absolute top-28 border-2 border-gray-300"
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Image
              source={
                profile.avatar !== undefined
                  ? {uri: profile.avatar}
                  : require('../../assets/avatar.png')
              }
              className="w-40 h-40 rounded-full"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center justify-center pt-32">
          <Text className="text-center font-bold text-xl">
            {profile.full_name}
          </Text>
          <Text className="text-center font-normal">
            {profile.friends_count} bạn bè
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center pt-2 gap-2 pl-4 pr-4">
          <TouchableOpacity
            className="flex items-center justify-center bg-blue-500 rounded-lg p-3 w-full"
            onPress={() => {
              if (profile.is_friend === 'accepted') {
                handleDelete();
              } else if (profile.is_friend === 'pending') {
                handleAccept();
              } else {
                handleRequest();
              }
            }}>
            <Text className="text-center font-semibold text-white">
              {profile.is_friend === 'accepted'
                ? 'Hiện đang là bạn bè'
                : profile.is_friend === 'pending'
                ? 'Đang chờ xác nhận'
                : '+ Thêm bạn bè'}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-between pt-2 w-full">
            <TouchableOpacity
              className="flex items-center justify-center bg-gray-300 rounded-lg p-3 w-5/6"
              onPress={() =>
                props.navigation.navigate('Report', {
                  user_id: props.route.params.user_id,
                })
              }>
              <Text className="text-center font-semibold text-black">
                Báo cáo người dùng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-center bg-gray-300 rounded-lg p-3"
              onPress={() => props.navigation.navigate('Profile')}>
              <Image
                source={require('../../assets/menu-dot.png')}
                className="w-5 h-5"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-start gap-4 mt-2 pl-2 pb-2 bg-white">
          <TouchableOpacity
            className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
            onPress={() => {
              setTabPost(true);
            }}>
            <Text className="text-xs font-bold text-center text-black">
              Bài viết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
            onPress={() => {
              setTabPost(false);
            }}>
            <Text className="text-xs font-bold text-center text-black">
              Ảnh
            </Text>
          </TouchableOpacity>
        </View>
        {tabPost ? (
          <View className="flex flex-col items-center justify-center mt-2 pl-3 pr-3 gap-2 bg-white">
            <View className="flex flex-row items-center justify-between w-full mb-2 border-t-2 border-gray-200">
              <Text className="text-lg font-bold text-center text-black">
                Chi tiết
              </Text>
            </View>
            {profile.work === '' || profile.work === undefined ? null : (
              <View className="flex flex-row items-center justify-start gap-2 w-full">
                <Image
                  source={require('../../assets/work.png')}
                  className="w-5 h-5 opacity-50"
                />
                <Text className="text-base font-normal text-center text-black">
                  {profile.work}
                </Text>
              </View>
            )}
            {profile.study === '' || profile.study === undefined ? null : (
              <View className="flex flex-row items-center justify-start gap-2 w-full">
                <Image
                  source={require('../../assets/school.png')}
                  className="w-5 h-5 opacity-50"
                />
                <Text className="text-base font-normal text-center text-black">
                  {profile.study}
                </Text>
              </View>
            )}
            {profile.hobby === '' || profile.hobby === undefined ? null : (
              <View className="flex flex-row items-center justify-start gap-2 w-full">
                <Image
                  source={require('../../assets/heart-fill.png')}
                  className="w-5 h-5 opacity-50"
                />
                <Text className="text-base font-normal text-center text-black">
                  {profile.hobby}
                </Text>
              </View>
            )}
            {profile.location === '' ||
            profile.location === undefined ? null : (
              <View className="flex flex-row items-center justify-start gap-2 w-full">
                <Image
                  source={require('../../assets/home.png')}
                  className="w-5 h-5 opacity-50"
                />
                <Text className="text-base font-normal text-center text-black">
                  {profile.location}
                </Text>
              </View>
            )}
            {profile.hometown === '' ||
            profile.hometown === undefined ? null : (
              <View className="flex flex-row items-center justify-start gap-2 w-full">
                <Image
                  source={require('../../assets/address.png')}
                  className="w-5 h-5 opacity-50"
                />
                <Text className="text-base font-normal text-center text-black">
                  {profile.hometown}
                </Text>
              </View>
            )}
            <View className="flex flex-row items-center justify-start gap-2 w-full pb-4 border-b-2 border-gray-200">
              <Image
                source={require('../../assets/time.png')}
                className="w-5 h-5 opacity-50"
              />
              <Text className="text-base font-normal text-center text-black">
                Tham gia vào {new Date(profile.joined_at).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex flex-row items-start justify-between w-full mb-2 mt-2">
              <View className="flex flex-col items-center justify-start ">
                <Text className="text-lg font-bold text-center text-black">
                  Bạn bè
                </Text>
                <Text className="text-xs font-normal text-center text-gray-400">
                  {profile.friends_count} bạn bè
                </Text>
              </View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center gap-2 pr-2"
                onPress={() => props.navigation.navigate('FriendAccept')}>
                <Text className="text-m font-bold text-center text-blue-400">
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <View className="flex flex-row">
                {friends.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          props.route.params.user_id ===
                          store.getState().auth.id
                        ) {
                          props.navigation.navigate('Profile', {
                            user_id: props.route.params.user_id,
                          });
                        } else {
                          props.navigation.navigate('ProfileUser', {
                            user_id: props.route.params.user_id,
                          });
                        }
                      }}
                      key={index}
                      className="flex flex-col items-center border-2 border-gray-300 rounded-lg">
                      <Image
                        source={
                          item.avatar !== undefined
                            ? {uri: item.avatar}
                            : require('../../assets/avatar.png')
                        }
                        className="w-20 h-20 fill"
                      />
                      <Text className="w-20 text-sm font-bold text-center text-black p-1">
                        {item.last_name} {item.first_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View className="flex flex-row items-center justify-start pt-2 pb-2 border-b-2 border-gray-200">
              <TouchableOpacity
                className="flex items-center justify-center bg-gray-300 rounded-lg p-3 w-full"
                onPress={() => props.navigation.navigate('Profile')}>
                <Text className="text-center font-semibold text-black">
                  Xem tất cả bạn bè
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-start justify-between w-full mb-2 mt-2">
              <View className="flex flex-col items-center justify-start ">
                <Text className="text-lg font-bold text-center text-black">
                  Bài viết của {profile.full_name}
                </Text>
              </View>
            </View>

            {data.map((item, index) => (
              <Post
                key={item._id}
                id={item._id}
                name={item.full_name}
                avatar={item.avatar !== undefined ? {uri: item.avatar} : ''}
                user_id={item.user_id}
                time={item.created_at}
                status={item.content}
                like={item.likes_count}
                isLike={item.is_like}
                comment={item.comments_count}
                image={item.image}
                destination={item.travel_destination}
                privacy={item.privacy}
                navigation={props.navigation}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileUser;
