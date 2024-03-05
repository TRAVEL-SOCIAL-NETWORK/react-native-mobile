import {Image, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../modules/screens/Homepage';
import Friends from '../modules/screens/Friends';
import MenuScreen from '../modules/screens/Menu';
import NotifyScreen from '../modules/screens/Notify';
import AddressScreen from '../modules/screens/Address';

type Props = {};

const Tab = createBottomTabNavigator();

const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
          initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View className="flex-col items-center justify-center">
              <Image
                source={require('../assets/home.png')}
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
              <Image
                source={require('../assets/notify.png')}
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
