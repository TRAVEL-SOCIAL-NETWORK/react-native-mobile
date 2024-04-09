import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../modules/screens/Homepage';
import Friends from '../modules/screens/Friends';
import MenuScreen from '../modules/screens/Menu';
import NotifyScreen from '../modules/screens/Notify';
import AddressScreen from '../modules/screens/Address';
import io from 'socket.io-client';
const socket = io('http://192.168.1.3:5000');

type Props = {
  navigation: any;
};

const Tab = createBottomTabNavigator();

const Tabs = (props: Props) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    socket.on('newComment', data => {
      console.log('Received new comment notification:', data);
      setNotificationCount(prevCount => prevCount + 1); // Sử dụng prevState để đảm bảo tính toán đúng khi cập nhật giá trị state
    });

    return () => {
      socket.off('newComment');
    };
  }, [notificationCount]); // Đưa notificationCount vào dependency array

  const handleNotificationTabPress = () => {
    setNotificationCount(0);
    props.navigation.navigate('Notification');
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                if (props.navigation.isFocused()) {
                  props.navigation.navigate('Home', {refresh: true});
                } else {
                  props.navigation.navigate('Home');
                }
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/home.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/friend.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Address"
        component={AddressScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/map.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotifyScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center align-middle">
              {/* Hiển thị số lượng thông báo trên biểu tượng thông báo */}
              <View style={{position: 'relative'}}>
                <Image
                  source={require('../assets/notify.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#0F9AFE' : '#666',
                  }}
                />
                {notificationCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                    }}>
                    <Text style={{color: '#FFF', fontSize: 12}}>
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ),
        })}
        listeners={({navigation}) => ({
          tabPress: () => {
            handleNotificationTabPress(); // Xử lý sự kiện khi người dùng truy cập tab thông báo
            navigation.navigate('Notification');
          },
        })}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/menu.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#0F9AFE' : '#666',
                }}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
