import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, ScrollView, FlatList, 
  Text, StyleSheet, Dimensions, StatusBar } from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

import TopicsChannels from '../components/TopicsChannels.js';
import TopicsCategories from '../components/TopicsCategories.js';
import EmptyView from '../components/EmptyView.js';

function TabShadow(props) {
  const { heading } = props;
  return (
    <View style={[
      { 
        shadowColor: "#656565",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
      },
      { 
//        backgroundColor: '#000', 
//        height: 2, width: '100%', backgroundColor: '#FFF',
        borderBottomColor: '#FFF', borderBottomWidth: 2, marginTop: -2, zIndex: -10
      }]} 
    />
  );
}

const FirstRoute = () => (
  <View style={{flex:1, backgroundColor: '#ff4081'}}>
    This is Tab 1
  </View>
  )

const SecondRoute = () => (
  <View style={{flex:1, backgroundColor: '#673ab7'}}>
    This is Tab 2
  </View>
  )

const ThirdRoute = () => (
  <View style={{flex:1}}>
    This is Tab 3
  </View>
  )

const FourthRoute = () => (  
  <View style={{flex:1}}>
    This is Tab 4
  </View>
  )


const TopicsContent2 = (props) => {
	const { propStyle } = props;
	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);


  const initialLayout = { width: Dimensions.get('window').width };

  const renderScene = SceneMap({
    first: TopicsChannels,
    second: SecondRoute,

  });

/*
  return (
    <View style={{
      flex:1, height: 1000,
      width: '100%',  border: '1px solid red',
    }}>
      <TabView renderScene={renderScene} 

        onIndexChange={setIndex} 
        initialLayout={initialLayout} 
        navigationState={{
          index,
          routes
        }} 
      />
    </View>
  );
*/


	return (
    <View
      style={[
        {...defaultStyles.shadowProps},
        {
//          flex: 1,
          height: 1000,
          width: '100%',
          borderRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#FFF',
        }
      ]}
    >

      <View nativeID="#topics__inner-content" 
        style={{ overflow: 'hidden', flex: 1 }}
      >


      <TabView renderScene={renderScene} 

        onIndexChange={setIndex} 
        initialLayout={initialLayout} 
        navigationState={{
          index,
          routes
        }} 
      />






      </View>

    </View>
	);

}

export default TopicsContent2;