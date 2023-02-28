import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import ImagePage from '../screens/ImagePage';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'blueviolet'
          },
        }}
        drawerContent={props => (
          <DrawerContent {...props} />
        )}
      >
        <Drawer.Screen name="Images" component={ImagePage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;