import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native';
import apiInstance from '../../configs/apiInstance';

type RootStackParamList = {
  Profile: {
    work: string;
    study: string;
    hobby: string;
    location: string;
    hometown: string;
    avatar: string;
    background: string;
  };
};

type ScreenBRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type Props = {
  navigation: any;
  route: ScreenBRouteProp;
};
const EditInfoPublic = (props: Props) => {
  const {work, study, hobby, location, hometown, avatar, background} =
    props.route.params;
  const [workEdit, setWorkEdit] = useState(work);
  const [studyEdit, setStudyEdit] = useState(study);
  const [hobbyEdit, setHobbyEdit] = useState(hobby);
  const [locationEdit, setLocationEdit] = useState(location);
  const [hometownEdit, setHometownEdit] = useState(hometown);

  const [imageAvatar, setImageAvatar] = useState<any>(avatar);
  const [imageBackground, setImageBackground] = useState<any>(background);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [isSaving, setIsSaving] = useState(false);

  // Hàm chọn ảnh từ thiết bị
  const chooseImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageAvatar(response.assets[0].uri);
      }
    });
  };

  const chooseBackground = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        setImageBackground(response.assets[0].uri);
      }
    });
  };

  const saveInfo = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      if (imageAvatar !== avatar) {
        formData.append('avatar', {
          uri: imageAvatar,
          type: 'image/jpeg', // Hoặc 'image/png'
          name: 'avatar.jpg',
        });
      }
      if (imageBackground !== background) {
        formData.append('background', {
          uri: imageBackground,
          type: 'image/jpeg', // Hoặc 'image/png'
          name: 'background.jpg',
        });
      }
      formData.append('work', workEdit);
      formData.append('study', studyEdit);
      formData.append('hobby', hobbyEdit);
      formData.append('location', locationEdit);
      formData.append('hometown', hometownEdit);
      const response = await apiInstance.post('/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.data;
      console.log(result);
      if (result.status_code === 200) {
        console.log('Save info success');
        props.navigation.goBack();
      } else {
        console.log('Save info failed');
      }
    } catch (error) {
      console.log("Can't connect to server", error);
    }
  };

  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row items-center justify-between bg-white border-b-2 border-gray-200">
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          className="flex-row items-center justify-start w-8 h-8 rounded-full flex items-center justify-center m-2 hover:bg-gray-300">
          <Image
            source={require('../../assets/back.png')}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <Text className="text-base font-bold m-4 text-start text-black">
          Chỉnh sửa trang cá nhân
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (
              workEdit !== work ||
              studyEdit !== study ||
              hobbyEdit !== hobby ||
              locationEdit !== location ||
              hometownEdit !== hometown ||
              imageAvatar !== avatar ||
              imageBackground !== background
            ) {
              // Kiểm tra inputText không trống
              saveInfo();
            }
          }}
          disabled={
            isSaving ||
            (workEdit === work &&
              studyEdit === study &&
              hobbyEdit === hobby &&
              locationEdit === location &&
              hometownEdit === hometown &&
              imageAvatar === avatar &&
              imageBackground === background)
          }>
          <Text
            className={
              isSaving ||
              (workEdit === work &&
                studyEdit === study &&
                hobbyEdit === hobby &&
                locationEdit === location &&
                hometownEdit === hometown &&
                imageAvatar === avatar &&
                imageBackground === background)
                ? 'text-xl font-bold m-4 text-start text-blue-200'
                : 'text-xl font-bold m-4 text-start text-blue-500'
            }>
            {isSaving ? 'Đang lưu...' : 'Lưu'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-col items-center justify-center gap-2 pl-3 pr-3">
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Ảnh đại diện
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={chooseImage}>
              <Text className="text-base font-normal text-center text-blue-400">
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center w-full pb-4 border-b-2 border-gray-100">
            <TouchableOpacity
              className="rounded-full border-2 border-gray-300"
              onPress={chooseImage}>
              <Image
                source={
                  imageAvatar !== ''
                    ? {uri: imageAvatar}
                    : require('../../assets/avatar.png')
                }
                className="w-48 h-48 rounded-full"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Ảnh bìa
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={chooseBackground}>
              <Text className="text-base font-normal text-center text-blue-400">
                Thêm
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center w-full pb-4 border-b-2 border-gray-100">
            <TouchableOpacity
              className="rounded-lg border-2 border-gray-100 w-full"
              onPress={chooseBackground}>
              <Image
                source={
                  imageBackground !== ''
                    ? {uri: imageBackground}
                    : require('../../assets/avatar.png')
                }
                className="w-full h-48 rounded-lg"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-start justify-between w-full pt-2">
            <View className="flex flex-col items-center justify-start ml-2">
              <Text className="text-xl font-bold text-center text-black">
                Chi tiết
              </Text>
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 pr-2"
              onPress={() => toggleModal()}>
              <Text className="text-base font-normal text-center text-blue-400">
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/work.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {workEdit === '' ? 'Công việc' : workEdit}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/school.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {studyEdit === '' ? 'Trường học' : studyEdit}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/heart-fill.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {hobbyEdit === '' ? 'Sở thích' : hobbyEdit}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/home.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {locationEdit === '' ? 'Tỉnh/Thành phố hiện tại' : locationEdit}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-start gap-2 w-full">
            <Image
              source={require('../../assets/address.png')}
              className="w-5 h-5 opacity-50"
            />
            <Text className="text-base font-normal text-center text-black">
              {hometownEdit === '' ? 'Quê quán' : hometownEdit}
            </Text>
          </View>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            className="m-1">
            <View className="w-full  bg-white rounded-lg p-4">
              <Text className="text-xl font-bold text-center text-black">
                Chỉnh sửa thông tin cá nhân
              </Text>
              <TextInput
                className="w-full h-10 border-2 border-gray-200 rounded-lg mt-2 pl-2"
                placeholder="Công việc"
                value={workEdit}
                onChangeText={text => {
                  setWorkEdit(text);
                }}
              />
              <TextInput
                className="w-full h-10 border-2 border-gray-200 rounded-lg mt-2 pl-2"
                placeholder="Trường học"
                value={studyEdit}
                onChangeText={text => {
                  setStudyEdit(text);
                }}
              />
              <TextInput
                className="w-full h-10 border-2 border-gray-200 rounded-lg mt-2 pl-2"
                placeholder="Sở thích"
                value={hobbyEdit}
                onChangeText={text => {
                  setHobbyEdit(text);
                }}
              />
              <TextInput
                className="w-full h-10 border-2 border-gray-200 rounded-lg mt-2 pl-2"
                placeholder="Tỉnh/Thành phố hiện tại"
                value={locationEdit}
                onChangeText={text => {
                  setLocationEdit(text);
                }}
              />
              <TextInput
                className="w-full h-10 border-2 border-gray-200 rounded-lg mt-2 pl-2"
                placeholder="Quê quán"
                value={hometownEdit}
                onChangeText={text => {
                  setHometownEdit(text);
                }}
              />
              <TouchableOpacity
                className="w-full h-10 bg-blue-500 rounded-lg mt-2 flex items-center justify-center"
                onPress={() => toggleModal()}>
                <Text className="text-white font-semibold text-center text-base">
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditInfoPublic;
