import { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, Pressable, SafeAreaView, View, ScrollView, 
  FlatList, VirtualizedList, Text, StyleSheet, Switch, Dimensions } from 'react-native';
import { Link } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'

//import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

import DataContext from '../contexts/DataContext.js';

import SectionHeading from '../components/SectionHeading.js';
import HelpText from '../components/HelpText.js';

import SearchBar from '../components/SearchBar.js';
 
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
});

function BackgroundLayer() {
  return (
    <View style={{ 
      backgroundColor: "#AD0000", 
      width: defaultStyles.screenDimensions.width, height: 120, 
      position: 'absolute', top: 0, left: 0, zIndex: -10 }} 
    />
  );
}

function SettingsNewsFeedScreen(props) {
  const { title } = props;

  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;
  const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const USER_NEWS_SOURCES = contextData.userInfo['NEWS_SOURCES'];
  const USER_SETTINGS = contextData.userInfo['SETTINGS'];
  const ISGUESTUSER = contextData.guestUser;

  const [mergeIsEnabled, setMergeIsEnabled] = useState(USER_SETTINGS['MERGE_CATEGORIES']);
  const [previewIsEnabled, setPreviewIsEnabled] = useState(USER_SETTINGS['FEED_PREVIEW']);

//  const [selected, setSelected] = useState("");
  const [categoriesList, setCategoriesList] = useState( [] );

  useEffect(() => {
    let categoriesList = [];

    if (ISGUESTUSER) {
      const catKeys = ['top', 'world', 'polit', 'culture', 'tech'];
      for (let catKey of catKeys) {
        categoriesList.push({ key: catKey, value: CATEGORIES[catKey]['name'] });
      }

    } else {
      for (let newsSource in USER_NEWS_SOURCES) {
        const newsCategories = USER_NEWS_SOURCES[newsSource]['categories'];
        for (let catKey in newsCategories) {

          if (USER_SETTINGS && USER_SETTINGS.MERGE_CATEGORIES == false && newsCategories[catKey].length > 0) {
            for (let subcatKey of newsCategories[catKey]) {
              categoriesList.push({ key: subcatKey, value: SUBCATEGORIES[subcatKey]['name'] });
            }

          } else {
            categoriesList.push({ key: catKey, value: CATEGORIES[catKey]['name'] });
          }
/*
          if (categoriesList.indexOf({ key: catKey, value: CATEGORIES[catKey]['category'] }) === -1){
            categoriesList.push({ key: catKey, value: CATEGORIES[catKey]['category'] });
          }
*/
        }
      }

      categoriesList = categoriesList.reduce((acc, item) => {
        if(!acc.find(other => item.key == other.key)) {
          acc.push(item);
        }

        return acc;
      }, []);
    } 
    /*
    else if (USER_SETTINGS && USER_SETTINGS.MERGE_CATEGORIES == true) {
    }
    */

    categoriesList.sort((a, b) => a.key.localeCompare(b.key));
console.log(`### SettingsNewsFeedScreen useEffect categoriesList`);    
console.log(categoriesList);    
    setCategoriesList(categoriesList);

  }, [USER_SETTINGS['MERGE_CATEGORIES']])


  const toggleMergeCategories = () => {
console.log('### SettingsNewsFeedScreen toggleMergeCategories');
    const TOGGLED_MERGE = !mergeIsEnabled;
    contextData.setContextData(prevData => ({
      ...prevData,
      userInfo: {
        ...prevData.userInfo,
        SETTINGS: {
          ...prevData.userInfo['SETTINGS'],
          MERGE_CATEGORIES: TOGGLED_MERGE,
        }
      },
      settingsUpdated: true,
    }))
    setMergeIsEnabled(TOGGLED_MERGE);
  }

  const defaultTopicOption = () => {
    return CATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) ? { [USER_SETTINGS['DEFAULT_TOPIC']]: CATEGORIES[USER_SETTINGS['DEFAULT_TOPIC']] } 
      : { [USER_SETTINGS['DEFAULT_TOPIC']] : SUBCATEGORIES[USER_SETTINGS['DEFAULT_TOPIC']] } 
  }

  const updateDefaultTopic = (key) => {
    contextData.setContextData(prevData => ({
      ...prevData,
      userInfo: {
        ...prevData.userInfo,
        SETTINGS: {
          ...prevData.userInfo['SETTINGS'],
          DEFAULT_TOPIC: key,
        }
      },
      settingsUpdated: true,
    }))
  }

  const togglePreviewPosts = () => {
console.log('### SettingsNewsFeedScreen togglePreviewPosts');
    const TOGGLED_PREVIEW = !previewIsEnabled;
    contextData.setContextData(prevData => ({
      ...prevData,
      userInfo: {
        ...prevData.userInfo,
        SETTINGS: {
          ...prevData.userInfo['SETTINGS'],
          FEED_PREVIEW: TOGGLED_PREVIEW,
        }
      },
      settingsUpdated: true,
    }))
    setPreviewIsEnabled(TOGGLED_PREVIEW);
  }

  return (
    <View
      nativeID="settings-news-feed-screen"
      style={[{ 
        flex: 1, flexGrow: 1, 
        alignItems: 'center',
        backgroundColor: "#FFF", 
        width: defaultStyles.screenDimensions.width,
        paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal, 

      }]}
    >
      <BackgroundLayer />

      <ScrollView
        nativeID="topics-scrollView"
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{width: '100%'}}
      >
        <SearchBar />

        <View
          style={[
            {
    //          flex: 1,
              height: 600,
              width: '97%',
              marginHorizontal: '1.5%',
              marginTop: 10,
              paddingVertical: 30,
              paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal,
              borderRadius: 20,
              backgroundColor: '#FFF',
            },
            defaultStyles.shadowProps,
          ]}
        >
          <SectionHeading heading={title} underlineStyle={{ width: 10, left: 176.2, bottom: -2 }} />

          {/* MERGE CATEGORIES/SUBCATEGORIES */}
          <Pressable style={{ //borderColor: 'red', borderWidth: 1, 
            flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between',
            marginTop: 22, 
          }} onPress={toggleMergeCategories}>
            <Text style={{ fontSize: 11, }}>
              Merge Subcategories into Categories
            </Text> 
            <Switch
              trackColor={{ true: "#f4f3f4", false: "#767577", }}
              thumbColor={mergeIsEnabled ? defaultStyles.colorPalette.red1 : "#f4f3f4"}
              activeThumbColor={defaultStyles.colorPalette.red1}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleMergeCategories}
              value={mergeIsEnabled}
            />
          </Pressable>

          {/* DEFAULT TOPIC */}
          <Pressable style={{ //borderColor: 'red', borderWidth: 1, 
            flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between',
            marginTop: 22, 
            zIndex: 10,
          }}>
            <Text style={{ fontSize: 11, }}>
              Default Category/Subcategory
            </Text> 
            <SelectList 
              setSelected={(key) => updateDefaultTopic(key)} 
              defaultOption={{ 
                key: USER_SETTINGS['DEFAULT_TOPIC'], 
                value: CATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) 
                  ? CATEGORIES[USER_SETTINGS['DEFAULT_TOPIC']]['name'] : SUBCATEGORIES[USER_SETTINGS['DEFAULT_TOPIC']] ? SUBCATEGORIES[USER_SETTINGS['DEFAULT_TOPIC']]['name'] : '', 
              }}
              data={categoriesList} 
              save="key"
              style={{ 
                borderWidth: 1, borderColor: 'purple',
              }}
              boxStyles={{ 
//                borderWidth: 1, borderColor: 'red',
                position: 'absolute', top: -10, right:0, 
                alignItems: 'center', //justifyContent: 'flex-end',
//                width: 140, 
                maxWidth: 140,
                paddingVertical: 0, paddingLeft: 10, paddingRight: 4,
              }}
              dropdownStyles={{ 
                borderWidth: 1, borderColor: 'orange', 
                position: 'absolute', right: 0, top: 6,
//                width: 130, 
              }}
              dropdownItemStyles={{
                backgroundColor: '#FFF', 
//                zIndex: 100,

              }}
              inputStyles={{  
//                borderWidth: 1, borderColor: 'blue',
                display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                fontSize: 10,
                padding: 0, margin: 0,
              }}
              dropdownTextStyles={{
                fontSize: 10,
              }}
            />
          </Pressable> 

          {/* PREVIEW MODE */}
          <Pressable style={{ //borderColor: 'red', borderWidth: 1, 
            flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between',
            marginTop: 22, 
          }} onPress={togglePreviewPosts}>
            <Text style={{ fontSize: 11, }}>
              Feed Posts: Preview Mode
            </Text> 
            <Switch
              trackColor={{ true: "#f4f3f4", false: "#767577", }}
              thumbColor={previewIsEnabled ? defaultStyles.colorPalette.red1 : "#f4f3f4"}
              activeThumbColor={defaultStyles.colorPalette.red1}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePreviewPosts}
              value={previewIsEnabled}
            />
          </Pressable>  


        </View>

      </ScrollView>
    </View>
  );
}

export default SettingsNewsFeedScreen;                                               