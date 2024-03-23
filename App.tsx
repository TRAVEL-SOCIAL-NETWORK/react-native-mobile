import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './libs/redux/store';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Navigations/Tabs';
import FriendAccept from './modules/screens/FriendAccept';
import Profile from './modules/screens/Profile';
import NewPost from './modules/screens/NewPost';
import LoginScreen from './modules/screens/Login';
import FullnameScreen from './modules/screens/Fullname';
import RegisterScreen from './modules/screens/Register';
import FindAccount from './modules/screens/FindAccount';
import VerifyScreen from './modules/screens/Verify';
import ResetPassword from './modules/screens/ResetPassword';
import WelcomeScreen from './modules/screens/Welcome';

function App() {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  const [isWelcome, setIsWelcome] = React.useState(true);
  React.useEffect(() => {
    console.log('store', store.getState().auth.isAuthenticated);
    setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
  }, []);
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isWelcome ? (
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          ) : isAuthenticated ? (
            <>
              <Stack.Screen name="FriendAccept" component={FriendAccept} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NewPost" component={NewPost} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Fullname" component={FullnameScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="FindAccount" component={FindAccount} />
              <Stack.Screen name="Verify" component={VerifyScreen} />
              <Stack.Screen name="Reset" component={ResetPassword} />
              <Stack.Screen name="HomePage" component={Tabs} />
              <Stack.Screen name="FriendAccept" component={FriendAccept} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="NewPost" component={NewPost} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
