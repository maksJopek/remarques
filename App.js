import 'react-native-gesture-handler';
import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native'
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import NotesList from "./components/NotesList"
import NoteView from "./components/NoteView"
import CategoryView from "./components/CategoryView"
import Options from "./components/Options"
import CustomDrawerContent from "./components/DrawerContent"

import kIcon from "./assets/kebab.png"

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="notesList" component={NotesList} options={{
          title: 'Notes list',
          headerRight: () => <TouchableOpacity onPress={() => window.navigation.navigate("options")}><Image source={kIcon} style={{ width: 30, height: 30, marginRight: 10 }} /></TouchableOpacity>,
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Drawer.Screen name="addNote" component={NoteView} options={{
          title: 'Add note',
          headerStyle: {
            backgroundColor: '#0000FF',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }} />
        <Drawer.Screen name="editNote" component={NoteView} options={{
          title: 'Edit note',
          headerStyle: {
            backgroundColor: 'darkgreen',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }} />
        <Drawer.Screen name="addCategory" component={CategoryView} options={{
          title: 'Add category',
          headerStyle: {
            backgroundColor: 'darkorange',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }} />
        <Drawer.Screen name="options" component={Options} options={{
          title: 'Note list options',
          headerStyle: {
            backgroundColor: 'pink',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
