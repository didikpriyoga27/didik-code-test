import React, {useEffect, useState} from 'react';
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
    console.log(contact);
    if (contact) {
      setFirstName(contact?.firstName);
      setLastName(contact?.lastName);
      setAge(contact?.age?.toString());
      setPhoto(contact?.photo);
    }
  }, [contact]);

  const {mutateAsync, isLoading: isEditLoading} = useMutation(async () => {
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
    await mutateAsync().then(() => {
      ToastAndroid.show('Contact edited successfully', ToastAndroid.SHORT);
      queryClient.refetchQueries(['contacts']);
      queryClient.refetchQueries(['contacts', params.contactId]);
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
          source={{uri: photo}}
          className="w-24 h-24 mr-4 rounded-full bg-gray-300 self-center mt-4"
        />
        <Text className="px-4 mt-4 text-black font-bold">First Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <Text className="px-4 mt-4 text-black font-bold">Last Name:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <Text className="px-4 mt-4 text-black font-bold">Age:</Text>
        <TextInput
          className="border border-gray-300 px-4 mx-4 rounded-md"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter Age"
        />
      </ScrollView>
      <TouchableOpacity onPress={handleSave}>
        <View className="bg-teal-700 p-3 m-4 mb-12 rounded-md">
          {isEditLoading ? (
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
