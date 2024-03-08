import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

type Props = {
  navigation: any;
};
const AddressScreen = (props: Props) => {
  const data = [
    {
      id: 1,
      name: 'Đà Nẵng',
      avatar: require('../../assets/avatar.jpg'),
    },
    {
      id: 2,
      name: 'Hội An',
      avatar: require('../../assets/avatar.jpg'),
    },
    {
      id: 3,
      name: 'Huế',
      avatar: require('../../assets/avatar.jpg'),
    },
    {
      id: 4,
      name: 'Quảng Bình',
      avatar: require('../../assets/avatar.jpg'),
    },
    {
      id: 5,
      name: 'Quảng Nam',
      avatar: require('../../assets/avatar.jpg'),
    },
  ];
  const data1 = [
    {
      id: 1,
      province: 'Đà Nẵng',
      places: 'Bà Nà Hill',
      image: [
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
      ],
    },
    {
      id: 2,
      province: 'Hội An',
      places: 'An Bang Beach',
      image: [
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
      ],
    },
    {
      id: 3,
      province: 'Huế',
      places: 'Lăng Minh Mạng',
      image: [
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
      ],
    },
    {
      id: 4,
      province: 'Quảng Bình',
      places: 'Động Phong Nha',
      image: [
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
      ],
    },
    {
      id: 5,
      province: 'Quảng Nam',
      places: 'Bà Nà Hill',
      image: [
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
        require('../../assets/avatar.jpg'),
      ],
    },
  ];
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
        <ScrollView horizontal={false}>
          <View className="flex flex-row flex-nowrap items-center justify-between bg-white">
            {data.map((item, index) => {
              return (
                <View
                  className="flex flex-col items-center justify-center"
                  key={item.id}>
                  <TouchableOpacity
                    className="w-10 h-10 border border-gray-500 rounded-full"
                    onPress={() => props.navigation.navigate('FindAccount')}>
                    <Image
                      source={require('../../assets/avatar.jpg')}
                      className="w-10 h-10 rounded-full"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('FindAccount')}>
                    <Text className="text-center m-4 font-semibold">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View className="flex flex-row items-center justify-between ml-4 mr-2 bg-white"></View>
      </ScrollView>
    </View>
  );
};

export default AddressScreen;
