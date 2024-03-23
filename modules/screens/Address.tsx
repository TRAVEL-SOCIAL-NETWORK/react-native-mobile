import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import Destination from '../views/Destination';

type Props = {
  navigation: any;
};
const AddressScreen = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);
  const [page, setPage] = useState(1);

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

  // useEffect(() => {
  //   fetchDestination('65eab8bd0273532a718a12bd');
  // }, [page]);
  const fetchDestination = async (city_id: string) => {
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
      setDestination(response.data.data);
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
            onPress={() => props.navigation.navigate('Login')}
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
      <ScrollView onScroll={handleScroll} scrollEventThrottle={400}>
        <ScrollView horizontal={true}>
          {data.map((item, index) => {
            return (
              <View
                className="flex flex-col items-center justify-center mt-1"
                key={item._id}>
                <TouchableOpacity
                  className="rounded-lg flex flex-col items-center justify-center w-24 bg-white m-1"
                  onPress={() => {
                    fetchDestination(item._id);
                  }}>
                  <Image
                    source={require('../../assets/avatar.jpg')}
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
              key={item.id}
              id={item.id}
              destination={item.destination}
              city={item.city}
              user_id={item.user_id}
              time={item.created_at}
              description={item.content}
              like={item.likes_count}
              tags={item.tags}
              image={item.image}
              navigation={props.navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddressScreen;
