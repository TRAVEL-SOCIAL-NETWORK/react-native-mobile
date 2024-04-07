import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Friendship from '../views/Friendship';
import apiInstance from '../../configs/apiInstance';

type Props = {
  navigation: any;
};
const Friends = (props: Props) => {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetchSuggestFriend();
    fetchRequestFriend();
  }, []);

  const fetchSuggestFriend = async () => {
    try {
      const response = await apiInstance.get('/friendship/suggest-friends');
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setSuggest(response.data.suggestedFriends);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequestFriend = async () => {
    try {
      const response = await apiInstance.get('/friendship/request-friendship');
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setData(response.data.requests);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Bạn bè
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Search')}
            className="w-8 h-8 rounded-full flex items-center justify-center m-4">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="flex flex-row items-center justify-between pl-4 pr-2 bg-white">
          <View className="flex flex-row items-center justify-center gap-4 mb-4">
            <TouchableOpacity
              className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
              onPress={() => props.navigation.navigate('FindAccount')}>
              <Text className="text-xs font-bold text-center text-black">
                Gợi ý
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-20 h-10 border-gray-500 rounded-full bg-gray-300 flex items-center justify-center"
              onPress={() => props.navigation.navigate('FriendAccept')}>
              <Text className="text-xs font-bold text-center text-black">
                Bạn bè
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between pl-4 pr-4 pt-2 bg-white mt-1">
          <View className="flex flex-row items-center justify-center gap-4 mb-2">
            <Text className="text-xl font-bold text-center text-black">
              Lời mời kết bạn
            </Text>
          </View>
          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-4 mb-2"
            onPress={() => props.navigation.navigate('FindAccount')}>
            <Text className="text-m font-bold text-center text-blue-400">
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <Friendship
                key={item._id}
                id={item._id}
                name={item.name}
                avatar={item.avatar !== undefined ? item.avatar : ''}
                time={item.time}
                request={true}
                navigation={props.navigation}
              />
            );
          })
        ) : (
          <View className="flex flex-row items-center justify-center bg-white">
            <Text className="text-center m-4 font-semibold">
              Không có lời mời kết bạn
            </Text>
          </View>
        )}
        <View className="flex flex-row items-center justify-between pl-4 pr-4 pt-2 bg-white mt-1">
          <View className="flex flex-row items-center justify-center gap-4 mb-4">
            <Text className="text-xl font-bold text-center text-black">
              Những người bạn có thể biết
            </Text>
          </View>
        </View>
        {suggest.length > 0 ? (
          suggest.map((item, index) => {
            return (
              <Friendship
                key={item._id}
                id={item._id}
                name={item.name}
                avatar={item.avatar !== undefined ? item.avatar : ''}
                time={item.time}
                request={false}
                navigation={props.navigation}
              />
            );
          })
        ) : (
          <View className="flex flex-row items-center justify-center bg-white">
            <Text className="text-center m-4 font-semibold">
              Không có người bạn nào
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Friends;
