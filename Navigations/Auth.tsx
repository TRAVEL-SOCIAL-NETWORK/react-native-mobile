import React from 'react';
import LoginScreen from '../modules/screens/Login';
import RegisterScreen from '../modules/screens/Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FindAccount from '../modules/screens/FindAccount';
import VerifyScreen from '../modules/screens/Verify';
import ResetPassword from '../modules/screens/ResetPassword';
import FullnameScreen from '../modules/screens/Fullname';
import Tabs from './Tabs';
import FriendAccept from '../modules/screens/FriendAccept';
import Profile from '../modules/screens/Profile';
import NewPost from '../modules/screens/NewPost';

const Auth = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Fullname" component={FullnameScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="FindAccount" component={FindAccount} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="Reset" component={ResetPassword} />
      <Stack.Screen name="FriendAccept" component={FriendAccept} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Home" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Auth;
