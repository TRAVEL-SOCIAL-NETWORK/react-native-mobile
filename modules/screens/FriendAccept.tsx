import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Friend from '../views/Friend';
import apiInstance from '../../configs/apiInstance';

type Props = {
  navigation: any;
};
const FriendAccept = (props: Props) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await apiInstance.get('/friendship');
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setData(response.data.friends);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text
          className="text-xl font-bold m-4 text-start text-black
        ">
          Bạn bè
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
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
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <Friend
                key={item.id}
                id={item.id}
                name={item.name}
                avatar={item.avatar}
                navigation={props.navigation}
              />
            );
          })
        ) : (
          <Text className="text-center m-4 font-semibold">
            Hiện tại chưa có bạn bè nào
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FriendAccept;
