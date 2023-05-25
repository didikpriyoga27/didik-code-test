import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchContactById} from '../slices/contactSlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';
import {useQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';

type ContactDetailScreenRouteProp = RouteProp<
  StackParamList,
  'ContactDetailScreen'
>;

export default function ContactDetailScreen() {
  const dispatch = useDispatch();
  const {params} = useRoute<ContactDetailScreenRouteProp>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const {data: contact, isLoading} = useQuery(
    ['contact', params.contactId],
    () => {
      if (params.contactId) {
        //@ts-ignore
        return dispatch(fetchContactById(params.contactId));
      }
      return null;
    },
  );

  useEffect(() => {
    if (contact) {
      setFirstName(contact?.payload?.firstName);
      setLastName(contact?.payload?.lastName);
      setAge(contact?.payload?.age.toString());
      setPhoto(contact?.payload?.photo);
    }
  }, [contact]);

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
      <TouchableOpacity>
        <View className="bg-teal-700 p-4 m-4 mb-12 rounded-md">
          <Text className="text-white text-center font-bold text-lg">Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
