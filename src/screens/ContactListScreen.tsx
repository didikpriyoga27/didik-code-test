import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Contact, fetchContacts} from '../slices/contactSlice';
import {useQuery} from '@tanstack/react-query';
import PlusIcon from '../shared/assets/svg/PlusIcon';
import ContactItemScreen from '../components/ContactItemScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';

const ContactListScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const dispatch = useDispatch();

  const {
    data: contacts,
    isLoading,
    refetch,
    isRefetching,
    //@ts-ignore
  } = useQuery(['contacts'], () => dispatch(fetchContacts()));

  const renderItem = useCallback((props: {item: Contact}) => {
    return <ContactItemScreen {...props} />;
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={contacts?.payload}
        className="p-4"
        contentContainerStyle={{paddingBottom: 16}}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigate('ContactDetailScreen', {contactId: ''})}
        className="absolute bottom-12 right-4">
        <View className="bg-teal-700 p-4 rounded-full flex-row items-center">
          <PlusIcon />
          <Text className="text-white font-semibold">Add New Contact</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactListScreen;
