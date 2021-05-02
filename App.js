import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';

//FIREBAS
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

//IMPORT SEMUA SCREEN
import LoginScreen from './screens/LoginScreen';
import MainMenu from './screens/MainMenu';
import LoadingScreen from './screens/LoadingScreen';
import TempatWisata from './screens/TempatWisata';
import AboutScreen from './screens/AboutScreen';
import TampilanDarat from './screens/TampilanDarat';
import TampilanUdara from './screens/TampilanUdara'
import OlahragaDive from './screens/OlahragaDive';
import Comments from './card/Comments';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default class App extends React.Component{
  render(){
    return <AppNavigator/>;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  MainMenu:MainMenu,
  tempatwisata:TempatWisata,
  about:AboutScreen,
  tampilandarat:TampilanDarat,
  tampilanudara:TampilanUdara,
  olahragadive:OlahragaDive,
  Comments:Comments,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

