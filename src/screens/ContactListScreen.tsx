import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Contact, baseUrl} from '../slices/contactSlice';
import {useQuery} from '@tanstack/react-query';
import PlusIcon from '../shared/assets/svg/PlusIcon';
import ContactItemScreen from '../components/ContactItemScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';
import axios from 'axios';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ContactListScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  const {bottom} = useSafeAreaInsets();

  const {
    data: contacts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery(['contacts'], () =>
    axios.get(baseUrl).then(result => result.data.data),
  );

  const sortedData = useMemo(() => {
    if (contacts?.length) {
      return contacts?.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    }
    return [];
  }, [contacts]);

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
    <View className={`flex-1 bg-white pb-[${bottom}px]`}>
      <FlatList
        data={sortedData}
        className="p-4"
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigate('ContactDetailScreen', {contactId: ''})}
        className={'absolute bottom-12 right-4'}>
        <View className="bg-teal-700 p-4 rounded-full flex-row items-center">
          <PlusIcon />
          <Text className="text-white font-semibold">Add New Contact</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactListScreen;
