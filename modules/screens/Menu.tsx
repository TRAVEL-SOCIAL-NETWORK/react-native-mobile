import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import store from '../../libs/redux/store';
import apiInstance from '../../configs/apiInstance';

type Props = {
  navigation: any;
};

const MenuScreen = (props: Props) => {
  const handleLogout = () => {
    store.dispatch({type: 'LOGOUT'});
    props.navigation.navigate('Login');
  };
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get('/user/info');
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View className="w-full h-full bg-gray-100">
        <View className="flex flex-row items-center justify-between ">
          <View>
            <Text className="text-2xl font-bold m-4 text-start text-black">
              Menu
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center gap-2 mr-4">
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
              <Image
                source={require('../../assets/setting.png')}
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
        <View className="flex flex-col items-start justify-between m-2 p-2 bg-white rounded-lg shadow-lg ">
          <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
              className="rounded-full border-2 border-gray-300"
              onPress={() => props.navigation.navigate('Profile')}>
              <Image
                source={require('../../assets/avatar.png')}
                className="w-20 h-20 rounded-full"
              />
            </TouchableOpacity>
            <View className="pl-6">
              <Text className="text-center font-bold">{data.posts}</Text>
              <Text className="text-center font-normal">bài viết</Text>
            </View>
            <View>
              <Text className="text-center font-bold">{data.friends}</Text>
              <Text className="text-center font-normal">bạn bè</Text>
            </View>
            <View>
              <Text className="text-center font-bold">{data.destinations}</Text>
              <Text className="text-center font-normal text-xs">
                đia điểm theo dõi
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center justify-center gap-4 mb-2">
            <Text className="text-center font-semibold">
              Nguyễn Văn Aanh dawda{' '}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
              className="flex-1 items-center justify-center bg-gray-300 h-8 rounded-lg"
              onPress={() => props.navigation.navigate('Profile')}>
              <Text className="text-center font-semibold">Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center justify-center bg-gray-300 h-8 rounded-lg"
              onPress={() => props.navigation.navigate('Profile')}>
              <Text className="text-center font-semibold">
                Xem trang cá nhân
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-start justify-between m-2 p-2 bg-white rounded-lg shadow-lg">
          <View className="flex-1 flex-col items-center justify-between p-2 bg-white rounded-lg shadow-lg mt-2">
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Bạn bè
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Nhóm
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Marketplace
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-col items-center justify-between p-2 bg-white rounded-lg shadow-lg mt-2">
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Video trên Watch
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Sự kiện
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-lg font-bold text-center text-black">
                Kỷ niệm
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col items-start justify-between m-2 p-2 bg-white rounded-lg shadow-lg mt-2">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-lg font-bold text-start text-black">
              Trợ giúp và hỗ trợ
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-lg font-bold text-start text-black">
              Cài đặt và quyền riêng tư
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between w-full p-2">
          <TouchableOpacity
            className="flex-1 items-center justify-center bg-gray-300 h-10 rounded-lg"
            onPress={() => {
              handleLogout();
            }}>
            <Text className="text-center font-bold text-base text-black">
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;
