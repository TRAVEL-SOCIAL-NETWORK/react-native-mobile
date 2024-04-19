import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import apiInstance from '../../configs/apiInstance';
import store from '../../libs/redux/store';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';

type Props = {
  navigation: any;
};
const NewPost = (props: Props) => {
  const fullname =
    store.getState().auth.last_name + ' ' + store.getState().auth.first_name;
  const [content, setContent] = useState<string>('');
  const [cities, setCities] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [destinationSelected, setDestinationSelected] = useState<any>({});
  const [imageSource, setImageSource] = useState<any>(null);
  const [isModalVisiblePrivacy, setIsModalVisiblePrivacy] = useState(false);
  const [isModalVisibleDestination, setIsModalVisibleDestination] =
    useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [privacy, setPrivacy] = useState('public');
  const toggleModalPrivacy = () => {
    setIsModalVisiblePrivacy(!isModalVisiblePrivacy);
  };
  const toggleModalDestination = () => {
    setIsModalVisibleDestination(!isModalVisibleDestination);
    if (!isModalVisibleDestination) {
      fetchCity();
    }
  };

  const handlePrivacySelection = (selectedPrivacy: string) => {
    setPrivacy(selectedPrivacy);
    toggleModalPrivacy();
  };
  // Hàm chọn ảnh từ thiết bị
  const chooseImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageSource(response.assets[0].uri);
      }
    });
  };

  const chooseCamera = () => {
    ImagePicker.launchCamera({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageSource(response.assets[0].uri);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        chooseCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const createPost = async (imageUri: string) => {
    try {
      setIsCreatingPost(true);
      const formData = new FormData();
      if (imageUri !== null) {
        formData.append('photo', {
          uri: imageUri,
          type: 'image/jpeg', // Hoặc 'image/png'
          name: 'photo.jpg',
        });
      }

      formData.append('content', content);
      formData.append('destination_id', destinationSelected._id);
      formData.append('privacy', privacy);

      const response = await apiInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful!', response.data);
      const result = await response.data;
      console.log(result);
      // Xử lý kết quả
      if (result.status_code === 200) {
        props.navigation.goBack();
      }
    } catch (error) {
      console.error('Upload failed!', error);
      // Xử lý lỗi
    }
  };

  const fetchCity = async () => {
    try {
      const response = await apiInstance.get('/travel/city');
      console.log(response.data);
      setCities(response.data.cities);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDestination = async (cityId: string) => {
    try {
      const response = await apiInstance.get(
        `/travel/destinations/city/${cityId}`,
      );
      console.log(response.data);
      setDestinations(response.data.destinations);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row items-center justify-between bg-white border-b-2 border-gray-200">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 bg-gray-200">
          <Image
            source={require('../../assets/close.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold m-4 text-start text-black">
          Tạo bài viết
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (content.trim() !== '') {
              // Kiểm tra inputText không trống
              createPost(imageSource);
            }
          }}
          disabled={isCreatingPost || content.trim() === ''}>
          <Text
            className={
              isCreatingPost || content.trim() === ''
                ? 'text-xl font-bold m-4 text-start text-blue-200'
                : 'text-xl font-bold m-4 text-start text-blue-500'
            }>
            {isCreatingPost ? 'Đang tạo...' : 'Đăng'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-row items-center justify-start gap-2 pt-2 ml-2">
          <TouchableOpacity
            className="border border-gray-500 rounded-full border-2 border-gray-300"
            onPress={() => props.navigation.navigate('NewPost')}>
            <Image
              source={require('../../assets/avatar.png')}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
          <View className="flex flex-col items-start justify-start">
            <TouchableOpacity
              className="w-full pb-1"
              onPress={() => props.navigation.navigate('Profile')}>
              <Text className="text-lg font-bold text-start text-black">
                {fullname}
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center justify-start">
              <TouchableOpacity onPress={toggleModalPrivacy}>
                <View className="flex flex-row items-center justify-start bg-blue-100 rounded-lg pl-1 pr-1">
                  <Image
                    source={
                      privacy === 'public'
                        ? require('../../assets/earth.png')
                        : privacy === 'private'
                        ? require('../../assets/private.png')
                        : privacy === 'friend'
                        ? require('../../assets/friend.png')
                        : null
                    }
                    style={{width: 15, height: 15, tintColor: '#4299e1'}}
                  />
                  <Text className="font-bold text-gray-500 p-1 color-blue-500">
                    {privacy === 'public'
                      ? 'Công khai'
                      : privacy === 'private'
                      ? 'Riêng tư'
                      : privacy === 'friend'
                      ? 'Bạn bè'
                      : 'Chọn đối tượng'}
                  </Text>
                  <Image
                    source={require('../../assets/down.png')}
                    style={{width: 10, height: 10, tintColor: '#4299e1'}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModalDestination}>
                <View className="flex flex-row items-center justify-start bg-blue-100 rounded-lg pl-1 pr-1 ml-2">
                  <Image
                    source={require('../../assets/map.png')}
                    style={{width: 15, height: 15, tintColor: '#4299e1'}}
                  />
                  <Text className="font-bold text-gray-500 p-1 color-blue-500">
                    {destinationSelected.travel_destination || 'Chọn địa điểm'}
                  </Text>
                  <Image
                    source={require('../../assets/down.png')}
                    style={{width: 10, height: 10, tintColor: '#4299e1'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Modal
              isVisible={isModalVisiblePrivacy}
              onBackdropPress={toggleModalPrivacy}
              className="m-1">
              <View className="w-full  bg-white rounded-lg p-4">
                <Text className="text-lg font-bold text-start text-black">
                  Ai có thể xem bài viết của bạn?
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bài viết của bạn có thể hiển thị trên News Feed, trên trang cá
                  nhân và trên các dịch vụ khác trên Travelolo
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn có thể thay đổi ai có thể xem bài viết của bạn bất cứ lúc
                  nào
                </Text>
                <Text className="text-lg font-bold text-start text-black pb-2">
                  Chọn đối tượng
                </Text>
                <TouchableOpacity
                  onPress={() => handlePrivacySelection('public')}
                  className="flex flex-row items-center gap-2">
                  <Image
                    source={require('../../assets/earth.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View className="w-full">
                    <Text className="text-normal font-bold ">Công khai</Text>
                    <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                      Mọi người có thể xem bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePrivacySelection('private')}
                  className="flex flex-row items-center gap-2">
                  <Image
                    source={require('../../assets/private.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View className="w-full">
                    <Text className="text-normal font-bold ">Riêng tư</Text>
                    <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                      Chỉ bạn và một số người được chọn có thể xem bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePrivacySelection('friend')}
                  className="flex flex-row items-center gap-2">
                  <Image
                    source={require('../../assets/friend.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View className="w-full">
                    <Text className="text-normal font-bold ">Bạn bè</Text>
                    <Text className="text-xs font-normal border-b-2 border-gray-200 w-5/6 pb-2">
                      Chỉ bạn bè có thể xem bài viết
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal
              isVisible={isModalVisibleDestination}
              onBackdropPress={toggleModalDestination}
              className="m-1">
              <View className="w-full  bg-white rounded-lg p-4">
                <Text className="text-lg font-bold text-start text-black">
                  Địa điểm du lịch của bạn
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn có thể chọn địa điểm để bài viết của bạn dễ dàng được tìm
                  thấy
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn có thể chọn địa điểm để bài viết của bạn dễ dàng được tìm
                  thấy
                </Text>
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-start text-black ">
                    Chọn địa điểm
                  </Text>
                  <Picker
                    selectedValue={selectedValue}
                    style={{
                      width: 170,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedValue(itemValue);
                      fetchDestination(itemValue);
                    }}>
                    {/* Tạo Picker.Item từ mỗi phần tử trong mảng cities */}
                    {cities.map(city => (
                      <Picker.Item
                        key={city._id}
                        label={city.name}
                        value={city._id}
                      />
                    ))}
                  </Picker>
                </View>
                <ScrollView className="w-full max-h-40">
                  <View className="flex flex-col items-center justify-start bg-gray-200 rounded-lg pl-1 pr-1">
                    {destinations.map((destination, index) => (
                      <TouchableOpacity
                        key={index}
                        className="flex flex-row items-center justify-center w-full border-b-2 border-white"
                        onPress={() => {
                          console.log(destination._id);
                          setDestinationSelected(destination);
                          toggleModalDestination();
                        }}>
                        <Text className="font-normal text-gray-500 p-1">
                          {destination.travel_destination}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </View>
        </View>
        <TextInput
          className="w-full min-h-40 p-2"
          onChangeText={text => setContent(text)}
          value={content}
          placeholder="Bạn đang nghĩ gì?"
          multiline={true}
        />
        {/* Hiển thị ảnh đã chọn */}
        {imageSource && (
          <Image source={{uri: imageSource}} className="w-full h-60" />
        )}

        <View className="flex flex-row items-center justify-between bg-white">
          <TouchableOpacity onPress={chooseImage} className="m-2">
            <Image
              source={require('../../assets/image.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={requestCameraPermission} className="m-2">
            <Image
              source={require('../../assets/camera.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPost;
