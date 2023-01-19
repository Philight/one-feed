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
import HelpText from '../components/HelpText.js';

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
      width: defaultStyles.screenDimensions.width, height: 120, 
      position: 'absolute', top: 0, left: 0, zIndex: -10 }} 
    />
  );
}


function TopicsScreen(props) {
  const contextData = useContext(DataContext);
//  const CATEGORIES = contextData.CATEGORIES;

  return (
    <View
      nativeID="topics-screen"
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

        <HelpText />

        <TopicsContent />
  
      </ScrollView>
    </View>
  );
}

export default TopicsScreen;