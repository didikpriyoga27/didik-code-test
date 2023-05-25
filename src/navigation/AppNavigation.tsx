import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from './StackParamList';
import ContactListScreen from '../screens/ContactListScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          navigationBarColor: '#0f766e',
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          options={{title: 'Contacts'}}
          name="ContactListScreen"
          component={ContactListScreen}
        />
        <Stack.Screen
          options={{title: 'Detail'}}
          name="ContactDetailScreen"
          component={ContactDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
