import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import Destination from '../views/Destination';

type Props = {
  navigation: any;
};
const AddressScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchCity();
    setPage(1);
    fetchDestination();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCity();
  }, []);
  const fetchCity = async () => {
    try {
      const response = await apiInstance.get('/travel/city');
      if (response.status !== 200) {
        throw new Error('Error');
      }
      setData(response.data.cities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [page]);
  const fetchDestinationCity = async (city_id: string) => {
    try {
      const response = await apiInstance.get(
        `/travel/destinations/${city_id}`,
        {
          params: {
            page,
          },
        },
      );
      if (response.status !== 200) {
        throw new Error('Error');
      }
      if (page === 1) {
        setDestination(response.data.data);
      } else {
        setDestination([...destination, ...response.data.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDestination = async () => {
    try {
      const response = await apiInstance.get(`/travel/destinations`, {
        params: {
          page,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      if (page === 1) {
        setDestination(response.data.data);
      } else {
        setDestination([...destination, ...response.data.data]);
      }
    } catch (error) {
      console.error(error);
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
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-black">
            Địa danh du lịch
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Search', {name: ''})}
            className="w-8 h-8 rounded-full flex items-center justify-center mr-4">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center absolute bottom-5 right-5 z-10"
        onPress={() => props.navigation.navigate('NewDestination')}>
        <Image source={require('../../assets/add.png')} className="w-6 h-6" />
      </TouchableOpacity>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={10}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ScrollView horizontal={true}>
          {data.map((item, index) => {
            return (
              <View
                className="flex flex-col items-center justify-center mt-1"
                key={index}>
                <TouchableOpacity
                  className="rounded-lg flex flex-col items-center justify-center w-24 bg-white m-1 border-2 border-gray-300"
                  onPress={() => {
                    setPage(1);
                    fetchDestinationCity(item._id);
                  }}>
                  <Image
                    source={
                      item.avatar !== undefined
                        ? {uri: item.avatar}
                        : require('../../assets/avatar.png')
                    }
                    className="w-10 h-10 rounded-full mt-2"
                  />
                  <Text className="text-center m-2 font-semibold">
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {destination.map((item, index) => {
          return (
            <Destination
              key={index}
              id={item.id}
              destination={item.travel_destination}
              description={item.description}
              city={item.city}
              city_id={item.city_id}
              image={item.image}
              time={item.created_at}
              like={item.likes_count}
              isLiked={item.is_liked}
              tags={item.tags_count}
              user_id={item.user_id}
              avatar={item.avatar !== undefined ? item.avatar : ''}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddressScreen;
