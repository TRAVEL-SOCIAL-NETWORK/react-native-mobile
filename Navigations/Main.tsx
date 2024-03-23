import React from 'react';
import Friends from '../modules/screens/Friends';
import HomeScreen from '../modules/screens/Homepage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Tabs';
import FriendAccept from '../modules/screens/FriendAccept';

const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="FriendAccept" component={FriendAccept} />
    </Stack.Navigator>
  );
};

export default Main;
