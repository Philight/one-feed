import { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, SafeAreaView, View, Pressable, ScrollView, 
  FlatList, VirtualizedList, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from '@react-navigation/native';

//import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

//import DataContext from '../contexts/DataContext.js';

import SearchBar from '../components/SearchBar.js';
//import SettingsHeading from '../components/SettingsHeading.js';
import SettingsColumn from '../components/SettingsColumn.js';
 
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
  section: {
    margin: 14
  }
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

const SettingsHeading = (props) => {
  const { heading } = props;

  return (
    <Text style={[{ 
      fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3,
      color: '#c8c8c8',
      marginBottom: styles.section.margin,
    }]}>
      {heading}
    </Text>
  );
}


function SettingsHomeScreen(props) {

  return (
    <View
      nativeID="settings-home-screen"
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

          <View style={{ marginBottom: styles.section.margin, }} >
            <SettingsHeading heading="Content" />
            <SettingsColumn heading="News Feed" icon="news-feed" navigateToScreen={"SettingsNewsFeed"}/>
          </View>

          <SettingsHeading heading="Content2" />
        </View>
  
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

export default SettingsHomeScreen;