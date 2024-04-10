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
import Destination from '../views/Destination';
import AddFriend from '../views/AddFriend';
import Post from '../views/Post';

type Props = {
  navigation: any;
};

const SearchScreen = (props: Props) => {
  const [destination, setDestination] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  const fetchSearchDestination = async (keyword: string) => {
    try {
      const response = await apiInstance.get('/search/destination', {
        params: {
          keyword,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setDestination(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchPeople = async (keyword: string) => {
    try {
      const response = await apiInstance.get('/search/user', {
        params: {
          keyword,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setPeople(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchPost = async (keyword: string) => {
    try {
      const response = await apiInstance.get('/search/post', {
        params: {
          keyword,
          page: 1,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setPosts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (keyword: string) => {
    fetchSearchDestination(keyword);
    fetchSearchPeople(keyword);
    fetchSearchPost(keyword);
  };

  return (
    <ScrollView>
      <View className="w-full h-full">
        <View className="w-full flex flex-row items-center justify-evenly pt-2 pb-2 border-b-2 border-gray-200">
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
          <TextInput
            placeholder="Tìm kiếm trên Travelolo"
            className="w-5/6 rounded-full bg-gray-300 pl-4 pt-1 pb-1"
            onSubmitEditing={e => {
              if (e.nativeEvent.text.trim().length > 0) {
                handleSearch(e.nativeEvent.text);
              }
            }}
          />
        </View>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Địa điểm du lịch
          </Text>
        </View>
        {destination.length === 0 ? (
          <View className="flex flex-row items-center justify-center">
            <Text>Không tìm thấy địa điểm du lịch nào</Text>
          </View>
        ) : (
          destination.map((item, index) => {
            return (
              <Destination
                key={item.id}
                id={item.id}
                destination={item.destination}
                city={item.city}
                user_id={item.user_id}
                avatar={item.avatar !== undefined ? item.avatar : ''}
                time={item.created_at}
                description={item.content}
                like={item.likes_count}
                tags={item.tags}
                image={item.image}
                navigation={props.navigation}
              />
            );
          })
        )}
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Mọi người
          </Text>
        </View>

        {people.length === 0 ? (
          <View className="flex flex-row items-center justify-center">
            <Text>Không tìm thấy người nào</Text>
          </View>
        ) : (
          people.map((item, index) => {
            return (
              <AddFriend
                key={item.id}
                id={item.id}
                name={item.name}
                avatar={item.avatar !== undefined ? item.avatar : ''}
                navigation={props.navigation}
              />
            );
          })
        )}
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Bài viết
          </Text>
        </View>
        {posts.length === 0 ? (
          <View className="flex flex-row items-center justify-center">
            <Text>Không tìm thấy bài viết nào</Text>
          </View>
        ) : (
          posts.map((item, index) => {
            return (
              <Post
                key={item._id}
                id={item._id}
                name={item.full_name}
                avatar={item.avatar !== undefined ? {uri: item.avatar} : ''}
                user_id={item.user_id}
                time={item.created_at}
                status={item.content}
                like={item.likes_count}
                isLike={item.is_liked}
                comment={item.comments_count}
                image={item.image}
                destination={item.travel_destination}
                privacy={item.privacy}
                navigation={props.navigation}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
