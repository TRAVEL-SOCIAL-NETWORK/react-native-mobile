import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import store from '../../libs/redux/store';
import Post from '../views/Post';
import apiInstance from '../../configs/apiInstance';

type Props = {
  navigation: any;
};

const HomeScreen = (props: Props) => {
  const {avatar, first_name} = store.getState().auth;
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get('/posts', {
        params: {
          page,
        },
      });
      console.log('loading');
      setData([...data, ...response.data.data]);
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

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Nguyễn Văn A',
  //     avatar: require('../../assets/avatar.jpg'),
  //     user_id: 1,
  //     time: '1 giờ trước',
  //     status:
  //       'Phương tiện để đi du lịch Lý Sơn tự túc là tàu biển. Trước đó bạn cần đặt vé máy bay đi Chu Lai để đến Quảng Ngãi, sau đó di chuyển tới cảng Sa Kỳ và mua vé tàu ra đảo. Vé máy bay đi Chu Lai có giá rất rẻ, chỉ dao động trong khoảng 59.000đ - 159.000đ (giá vé chưa bao gồm thuế phí), tùy vào nơi bạn khởi hành từ Hà Nội hay Tp.Hồ Chí Minh, thời gian bay trong khoảng 1h20p.',
  //     like: 10,
  //     comment: 5,
  //     image: [require('../../assets/avatar.jpg')],
  //   },
  //   {
  //     id: 2,
  //     name: 'Nguyễn Văn B',
  //     avatar: require('../../assets/avatar.jpg'),
  //     user_id: 2,
  //     time: '2 giờ trước',
  //     status: 'Đi chơi',
  //     like: 20,
  //     comment: 10,
  //     image: [require('../../assets/avatar.jpg')],
  //   },
  //   {
  //     id: 3,
  //     name: 'Nguyễn Văn C',
  //     avatar: require('../../assets/avatar.jpg'),
  //     user_id: 3,
  //     time: '3 giờ trước',
  //     status: 'Đi chơi',
  //     like: 30,
  //     comment: 15,
  //     image: [require('../../assets/avatar.jpg')],
  //   },
  //   {
  //     id: 4,
  //     name: 'Nguyễn Văn D',
  //     avatar: require('../../assets/avatar.jpg'),
  //     user_id: 4,
  //     time: '4 giờ trước',
  //     status: 'Đi chơi',
  //     like: 40,
  //     comment: 20,
  //     image: [require('../../assets/avatar.jpg')],
  //   },
  //   {
  //     id: 5,
  //     name: 'Nguyễn Văn E',
  //     avatar: require('../../assets/avatar.jpg'),
  //     user_id: 5,
  //     time: '5 giờ trước',
  //     status: 'Đi chơi',
  //     like: 50,
  //     comment: 25,
  //     image: [require('../../assets/avatar.jpg')],
  //   },
  // ];
  return (
    <View className="w-full h-full bg-gray-100">
      <View className="flex flex-row items-center justify-between ml-2 mr-2 bg-white">
        <View>
          <Text className="text-2xl font-bold m-4 text-start text-blue-400">
            travelolo
          </Text>
        </View>

        <View className="flex flex-row items-center justify-center gap-2">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/add.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/search.png')}
              width={24}
              height={24}
              className="w-5 h-5"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Image
              source={require('../../assets/message.png')}
              width={24}
              height={24}
              className="w-4 h-4"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={400}>
        <View className="flex flex-row items-center justify-between ml-4 mr-2 bg-white">
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity
              className="w-10 h-10 border border-gray-500 rounded-full"
              onPress={() => props.navigation.navigate('FindAccount')}>
              <Image
                source={avatar || require('../../assets/avatar.jpg')}
                className="w-10 h-10 rounded-full"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('FindAccount')}>
              <Text className="text-center m-4 font-semibold">
                Chia sẻ chuyến du lịch của {first_name}?
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
            avatar={item.avatar}
            user_id={item.user_id}
            time={item.created_at}
            status={item.content}
            like={item.likes_count}
            comment={item.comments_count}
            image={item.image}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
