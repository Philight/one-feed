//import 'react-native-gesture-handler';

import * as React from 'react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import axios from 'axios';

import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer, Link } from '@react-navigation/native';

import TopicsScreen from './src/screens/TopicsScreen.js';

import BurgerNavigation from './src/main/BurgerNavigation.js';
import DataContext from './src/contexts/DataContext.js';

import Loader from './src/util/Loader.js';

import StorageActions from './src/util/StorageActions.js';

import { usePrevious } from './src/util/utilMethods.js';
import { getStorageData, setStorageData, updateStorageData, 
  deleteStorageData, getAllStorageKeys } from './src/data/asyncStorage.js';
import defaultStyles from './src/styles/defaultStyles.js';

import { VARIABLES } from './src/data/ENV.js';
import { LINK_SOURCES, NEWS_SOURCES } from './src/data/NEWS_SOURCES.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const API_GET_DATA_URL = `${VARIABLES.API_HOST+':'+VARIABLES.API_PORT}/one-feed/database/get-data`; 

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [initActionsFinished, setActionsFinished] = useState({ 
    storeDeviceId: false,
    loadStorage: false,
    loadData: false
  });
  const [contextData, setContextData] = useState({  });

  const prevContextData = usePrevious(contextData);

  const getDeviceId = async () => {
    let deviceId = await SecureStore.getItemAsync('deviceId');

    if (!deviceId) {
      deviceId = Constants.deviceId; //or generate uuid
      await SecureStore.setItemAsync('deviceId', deviceId);
    }

    return deviceId;
  }

  const getDeviceIdByOS = async () => {
    if (Platform.OS === 'android') {
      return Application.androidId;

    } else if (Platform.OS === 'ios') {
      let deviceId = await Application.getIosIdForVendorAsync();
      return deviceId;
    }
  }

  const storeDeviceId = async () => {
console.log('### MAIN storeDeviceId | getting devId...');

    if (Platform.OS != 'web') {
      getDeviceIdByOS().then((devId) => {

        if (devId == null || devId == '') {
          getDeviceId().then((deviceId) => {
console.log('+++ DEVICE ID OTHER: '+deviceId);
            setContextData(prevData => ({
              ...prevData,
              userInfo: {
                DEVICE_ID: deviceId
              }
            }));
            setActionsFinished(prevState => ({ ...prevState, storeDeviceId: true }))
            return 'DEVICE_ID set';
          })
        
        } else {
console.log('+++ DEVICE ID BY OS: '+devId);
          setContextData(prevData => ({
            ...prevData,
            userInfo: {
              DEVICE_ID: devId
            }
          }));
          setActionsFinished(prevState => ({ ...prevState, storeDeviceId: true }))
          return 'DEVICE_ID set';
        }
      })
    
    } else {
      const deviceIdTest = 'DEVICE_ID_TEST_WEB';
console.log('+++ DEVICE WEB: '+deviceIdTest);
      setContextData(prevData => ({
        ...prevData,
        userInfo: {
          DEVICE_ID: deviceIdTest
        }
      }));
      setActionsFinished(prevState => ({ ...prevState, storeDeviceId: true }))
      return 'DEVICE_ID set';
    }
  }

