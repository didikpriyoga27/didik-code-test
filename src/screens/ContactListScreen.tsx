import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchContacts, deleteContact} from '../slices/contactSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from '@tanstack/react-query';

const ContactListScreen = () => {
  const dispatch = useDispatch();

  const {
    data: contacts,
    isLoading,
    refetch,
    isRefetching,
    //@ts-ignore
  } = useQuery(['contacts'], () => dispatch(fetchContacts()), {
    staleTime: 50 * 5 * 1000,
    cacheTime: 60 * 15 * 1000,
  });

  //@ts-ignore
  const deleteContactMutation = useMutation((id: number) =>
    //@ts-ignore
    dispatch(deleteContact(id)),
  );
  const handleDeleteContact = async (id: number) => {
    //@ts-ignore
    await deleteContactMutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={contacts?.payload}
        className="p-4"
        contentContainerStyle={{paddingBottom: 16}}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({item}) => {
          return (
            <View className="flex-row items-center justify-between bg-slate-300 mb-4 p-2 rounded-md">
              <View className="flex-row items-center">
                <Image
                  source={{uri: item.photo}}
                  className="w-16 h-16 mr-4 rounded-full"
                />
                <View>
                  <Text className="font-bold">
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text>{item.age} Years</Text>
                </View>
              </View>
              {deleteContactMutation.isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={'red'}
                  className="px-4"
                />
              ) : (
                <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
                  <Text>Hapus</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ContactListScreen;
