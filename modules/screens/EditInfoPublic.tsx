import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Profile: {
    work: string;
    study: string;
    hobby: string;
    location: string;
    hometown: string;
    avatar: string;
    background: string;
  };
};

type ScreenBRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};
const EditInfoPublic = (props: Props) => {
  const {work, study, hobby, location, hometown, avatar, background} =
    props.route.params;
  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row items-center justify-between bg-white border-b-2 border-gray-200">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 hover:bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text className="text-base font-bold m-4 text-start text-black">
          Chỉnh sửa trang cá nhân
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text className="text-base font-bold m-4 text-start text-blue-500">
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-col items-center justify-center gap-2 pl-3 pr-3">
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Ảnh đại diện
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={() => props.navigation.navigate('Friends')}>
              <Text className="text-base font-normal text-center text-blue-400">
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center w-full pb-4 border-b-2 border-gray-100">
            <TouchableOpacity
              className="rounded-full border-2 border-gray-300"
              onPress={() => props.navigation.navigate('Profile')}>
              <Image
                source={avatar || require('../../assets/avatar.png')}
                className="w-48 h-48 rounded-full"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Ảnh bìa
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={() => props.navigation.navigate('Friends')}>
              <Text className="text-base font-normal text-center text-blue-400">
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center w-full pb-4 border-b-2 border-gray-100">
            <TouchableOpacity
              className="rounded-lg border-2 border-gray-100"
              onPress={() => props.navigation.navigate('Profile')}>
              <Image
                source={avatar || require('../../assets/avatar.png')}
                className="w-fit h-48 rounded-lg"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Chi tiết
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={() => props.navigation.navigate('Friends')}>
              <Text className="text-base font-normal text-center text-blue-400">
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/work.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {work === '' ? 'Công việc' : work}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/school.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {study === '' ? 'Trường học' : study}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/heart-fill.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {hobby === '' ? 'Sở thích' : hobby}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/home.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {location === '' ? 'Tỉnh/Thành phố hiện tại' : location}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/address.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {hometown === '' ? 'Quê quán' : hometown}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditInfoPublic;
