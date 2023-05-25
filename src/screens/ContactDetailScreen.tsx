import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {baseUrl} from '../slices/contactSlice';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

type ContactDetailScreenRouteProp = RouteProp<
  StackParamList,
  'ContactDetailScreen'
>;

export default function ContactDetailScreen() {
  const queryClient = useQueryClient();

  const {params} = useRoute<ContactDetailScreenRouteProp>();
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const defaultAvatar = useMemo(() => {
    if (params.contactId) {
      return null;
    }
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0f766e&color=fff`;
  }, [firstName, lastName, params.contactId]);

  const {data: contact, isLoading} = useQuery(
    ['contact', params.contactId],
    () => {
      if (params.contactId) {
        return axios
          .get(`${baseUrl}/${params.contactId}`)
          .then(result => result.data.data);
      }
      return null;
    },
  );

  useEffect(() => {
    if (contact) {
      setFirstName(contact?.firstName);
      setLastName(contact?.lastName);
      setAge(contact?.age?.toString());
      setPhoto(contact?.photo);
    }
  }, [contact]);

  const {mutateAsync: mutateSaveContact, isLoading: isSaveLoading} =
    useMutation(async () => {
      axios.post(`${baseUrl}`, {
        firstName,
        lastName,
        age: Number(age),
        photo: defaultAvatar,
      });
    });

  const {mutateAsync: mutateEditContact, isLoading: isEditLoading} =
    useMutation(async () => {
      if (params.contactId) {
        const response = axios.put(`${baseUrl}/${params.contactId}`, {
          firstName,
          lastName,
          age: Number(age),
          photo,
        });
        return response;
      }
    });

  const handleSave = async () => {
    if (params.contactId) {
      return mutateEditContact().then(() => {
        ToastAndroid.show('Contact edited successfully', ToastAndroid.SHORT);
        queryClient.refetchQueries(['contacts']);
        queryClient.refetchQueries(['contacts', params.contactId]);
        setTimeout(() => {
          goBack();
        }, 500);
      });
    }
    return mutateSaveContact().then(() => {
      ToastAndroid.show('Contact saved successfully', ToastAndroid.SHORT);
      queryClient.refetchQueries(['contacts']);
      setTimeout(() => {
        goBack();
      }, 500);
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="bg-white flex-1">
      <ScrollView keyboardShouldPersistTaps={'handled'} className="flex-1">
        <FastImage
          source={{uri: params.contactId ? photo : defaultAvatar ?? ''}}
          className="w-24 h-24 mr-4 rounded-full bg-gray-300 self-center mt-4"
        />
        <Text className="px-4 mt-4 text-black font-bold">First Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <Text className="px-4 mt-4 text-black font-bold">Last Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <Text className="px-4 mt-4 text-black font-bold">Age:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md text-black"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter Age"
        />
      </ScrollView>
      <TouchableOpacity
        className="bg-teal-700 m-4 mb-12 rounded-md h-12 justify-center"
        disabled={!firstName || !lastName || !age}
        onPress={handleSave}>
        <View>
          {isEditLoading || isSaveLoading ? (
            <ActivityIndicator color={'white'} size={'small'} />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Save
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
