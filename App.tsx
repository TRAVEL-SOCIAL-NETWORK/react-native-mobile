import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import WelcomeScreen from './modules/screens/Welcome';
import store from './libs/redux/store';
import {Text, View} from 'react-native';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    store.getState().auth.isAuthenticated,
  );
  const [isWelcome, setIsWelcome] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
  }, []);
  return (
    <>
      {isWelcome ? (
        <WelcomeScreen />
      ) : (
        <>
          {isAuthenticated ? (
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Auth />
            </NavigationContainer>
          )}
        </>
      )}
    </>
  );
}

export default App;
