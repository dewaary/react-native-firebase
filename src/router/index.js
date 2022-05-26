import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  CreateContact,
  DetailContact,
  EditContact,
} from '../screens';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateContact"
        component={CreateContact}
        options={{title: 'Create Contact'}}
      />
      <Stack.Screen
        name="DetailContact"
        component={DetailContact}
        options={{title: 'Detail Contact'}}
      />
      <Stack.Screen
        name="EditContact"
        component={EditContact}
        options={{title: 'Edit Contact'}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
