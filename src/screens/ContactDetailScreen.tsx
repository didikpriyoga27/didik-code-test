import {View, Text} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../navigation/StackParamList';

export default function ContactDetailScreen() {
  const {params} = useRoute<RouteProp<StackParamList, 'ContactDetailScreen'>>();
  console.log(params.contactId);
  return (
    <View>
      <Text>ContactDetailScreen</Text>
    </View>
  );
}
