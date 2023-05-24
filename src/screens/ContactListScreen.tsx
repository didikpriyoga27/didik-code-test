import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchContacts,
  selectContacts,
  deleteContact,
} from '../slices/contactSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

const ContactListScreen = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFetchContacts = useCallback(() => {
    try {
      //@ts-ignore
      dispatch(fetchContacts());
    } catch (error) {
      // Handle any error during refresh
    } finally {
      setIsRefreshing(false);
      setIsDeleting(false);
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchContacts();
  }, [dispatch, handleFetchContacts]);

  const handleDeleteContact = (id: number) => {
    setIsDeleting(true);
    //@ts-ignore
    dispatch(deleteContact(id));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    handleFetchContacts();
  };

  return (
    <SafeAreaView>
      <FlatList
        data={contacts}
        className="p-4"
        contentContainerStyle={{paddingBottom: 16}}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
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
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text>{item.age} Years</Text>
                </View>
              </View>
              {isDeleting ? (
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
