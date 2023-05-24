import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from './StackParamList';
import ContactListScreen from '../screens/ContactListScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: 'Contacts'}}
          name="ContactListScreen"
          component={ContactListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
