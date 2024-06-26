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

type Props = {
  navigation: any;
};
const Profile = (props: Props) => {
  const fullname =
    store.getState().auth.last_name + ' ' + store.getState().auth.first_name;
  const avatar =
    store.getState().auth.avatar !== null ? store.getState().auth.avatar : '';
  const [tabPost, setTabPost] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>({});
  const [friends, setFriends] = useState<any[]>([]);
  const [privacy, setPrivacy] = useState<string>('');
  const [oldest, setOldest] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
    fetchProfile();
    setRefreshing(false);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await apiInstance.get('/user/profile');
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
  }, [page, privacy, oldest]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`/posts/user`, {
        params: {
          page,
          privacy,
          oldest,
        },
      });
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

  return (
    <View className="h-full bg-blue-50">
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View className="w-full  bg-white rounded-lg p-4">
          <Text className="text-lg font-bold text-start text-black">
            Bộ lọc bài viết
          </Text>
          <Text className="text-xs font-normal text-start text-gray-500 pb-2">
            Bài viết của bạn có thể hiển thị cho mọi người hoặc chỉ một số người
          </Text>
          <Text className="text-xs font-normal text-start text-gray-500 pb-2">
            Bạn có thể chọn bộ lọc để xem bài viết của mình
          </Text>
          <Text className="text-lg font-bold text-start text-black pb-2">
            Chọn quyền riêng tư
          </Text>
          <TouchableOpacity
            onPress={() => {
              setPrivacy('public');
              setModalVisible(false);
            }}
            className={
              privacy === 'public'
                ? 'flex flex-row items-center gap-2 bg-gray-200 border-2 border-gray-200 rounded-lg'
                : 'flex flex-row items-center gap-2'
            }>
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
            onPress={() => {
              setPrivacy('private');
              setModalVisible(false);
            }}
            className={
              privacy === 'private'
                ? 'flex flex-row items-center gap-2 bg-gray-200 border-2 border-gray-200 rounded-lg'
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
          <Text className="text-lg font-bold text-start text-black pb-2">
            Sắp xếp
          </Text>
          <TouchableOpacity
            onPress={() => {
              setOldest(false);
              setModalVisible(false);
            }}
            className={
              oldest === false
                ? 'flex flex-row items-center gap-2 bg-gray-200 border-2 border-gray-200 rounded-lg'
                : 'flex flex-row items-center gap-2'
            }>
            <Image
              source={require('../../assets/time.png')}
              style={{width: 20, height: 20}}
            />
            <View className="w-full">
              <Text className="text-normal font-bold ">Mới nhất</Text>
              <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                Bài viết mới nhất sẽ hiển thị đầu tiên
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOldest(true);
              setModalVisible(false);
            }}
            className={
              oldest === true
                ? 'flex flex-row items-center gap-2 bg-gray-200 border-2 border-gray-200 rounded-lg'
                : 'flex flex-row items-center gap-2'
            }>
            <Image
              source={require('../../assets/time.png')}
              style={{width: 20, height: 20}}
            />
            <View className="w-full">
              <Text className="text-normal font-bold ">Cũ nhất</Text>
              <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                Bài viết cũ nhất sẽ hiển thị đầu tiên
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
              props.navigation.navigate('EditPublic', {
                work: profile.work,
                study: profile.study,
                hobby: profile.hobby,
                location: profile.location,
                hometown: profile.hometown,
                avatar: avatar,
                background:
                  profile.background !== undefined ? profile.background : '',
              })
            }
            className="w-8 h-8 rounded-full flex items-center justify-center">
            <Image
              source={require('../../assets/edit.png')}
              width={24}
              height={24}
              className="w-5 h-5"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
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
                avatar !== ''
                  ? {uri: avatar}
                  : require('../../assets/avatar.png')
              }
              className="w-40 h-40 rounded-full"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center justify-center pt-32">
          <Text className="text-center font-bold text-xl">{fullname}</Text>
          <Text className="text-center font-normal">
            {profile.friends_count} bạn bè
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center pt-2 gap-2 pl-4 pr-4">
          <TouchableOpacity
            className="flex items-center justify-center bg-blue-500 rounded-lg p-3 w-full"
            onPress={() => props.navigation.navigate('NewPost')}>
            <Text className="text-center font-semibold text-white">
              + Thêm bài viết
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-between pt-2 w-full">
            <TouchableOpacity
              className="flex items-center justify-center bg-gray-300 rounded-lg p-3 w-5/6"
              onPress={() =>
                props.navigation.navigate('EditPublic', {
                  work: profile.work,
                  study: profile.study,
                  hobby: profile.hobby,
                  location: profile.location,
                  hometown: profile.hometown,
                  avatar: avatar,
                  background:
                    profile.background !== undefined ? profile.background : '',
                })
              }>
              <Text className="text-center font-semibold text-black">
                Chỉnh sửa trang cá nhân
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
            <View className="flex flex-row items-center justify-start gap-2 w-full">
              <Image
                source={require('../../assets/time.png')}
                className="w-5 h-5 opacity-50"
              />
              <Text className="text-base font-normal text-center text-black">
                Tham gia vào {new Date(profile.joined_at).toLocaleDateString()}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-start pt-2 pb-2 border-b-2 border-gray-200">
              <TouchableOpacity
                className="flex items-center justify-center bg-blue-200 rounded-lg p-3 w-full"
                onPress={() =>
                  props.navigation.navigate('EditPublic', {
                    work: profile.work,
                    study: profile.study,
                    hobby: profile.hobby,
                    location: profile.location,
                    hometown: profile.hometown,
                    avatar: avatar,
                    background: profile.background,
                  })
                }>
                <Text className="text-center font-semibold text-blue-500">
                  Chỉnh sửa chi tiết công khai
                </Text>
              </TouchableOpacity>
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
                        if (item.user_id === store.getState().auth.id) {
                          props.navigation.navigate('Profile', {
                            user_id: item.id,
                          });
                        } else {
                          props.navigation.navigate('ProfileUser', {
                            user_id: item.id,
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
                  Bài viết của bạn
                </Text>
              </View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center gap-2 pr-2"
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text className="text-m font-bold text-center text-blue-400">
                  Bộ lọc
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-between bg-white border-b-8 border-gray-200 w-full">
              <View className="flex flex-row items-center justify-center">
                <TouchableOpacity
                  className="border-gray-500 rounded-full border-2 border-gray-300 ml-2 mb-2"
                  onPress={() => props.navigation.navigate('NewPost')}>
                  <Image
                    source={
                      store.getState().auth.avatar !== ''
                        ? {uri: store.getState().auth.avatar}
                        : require('../../assets/avatar.png')
                    }
                    className="w-12 h-12 rounded-full"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('NewPost')}>
                  <Text className="text-center m-4 font-semibold">
                    Chia sẻ chuyến du lịch của{' '}
                    {store.getState().auth.first_name}?
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}
                  className="w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    source={require('../../assets/image.png')}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
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

export default Profile;
