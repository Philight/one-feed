import { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, SafeAreaView, View, ScrollView, 
  FlatList, VirtualizedList, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from '@react-navigation/native';

//import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

import DataContext from '../contexts/DataContext.js';

import TopicsContent from '../components/TopicsContent.js';
import TopicsContent2 from '../components/TopicsContent2.js';
import TabViewExample from '../components/TabViewExample.js';

import CategoriesList from '../components/CategoriesList.js';
import NewsFeed from '../components/NewsFeed.js';
import SearchBar from '../components/SearchBar.js';
 
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
  
});

function BackgroundLayer() {
  return (
    <View style={{ 
      backgroundColor: "#AD0000", 
      width: '100%', height: 120, 
      position: 'absolute', top: 0, left: 0, zIndex: -10 }} 
    />
  );
}



function HelpText(props) {
  const { title, paragraphs } = props;
  return (
    <View
      style={[
        {...defaultStyles.shadowProps},
        {
          width: '100%',
          borderRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#000'
        },
      ]}
    >
      <Text style={{
        color: '#FFF',
        /*fontWeight: 800,*/fontSize: 18, letterSpacing: 3, 
        position: 'relative',
      }}>
        {title}<View style={{ backgroundColor: 'red', width: 50, height: 2.4, position: 'absolute', bottom: -6, left: 0 }}/>
      </Text>

      { paragraphs.map((text) => (
        <Text style={{
          color: '#FFF',
          /*fontWeight: 600, */fontSize: 12, letterSpacing: 2,
          position: 'relative', marginTop: 16
        }}>
          {text}<View style={{ backgroundColor: 'red', width: 16, height: 2.4, position: 'absolute', bottom: -6, left: 0 }}/>
        </Text>
      ))}

    </View>
  );
}

function TopicsScreen(props) {
  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;

  return (
    <View
      nativeID="topics-screen"
      style={[{ 
        flex: 1, 
        alignItems: 'center',
        backgroundColor: "#FFF", 
        width: Dimensions.get('window').width,
          paddingHorizontal: defaultStyles.pageOffset.padding, flexGrow: 1, 
      }]}
    >
      <BackgroundLayer />
      <ScrollView
        contentContainerStyle={{
        }}
      >
        <SearchBar />

        <HelpText 
          title="How does it work?" 
          paragraphs={[`Select from available News Channels 
by Category or Subcategory`, `News Channels can be further specified
by picking topics under "Your Channels"`]} 
        />

  
        <TopicsContent />
  
  
  {/*
        <View>
          <Link to={{ screen: 'Notifications', params: { id: 'notifications' } }}>
            Go to Notif
          </Link>
        </View>
  */}
      </ScrollView>
    </View>
  );
}

export default TopicsScreen;