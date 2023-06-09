import React, {memo, useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Contact, baseUrl} from '../slices/contactSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';
import DeleteIcon from '../shared/assets/svg/DeleteIcon';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

type Props = {
  item: Contact;
};

function ContactItemScreen({item}: Props) {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const [isDisableTouch, setIsDisableTouch] = useState(false);

  const queryClient = useQueryClient();

  const deleteContactMutation = useMutation(() =>
    axios.delete(`${baseUrl}/${item.id}`).then(() => {
      queryClient.refetchQueries(['contacts']);
    }),
  );

  const handleDeleteContact = async () => {
    setIsDisableTouch(true);
    await deleteContactMutation.mutateAsync();
    setIsDisableTouch(false);
  };

  return (
    <TouchableOpacity
      disabled={isDisableTouch}
      onPress={() => navigate('ContactDetailScreen', {contactId: item.id})}
      className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        <FastImage
          source={{uri: item.photo}}
          className="w-12 h-12 mr-4 rounded-full bg-gray-300"
        />
        <View className="flex-1 flex-row items-center border-b border-gray-300 pb-3">
          <View className="flex-1">
            <Text className="font-bold text-black">
              {item.firstName} {item.lastName}
            </Text>
            <Text className={'text-black'}>{item.age} Years</Text>
          </View>
          <View className="p-2 w-8 h-8 items-center justify-center">
            {deleteContactMutation.isLoading ? (
              <ActivityIndicator size="large" color={'#b91c1c'} />
            ) : (
              <TouchableOpacity onPress={handleDeleteContact}>
                <DeleteIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ContactItemScreen);
