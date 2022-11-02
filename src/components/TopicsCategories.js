import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LogBox, Animated, TouchableWithoutFeedback, Pressable, 
  SafeAreaView,ScrollView, View, FlatList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import { getStorageData, setStorageData } from '../data/asyncStorage.js';
import defaultStyles from '../styles/defaultStyles.js';

import AntDesign from 'react-native-vector-icons/AntDesign';


const TopicsCategories = (props) => {
	const { activeCategory, propStyle } = props;

	const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;
	const NEWS_SOURCES = contextData.NEWS_SOURCES;

  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;

  /*
    sourcesByCategory: {
      'ai': ['nyt', 'guardian'],
      'science': ['nyt', 'guardian'],
    }
  */
  const [sourcesByCategory, setSources] = useState({ });

  const updateSourcesByCategory = () => {
console.log(`### TopicsCategories.updateSourcesByCategory`);    
    let categories = {};

    // Get all Categories Keys
    for (let key in CATEGORIES) {
      if (key == 'top') continue;
      categories[key] = [];
    }
//console.log(categories);

    // Loop all News Sources
    for (let sourceKey in NEWS_SOURCES) {
//console.log('sourceKey');
//console.log(sourceKey);

      // Skip News Sources already in Storage 
      if (sourceKey in USER_NEWS_SOURCES) continue;

      if (NEWS_SOURCES[sourceKey].categories && NEWS_SOURCES[sourceKey].categories.length>0) {
        for (let cat of NEWS_SOURCES[sourceKey].categories) {
          if (cat == 'top') continue;
          categories[cat].push(sourceKey);
        }
      }
    }
console.log(`+++ TopicsCategories.updateSourcesByCategory tree:`);    
console.log(categories);    
    setSources(categories);
  }

  useEffect(() => {
console.log(`### TopicsCategories useEffect: INITIAL`);    
    updateSourcesByCategory();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [])

  useEffect(() => {
console.log(`### TopicsCategories useEffect: DEP: USER_NEWS_SOURCES`);    
    updateSourcesByCategory()
  }, [USER_NEWS_SOURCES]);

  const addCategory = ( newsSourceKey ) => {
console.log('### addCategory contextData');
console.log(contextData);

    // Add New Category key
    if (!(newsSourceKey in contextData.userInfo['NEWS_SOURCES'])) {

      const updatedData = {
        [newsSourceKey]: {
          'categories': {
            'top': [],
          }
        }
      };

      contextData.setContextData(prevData => ({
        ...prevData,
        userInfo: {
          ...prevData.userInfo,
          NEWS_SOURCES: {
            ...prevData.userInfo['NEWS_SOURCES'],
            ...updatedData
          }
        },
        innerData: {
          ChannelTopics: {
            newsSource: {
              [newsSourceKey]: {
                containerHeight: 0
              }
            }
          }
        }
      }))

    }
  }

  const listItem = ({ item, index }) => (
    <View style={[
      { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 6
      }
    ]}>
      <Text style={{ color: '#505050', fontWeight: 'bold', fontSize: 12 }}>{NEWS_SOURCES[item].name}</Text>

      <AntDesign name="pluscircleo" color={'#AD0000'} size={18} 
        onPress={() => addCategory(item)}
      />
    </View>
  );

  const CategoryItem = (props) => {
    const { newsSource } = props;

    return (
      <View style={[
        { 
//          borderColor: 'green', borderWidth: 1, 
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 14
        }
      ]}>
        <Text style={{ color: '#505050', fontWeight: 'bold', fontSize: 14, 
          marginLeft: 2
        }}>
          {NEWS_SOURCES[newsSource].name}
        </Text>

        <AntDesign name="pluscircleo" color={'#AD0000'} size={18} 
          onPress={() => addCategory(newsSource)}
        />
      </View>
    )
  }

  const CategorySection = (props) => {
    const { categoryKey } = props;

//console.log(`### TopicsCategories CategorySection categoryKey: ${categoryKey}`);
//console.log(`### TopicsCategories CategorySection CATEGORIES[categoryKey]`);
//console.log(CATEGORIES[categoryKey].category);

    return (
      <View style={[
        { 
//          borderColor: 'blue', borderWidth: 1, 
          flexBasis: '100%', 
          marginTop: 24,
        }
      ]}>

        <Text style={[
          { 
            fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3,
            color: '#b8b8b8',
            marginLeft: 0
           }
        ]}>
          { CATEGORIES[categoryKey].category  }
        </Text>

        {
          sourcesByCategory[categoryKey].map((newsSource) => {
          return <CategoryItem newsSource={newsSource} />
        }) }

      </View>
    )
  }

  const CategorySection2 = ({ item, index }) => (
    <View style={[
      { flex: 1,  }
    ]}>
      <Text style={[
        { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3, color: '#b8b8b8' }
      ]}>
        { CATEGORIES[item].category  }
      </Text>

      { sourcesByCategory[item].map((newsSource) => {
        return<CategoryItem newsSource={newsSource} />
      }) }

    </View>
  )
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled={true} 
        contentContainerStyle={{ 
          height: 1800, 
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'  
        }}
      >
        { Object.keys(sourcesByCategory).map((key) => {
          return (<CategorySection categoryKey={key} />)
        }) }
      </ScrollView> 
    </SafeAreaView>
  );

{/*
	return (
    <SafeAreaView style={{flex: 1, overflow: 'visible' }}>
  		<FlatList 
        data={Object.keys(sourcesByCategory)}
        renderItem={CategorySection2}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
	);
*/}

{/*
  return (
    <View style={[
      {flex: 1}
    ]}>
      { Object.keys(sourcesByCategory).map((key) => {
        return (<CategorySection categoryKey={key} />)
      }) }
    </View>
  );

*/}
}

export default TopicsCategories;