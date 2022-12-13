import { useContext, useState, useEffect, useRef, createRef } from 'react';
import { Pressable, TouchableOpacity,TouchableWithoutFeedback, SafeAreaView, View, 
  ScrollView, VirtualizedList, Text, StyleSheet, ImageBackground } from 'react-native';
import { Link, useRoute, useIsFocused, useNavigation, useNavigationState  } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

//import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DataContext from '../contexts/DataContext.js';
import CategoryLabel from '../components/CategoryLabel.js';
import CategoriesList from '../components/CategoriesList.js';
import NewsFeed from '../components/NewsFeed.js';
import SearchBar from '../components/SearchBar.js';
import PostModal from '../components/PostModal.js';
import Icon from '../components/Icon.js';

import LogoLoader from '../util/LogoLoader.js';
import Loader from '../util/Loader.js';
import { usePrevious } from '../util/utilMethods.js';
//import { styleHTML, formatPubDate } from '../util/parsingMethods.js';
 
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
});

function HomeScreen() {
//  const route = useRoute();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;
  const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const USER_NEWS_SOURCES = contextData['userInfo']['NEWS_SOURCES'];
  const USER_SETTINGS = contextData['userInfo']['SETTINGS'];

  const [isLoading, setLoading] = useState(true);

  const [navState, setNavState] = useState({});
  const prevNavState = usePrevious(navigation.getState());

//  const [modalShown, setModalShown] = useState(false);
  const modalRef = useRef(null);
//  const modalRef = createRef(null);

  const [activeTopic, setActiveTopic] = useState({ 
    category: CATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) ? USER_SETTINGS['DEFAULT_TOPIC'] :'', 
    subcategory: SUBCATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) ? USER_SETTINGS['DEFAULT_TOPIC'] :'', 
//    category: '', subcategory: 'dance' 
  });

  useEffect(() => {
console.log('### HomeScreen initial useEffect');
    if (USER_SETTINGS['DEFAULT_TOPIC']) {
      let catKey = CATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) ? USER_SETTINGS['DEFAULT_TOPIC'] : '';
      let subcatKey = SUBCATEGORIES.hasOwnProperty(USER_SETTINGS['DEFAULT_TOPIC']) ? USER_SETTINGS['DEFAULT_TOPIC'] : '';
      
      setActiveTopic( { category: catKey, subcategory: subcatKey, } )

    } else if (USER_NEWS_SOURCES && Object.keys(USER_NEWS_SOURCES).length > 0) {
      const newsSource = Object.keys(USER_NEWS_SOURCES)[0];
      const newsCategories = USER_NEWS_SOURCES[newsSource]['categories'];

      let catKey = Object.keys(newsCategories)[0];
      let subcatKey = '';
      if (USER_SETTINGS && USER_SETTINGS['MERGE_CATEGORIES'] == false) {
        if (newsCategories[catKey].length > 0) {
          subcatKey = newsCategories[catKey][0];
        }
//console.log('### HomeScreen subcatKey');
//console.log(subcatKey);
//console.log('### HomeScreen catKey');
//console.log(catKey);
      }

      setActiveTopic( { category: subcatKey? '' : catKey, subcategory: subcatKey? subcatKey : '', } )
    }
  }, [USER_SETTINGS['DEFAULT_TOPIC']])


  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    } else {
      setLoading(true);
    }
  }, [isFocused]);

  useEffect(() => {
//    alert(`### NAV listen useEffect`);
    const stateChange = navigation.addListener('state', () => {
//      alert('### STATE listen useEffect');
      console.log('### STATE listen useEffect');
      setNavState(navigation.getState());
      console.log(`### navigation.getState():`);
      console.log(navState);
      console.log(navigation.getState());
      console.log(`### navigation.prevState():`);
      console.log(prevNavState);
    });

    return stateChange;
  }, [navigation]);



  const openModal = (post) => {
console.log('#HomeScreen openModal');
//console.log(post);
//console.log(modalRef.current);
    modalRef.current.openModal(post);
//    setModalShown(true);
//    navigation.setOptions({headerShown: false});
  }


  const FullscreenLoader = () => {
    return (
      <View style={{ //borderWidth: 1, borderColor: 'red',
        position: 'absolute', width: '100%', height: defaultStyles.screenDimensions.height+defaultStyles.screenDimensions.headerHeight, 
        top: -defaultStyles.screenDimensions.headerHeight, zIndex: 10, backgroundColor: '#FFF', justifyContent: 'center' }}
      >
        <LogoLoader />
      </View>
    )
  }

  //if (isFocused) {
  return !isFocused ? <></> 
    : isLoading ? <FullscreenLoader />
    : ( 
      <View 
        nativeID="home-screen"
        style={[{ 
  //        borderWidth: 2, borderColor: 'red',
          flex: 1, alignItems: 'center', justifyContent: 'center', 
          paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal, 
          backgroundColor: "#FFF", 
          width: defaultStyles.screenDimensions.width,
          position: 'relative',
        }]}>


        <View>
          <Text>actTopicCat: {activeTopic.category} | actTopicSub: {activeTopic.subcategory} | {isFocused ? 'focused' : 'unfocused'}</Text>
        </View>

        <SearchBar />

        <CategoriesList 
          activeTopic={activeTopic} 
          updateTopic={setActiveTopic}
          propStyle={{  }}
        />
{/*
*/}
        <PostModal ref={modalRef} /> 

        <ScrollView
          nativeID="#Home-ScrollViewContent"
          style={{
//            borderWidth: 1, borderColor: 'red',
            width: '100%', 
//            overflow: 'visible',
          }}
          contentContainerStyle={{
  //          borderWidth: 1, borderColor: 'orange',
            marginTop: defaultStyles.screenPadding.paddingHorizontal,
            paddingBottom: 20,
  //          overflow: 'visible',
          }}
        >

          <NewsFeed 
            activeTopic={activeTopic} 
            propStyle={{ height: 3000}}
            openModal={openModal}
          />


        </ScrollView>

      </View>
    );
 
}

export default HomeScreen;