/*
  USER SETTINGS
*/
  const loadStorage = async () => {
console.log(`### MAIN loadStorage deviceId: ${contextData.userInfo.DEVICE_ID} | Calling getStorageData`);

    getStorageData(contextData.userInfo.DEVICE_ID).then((jsonData) => {
      if (jsonData != null) {
  console.log('+++ MAIN loadStorage - getStoredData DATA FOUND');
  console.log(jsonData);

        setContextData(prevData => ({
          ...prevData,
          userInfo: {
            ...prevData.userInfo,
            ...jsonData
          },
          guestUser: false,
        }));
        setActionsFinished(prevState => ({ ...prevState, loadStorage: true }))

      } else {
  console.log('--- MAIN loadStorage - getStoredData NO DATA');

        setContextData(prevData => ({
          ...prevData,
          userInfo: {
            ...prevData.userInfo,
            NEWS_SOURCES: { },
            SETTINGS: { 
              MERGE_CATEGORIES: true,
              DEFAULT_TOPIC: null, // catKey/subcatKey
              FEED_PREVIEW: true,
            },
          },
          guestUser: true,
        }));
        setActionsFinished(prevState => ({ ...prevState, loadStorage: true }))
      }
    })
  }

  const loadData = async () => {
console.log('### MAIN loadData');
    try {

      const response = await axios.get(API_GET_DATA_URL);
console.log('### MAIN loadData response');
console.log(response);
console.log(response.data);

      const jsonData = response.data;      
/*
      const jsonData = {
        CATEGORIES: CATEGORIES,
        SUBCATEGORIES: SUBCATEGORIES,
        LINK_SOURCES: LINK_SOURCES,
        NEWS_SOURCES: NEWS_SOURCES,
        SOURCES_LINK: SOURCES_LINK,
      }
*/
      setContextData(prevData => ({
        ...prevData,
        ...jsonData,
        setContextData,
        topicsUpdated: false,
        settingsUpdated: false,
        innerData: {
          ChannelTopics: { 
            newsSource: { }
          }
        }
      }));

    } catch (error) {
      console.error(error);

    } finally {
      setActionsFinished(prevState => ({ ...prevState, loadData: true }))
    }
  }

  const initialOperations = () => {
    storeDeviceId();  // 1.
    loadData(); // 1.
  }

  useEffect(() => {
console.log('### MAIN contextData change');
console.log(prevContextData);
console.log(contextData);
    
    if (prevContextData != undefined) {

      // initial loadStorage, after userInfo.DEVICE_ID was added
      if (!('userInfo' in prevContextData) && ('userInfo' in contextData) ) {
console.log('### MAIN contextData userInfo was added. | Proceeding with loadStorage...');
        loadStorage() // 2.

      // Added/Removed News source, update Storage
      } else if (prevContextData['userInfo'] && prevContextData.userInfo['NEWS_SOURCES'] != undefined
        && (Object.keys(prevContextData.userInfo['NEWS_SOURCES']).length != Object.keys(contextData.userInfo['NEWS_SOURCES']).length)) {
console.log('### MAIN contextData userInfo.NEWS_SOURCES was changed');

        // Add News source 
        if (Object.keys(contextData['userInfo']['NEWS_SOURCES']).length > 0) {
          setContextData(prevContextData => ({
            ...prevContextData,
            guestUser: false // Guest User flag
          }))

          // Set storage
          setStorageData(contextData.userInfo['DEVICE_ID'], { 
            NEWS_SOURCES: contextData.userInfo['NEWS_SOURCES'],
            SETTINGS: contextData.userInfo['SETTINGS'], // temporary solution
          });

        // Empty News sources
        } else {
          setContextData(prevContextData => ({
            ...prevContextData,
            guestUser: true // Guest User flag
          }))

          // Delete storage data
          deleteStorageData(contextData.userInfo['DEVICE_ID']);
        }

      // Categories update flag set, categories were updated
      } else if (prevContextData['topicsUpdated'] == false && contextData['topicsUpdated'] == true) {
console.log('### MAIN contextData topicsUpdated was set to TRUE');
console.log("### MAIN contextData contextData.userInfo['NEWS_SOURCES']");
console.log(contextData.userInfo['NEWS_SOURCES']);

        setStorageData(contextData.userInfo['DEVICE_ID'], { 
          NEWS_SOURCES: contextData.userInfo['NEWS_SOURCES'], 
          SETTINGS: contextData.userInfo['SETTINGS'], // temporary solution
        });

        // Reset update flag
        setContextData(prevContextData => ({
          ...prevContextData,
          topicsUpdated: false
        }))
      
      // SETTINGS Update flag set, settings were updated
      } else if (prevContextData['settingsUpdated'] == false && contextData['settingsUpdated'] == true) {
console.log('### MAIN contextData settingsUpdated was set to TRUE');
console.log("### MAIN contextData contextData.userInfo['SETTINGS']");
console.log(contextData.userInfo['SETTINGS']);
        updateStorageData(contextData.userInfo['DEVICE_ID'], { 
          SETTINGS: contextData.userInfo['SETTINGS'], 
        });

        // Reset update flag
        setContextData(prevContextData => ({
          ...prevContextData,
          settingsUpdated: false
        }))
      } 

    }

  }, [contextData]);

  useEffect(() => {
    if (initActionsFinished.storeDeviceId && initActionsFinished.loadStorage && initActionsFinished.loadData) {
      setLoading(false);
    }
  }, [initActionsFinished]);

  useEffect(() => {
    setLoading(true);

    initialOperations();
  }, []);



  return (
    <DataContext.Provider value={contextData}>
      <NavigationContainer>
        { isLoading ? <Loader /> : 
          <BurgerNavigation /> 
        }

        <StorageActions />

      </NavigationContainer>
    </DataContext.Provider>
  );
}

/*

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import BurgerNavigation from './src/components/BurgerNavigation.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function App() {

  // hide navigation and bottom keys
  React.useEffect(() => {
    StatusBar.setHidden(true);
  }, [])

  return (
    <NavigationContainer>
      <BurgerNavigation />
    </NavigationContainer>
  );
}
export default App;
*/