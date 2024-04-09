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
const NewDestination = (props: Props) => {
  const fullname =
    store.getState().auth.last_name + ' ' + store.getState().auth.first_name;
  const [cities, setCities] = useState<any[]>([]);
  const [newCity, setNewCity] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [destinations, setDestinations] = useState('');
  const [description, setDescription] = useState('');

  const [imageDestination, setImageDestination] = useState<any>(null);
  const [imageCity, setImageCity] = useState<any>(null);
  const [isModalVisiblePrivacy, setIsModalVisiblePrivacy] = useState(false);
  const [isModalVisibleDestination, setIsModalVisibleDestination] =
    useState(false);
  const [selectedCity, setSelectedCity] = useState<any>({});
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const toggleModalNewCity = () => {
    setIsModalVisiblePrivacy(!isModalVisiblePrivacy);
  };
  const toggleModalDestination = () => {
    setIsModalVisibleDestination(!isModalVisibleDestination);
    if (!isModalVisibleDestination) {
      fetchCity();
    }
  };

  // Hàm chọn ảnh từ thiết bị
  const chooseImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageDestination(response.assets[0].uri);
      }
    });
  };
  const chooseImageCity = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageCity(response.assets[0].uri);
      }
    });
  };

  const chooseCameraCity = () => {
    ImagePicker.launchCamera({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageCity(response.assets[0].uri);
      }
    });
  };

  const chooseCamera = () => {
    ImagePicker.launchCamera({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageDestination(response.assets[0].uri);
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

  const requestCameraPermissionCity = async () => {
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
        chooseCameraCity();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const createPost = async (imageDestination: string, imageCity: string) => {
    try {
      setIsCreatingPost(true);
      let response;
      const formData = new FormData();
      if (imageDestination !== null) {
        formData.append('image_destination', {
          uri: imageDestination,
          type: 'image/jpeg', // Hoặc 'image/png'
          name: 'photo.jpg',
        });
      }

      formData.append('destination', destinations);
      formData.append('description', description);
      if (selectedCity._id === undefined) {
        formData.append('name', newCity);
        formData.append('country', newLocation);
        if (imageCity !== null) {
          formData.append('image_city', {
            uri: imageCity,
            type: 'image/jpeg', // Hoặc 'image/png'
            name: 'photo.jpg',
          });
        }
        response = await apiInstance.post(
          '/travel/city-destinations',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } else {
        formData.append('city_id', selectedCity._id);
        response = await apiInstance.post('/travel/destinations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

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
          Tạo địa điểm du lịch
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (destinations.trim() !== '') {
              // Kiểm tra inputText không trống
              createPost(imageDestination, imageCity);
            }
          }}
          disabled={isCreatingPost || destinations.trim() === ''}>
          <Text
            className={
              isCreatingPost || destinations.trim() === ''
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
            onPress={() => props.navigation.navigate('Profile')}>
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
              <TouchableOpacity onPress={toggleModalNewCity}>
                <View className="flex flex-row items-center justify-start bg-blue-100 rounded-lg pl-1 pr-1">
                  <Image
                    source={require('../../assets/add.png')}
                    style={{width: 15, height: 15, tintColor: '#4299e1'}}
                  />
                  <Text className="font-bold text-gray-500 p-1 color-blue-500">
                    Thêm địa điểm
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
                    {selectedCity.name !== undefined
                      ? selectedCity.name
                      : newCity !== ''
                      ? newCity
                      : 'Chọn địa điểm'}
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
              onBackdropPress={toggleModalNewCity}
              className="m-1">
              <View className="w-full  bg-white rounded-lg p-4">
                <Text className="text-lg font-bold text-start text-black">
                  Địa điểm du lịch không nằm trong địa điểm hiện có?
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn có thể thêm địa điểm du lịch mới
                </Text>
                <Text className="text-xs font-normal text-start text-gray-500 pb-2">
                  Bạn hãy cung cấp thông tin về địa điểm du lịch mà bạn muốn
                  thêm
                </Text>
                <Text className="text-lg font-bold text-start text-black pb-2">
                  Thêm địa điểm
                </Text>
                <TextInput
                  className="border-b-2 border-gray-200 w-5/6 pb-2"
                  placeholder="Tên thành phố"
                  onChangeText={text => setNewCity(text)}
                  value={newCity}
                />
                <TextInput
                  className="border-b-2 border-gray-200 w-5/6 pb-2"
                  placeholder="Quốc gia"
                  onChangeText={text => setNewLocation(text)}
                  value={newLocation}
                />

                <View className="flex flex-row items-center justify-between bg-white">
                  <Text className="text-lg font-bold text-start text-black pb-2">
                    Chọn ảnh
                  </Text>
                  <View className="flex flex-row items-center justify-between bg-white">
                    <TouchableOpacity onPress={chooseImageCity} className="m-2">
                      <Image
                        source={require('../../assets/image.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={requestCameraPermissionCity}
                      className="m-2">
                      <Image
                        source={require('../../assets/camera.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {imageCity !== null ? (
                  <View className="flex flex-row items-center justify-center bg-white">
                    <Image source={{uri: imageCity}} className="w-1/2 h-24 " />
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    toggleModalNewCity();
                  }}
                  className="flex flex-row items-center justify-center bg-blue-100 rounded-lg p-2 mt-2">
                  <Image
                    source={require('../../assets/add.png')}
                    style={{width: 15, height: 15, tintColor: '#4299e1'}}
                  />
                  <Text className="font-bold text-gray-500 p-1 color-blue-500">
                    Thêm địa điểm
                  </Text>
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
                    selectedValue={selectedCity}
                    style={{
                      width: 170,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      const selectedCityObject = cities.find(
                        city => city._id === itemValue,
                      );
                      console.log(selectedCityObject);
                      setSelectedCity(selectedCityObject);
                      toggleModalDestination();
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
              </View>
            </Modal>
          </View>
        </View>
        <TextInput
          className="w-full min-h-40 p-2"
          placeholder="Bạn có biết địa điểm du lịch mới?"
          onChangeText={text => setDestinations(text)}
          value={destinations}
        />
        <TextInput
          className="w-full min-h-40 p-2"
          onChangeText={text => setDescription(text)}
          value={description}
          placeholder="Bạn đang nghĩ gì về địa điểm này?"
          multiline={true}
        />
        {/* Hiển thị ảnh đã chọn */}
        {imageDestination !== null ? (
          <Image source={{uri: imageDestination}} className="w-full h-60" />
        ) : null}

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

export default NewDestination;
