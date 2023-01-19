import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LogBox, Animated, TouchableWithoutFeedback, Pressable, 
  SafeAreaView,ScrollView, View, FlatList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import { getStorageData, setStorageData } from '../data/asyncStorage.js';
import defaultStyles from '../styles/defaultStyles.js';

import AntDesign from 'react-native-vector-icons/AntDesign';


const TopicsSubcategories = (props) => {
	const { activeCategory, propStyle } = props;

	const contextData = useContext(DataContext);
//  const CATEGORIES = contextData.CATEGORIES;
  const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const NEWS_SOURCES = contextData.NEWS_SOURCES;

  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;
//  const USER_SETTINGS = contextData.userInfo.SETTINGS;

  /*
    sourcesBySubcategory: {
      'ai': ['nyt', 'guardian'],
      'science': ['nyt', 'guardian'],
    }
  */
  const [sourcesBySubcategory, setSources] = useState({ });

  const updateSourcesBySubcategory = () => {
//console.log(`### TopicsSubcategories.updateSourcesBySubcategory`);    
    let subcategories = {};

    // Get all Categories Keys
    for (let subcatKey in SUBCATEGORIES) {
      subcategories[subcatKey] = [];
    }
//console.log(subcategories);

    // Loop all News Sources
    for (let sourceKey in NEWS_SOURCES) {
//console.log('sourceKey');
//console.log(sourceKey);

      // Skip News Sources already in Storage 
      if (sourceKey in USER_NEWS_SOURCES) continue;

      if (NEWS_SOURCES[sourceKey].subcategories && NEWS_SOURCES[sourceKey].subcategories.length>0) {
      
        for (let subcatKey of NEWS_SOURCES[sourceKey].subcategories) {
          subcategories[subcatKey].push(sourceKey);
        }
      }
    }
console.log(`+++ TopicsSubcategories.updateSourcesBySubcategory tree:`);    
console.log(subcategories);    
console.log(Object.keys(subcategories));    
    setSources(subcategories);
  }

  useEffect(() => {
//console.log(`### TopicsSubcategories useEffect: INITIAL`);    
    updateSourcesBySubcategory();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [])

  useEffect(() => {
//console.log(`### TopicsSubcategories useEffect: DEP: USER_NEWS_SOURCES`);    
    updateSourcesBySubcategory()
  }, [USER_NEWS_SOURCES]);


  const addNewsChannel = ( newsSourceKey, subcatKey ) => {
//console.log('### addNewsChannel contextData');
//console.log(contextData);

    // Add New Category key
    if (!(newsSourceKey in contextData.userInfo['NEWS_SOURCES'])) {

      const catKey = SUBCATEGORIES[subcatKey]['catKey'];
      const updatedData = {
        [newsSourceKey]: {
          'categories': {
            'top': [],
            [catKey]: [subcatKey],
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
/*
        innerData: {
          ChannelTopics: {
            newsSource: {
              [newsSourceKey]: {
                containerHeight: 0
              }
            }
          }
        }
*/
      }))
    }

  }

{/*
  const listItem = ({ item, index }) => (
    <View style={[
      { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 6
      }
    ]}>
      <Text style={{ color: '#505050', fontWeight: 'bold', fontSize: 12 }}>{NEWS_SOURCES[item].name}</Text>

      <AntDesign name="pluscircleo" color={'#AD0000'} size={18} 
        onPress={() => addNewsChannel(item)}
      />
    </View>
  );
*/}

  const CategoryItem = (props) => {
    const { newsSource, subcategoryKey } = props;

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
          {NEWS_SOURCES[newsSource]['name']}
        </Text>

        <AntDesign name="pluscircleo" color={'#AD0000'} size={18} 
          onPress={() => addNewsChannel(newsSource, subcategoryKey)}
        />
      </View>
    )
  }

  const SubcategorySection = (props) => {
    const { subcategoryKey } = props;
//console.log(`### TopicsSubcategories SubcategorySection subcategoryKey: ${subcategoryKey}`);
//console.log(`### TopicsSubcategories SubcategorySection CATEGORIES[subcategoryKey]`);
//console.log(CATEGORIES[subcategoryKey].category);
    return (
      <View style={[
        { 
//          borderColor: 'blue', borderWidth: 1, 
          flexBasis: '100%', 
          marginTop: 12,
          marginBottom: 20,
        }
      ]}>

        <Text style={[
          { 
            fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3,
            color: '#b8b8b8',
            marginLeft: 0
           }
        ]}>
          { SUBCATEGORIES[subcategoryKey]['name']  }
        </Text>

        {
          sourcesBySubcategory[subcategoryKey].map((newsSource) => {
          return <CategoryItem newsSource={newsSource} subcategoryKey={subcategoryKey} />
        }) }

      </View>
    )
  }

{/*
  const SubcategorySection2 = ({ item, index }) => (
    <View style={[
      { flex: 1,  }
    ]}>
      <Text style={[
        { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3, color: '#b8b8b8' }
      ]}>
        { CATEGORIES[item].category  }
      </Text>

      { sourcesBySubcategory[item].map((newsSource) => {
        return<CategoryItem newsSource={newsSource} />
      }) }

    </View>
  )
*/}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled={true} 
        contentContainerStyle={{ 
          height: 2600, 
          paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal / 3,
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start',  
        }}
      >
        { Object.keys(sourcesBySubcategory).sort().map((key) => {
          return (<SubcategorySection subcategoryKey={key} />)
        }) }
      </ScrollView> 
    </SafeAreaView>
  );

{/*
	return (
    <SafeAreaView style={{flex: 1, overflow: 'visible' }}>
  		<FlatList 
        data={Object.keys(sourcesBySubcategory)}
        renderItem={SubcategorySection2}
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
      { Object.keys(sourcesBySubcategory).map((key) => {
        return (<SubcategorySection subcategoryKey={key} />)
      }) }
    </View>
  );

*/}
}

export default TopicsSubcategories;