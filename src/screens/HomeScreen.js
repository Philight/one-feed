import { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, SafeAreaView, View, FlatList, VirtualizedList, Text, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

//import * as ScreenOrientation from 'expo-screen-orientation';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DataContext from '../contexts/DataContext.js';
import CategoriesList from '../components/CategoriesList.js';
import NewsFeed from '../components/NewsFeed.js';
import SearchBar from '../components/SearchBar.js';
 
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
  
});

function HomeScreen() {
  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;

  const [activeCategory, setActiveCategory] = useState(Object.keys(CATEGORIES)[1]);

  return (
    <View 
      nativeID="home-screen"
      style={[{ 
        flex: 1, alignItems: 'center', justifyContent: 'center', 
        paddingHorizontal: defaultStyles.pageOffset.padding, 
        backgroundColor: "#FFF", 
        border: '1px solid red'}]}>

{/*
      <View>
        <Link to={{ screen: 'Notifications', params: { id: 'notifications' } }}>
          Go to Notif
        </Link>
      </View>
*/}
      <SearchBar />
      
      <CategoriesList 
        activeCategory={activeCategory} 
        updateCategory={setActiveCategory}
        propStyle={{ flex: 1 }}
      />
      <NewsFeed 
        activeCategory={activeCategory} 
        propStyle={{ flex: 1}}
      />

    </View>
  );
}

export default HomeScreen;