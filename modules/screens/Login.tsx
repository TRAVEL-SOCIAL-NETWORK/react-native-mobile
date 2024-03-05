import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Realm from 'realm';
import apiInstance from '../../configs/apiInstance';
import store from '../../libs/redux/store';

type Props = {
  navigation: any;
};

const LoginScreen = (props: Props) => {
  const [rememberPassword, setRememberPassword] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const realm = new Realm({
    schema: [
      {
        name: 'User',
        properties: {
          username: 'string',
          password: 'string',
        },
      },
    ],
  });

  const handleToggleRememberPassword = () =>
    setRememberPassword(!rememberPassword);

  const handleSavePassword = () => {
    realm.write(() => {
      realm.create('User', {
        username: userName,
        password: password,
      });
    });
  };

  const handleLogin = async () => {
    try {
      const response = await apiInstance.post('/auth/login', {
        email: userName,
        password: password,
      });
      console.log(response.data);
      if (response.data.status_code === 200) {
        if (rememberPassword) {
          handleSavePassword();
          console.log('Save password');
        } else {
          realm.write(() => {
            realm.deleteAll();
          });
          console.log('Delete password');
        }
        const {
          access_token,
          refresh_token,
          id,
          avatar,
          first_name,
          last_name,
          status,
        } = response.data;
        store.dispatch({
          type: 'auth/login',
          payload: {
            access_token,
            refresh_token,
            id,
            avatar,
            first_name,
            last_name,
          },
        });
        console.log('Login success');
        props.navigation.navigate('Home');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = realm.objects('User')[0];
    if (user) {
      setUserName(user.username as string);
      setPassword(user.password as string);
      setRememberPassword(true); // Mark as remembered password
    }
  }, []);
  useEffect(() => {
    const state = store.getState();
    if (state.auth.isAuthenticated) {
      props.navigation.navigate('Home');
    }
  }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="flex-[1] items-center justify-center  bg-blue-50">
        <Text className="text-4xl font-bold text-center text-blue-400 m-24">
          Travelolo
        </Text>
        <TextInput
          placeholder="Số di dộng hoặc email"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={userName}
          onChangeText={text => {
            setUserName(text);
          }}
        />
        <TextInput
          placeholder="Mật khẩu"
          className="text-base border-2 border-gray-300 rounded-md p-2 m-2 w-5/6"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <View className="flex-row items-center justify-start w-5/6 gap-1">
          <TouchableOpacity onPress={handleToggleRememberPassword}>
            <View className="w-4 h-4 border border-gray-500 rounded">
              {rememberPassword && (
                <View className="bg-blue-500 w-4 h-4 rounded" />
              )}
            </View>
          </TouchableOpacity>
          <Text>Ghi nhớ mật khẩu</Text>
        </View>

        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-3xl mt-8 w-5/6"
          onPress={() => {
            handleLogin();
          }}>
          <Text className="text-white font-semibold text-center text-base">
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('FindAccount')}>
          <Text className="text-center m-4">Bạn quên mật khẩu ư?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white px-4 py-2 rounded-3xl w-5/6 border-2 border-blue-400 mt-32"
          onPress={() => props.navigation.navigate('Fullname')}>
          <Text className="text-blue-500 font-semibold text-center text-base">
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
