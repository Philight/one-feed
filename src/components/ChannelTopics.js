import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Pressable, SafeAreaView, 
  View, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import { usePrevious } from '../util/utilMethods.js';
import defaultStyles from '../styles/defaultStyles.js';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  constants: {
    topicHeight: 40,
    dividerHeight: 16
  },
});

const ChannelTopics = (props) => {
  const { newsSource, propStyle, columns, 
    getHeight, setView, toggleView, isCollapsed } = props;

  const contextData = useContext(DataContext);
  const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const CATEGORIES = contextData.CATEGORIES;
  const NEWS_SOURCES = contextData.NEWS_SOURCES;
  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;

  const innerData = contextData.innerData
  const containerHeight = contextData['innerData']['ChannelTopics']['newsSource'][newsSource] 
    ? contextData['innerData']['ChannelTopics']['newsSource'][newsSource]['containerHeight'] 
    : 0;
  
  const ANIM_DURATION = 500;

  const [activeCategory, setActiveCategory] = useState({ index: null, key: null });
  const [lastCategoryPressed, setLastCategoryPressed] = useState({ index: null, key: null });

  const [renderCount, setRenderCount] = useState(0);

  const [originalHeight, setOriginalHeight] = useState(0);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(0));
  const [animatedHeightExpand, setAnimatedHeightExpand] = useState(new Animated.Value(0));
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));
  const [aTop, setATop] = useState(new Animated.Value(0));

  const [origHeightSubcatCont, setOrigHeightSubcatCont] = useState(0);
  const prevOrigHeightSubcatCont = usePrevious(origHeightSubcatCont);

  const [subcategoriesCount, setSubcategoriesCount] = useState(0);
  const [aHeightSubcatCont, setAHeightSubcatCont] = useState(new Animated.Value(0));
  const [aOpacitySubcatCont, setAOpacitySubcatCont] = useState(new Animated.Value(0));

/*
  categoriesTree = {
    'culture': {
      enabled: true,
      'art': true, 
      'film': true,
    },

    'eco': {
      'business': true,
      enabled: true
    }
  }
*/
  const [categoriesTree, setCategoriesTree] = useState({});

  const getContainerHeight = (height) => {
console.log(`### getContainerHeight ${newsSource} renderCount: `+renderCount);
console.log('### height: '+height);

    if (renderCount < 2) {

      if (renderCount == 1) {
        if (!innerData['ChannelTopics']['newsSource'][newsSource]) {
        // Value not set yet
          contextData.setContextData(prevData => {
            const copy = prevData;
            copy['innerData']['ChannelTopics']['newsSource'][newsSource] = {
              'containerHeight': height,
              'subcatContainerHeight': 0
            }
            return copy;
          })
        } 
      } 
    }
    setRenderCount(prevCount => prevCount+1);
  }

  useEffect(() => {
console.log('ChannelTopics useEffect setting containerHeight');   
    if (innerData['ChannelTopics']['newsSource'][newsSource]) {
      const containerHeight = innerData['ChannelTopics']['newsSource'][newsSource]['containerHeight'];
//console.log('ChannelTopics useEffect setting containerHeight: '+containerHeight);   
      setOriginalHeight(containerHeight);
    }
  }, [innerData['ChannelTopics']['newsSource'][newsSource]])

  useEffect(() => {
//console.log('ChannelTopics useEffect animation isCollapsed is: '+isCollapsed);   
    Animated.parallel([

      // MAIN container
      Animated.timing(animatedHeight, {
        toValue: isCollapsed ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: isCollapsed ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),

      // ChannelCategory container
      Animated.timing(aTop, {
        toValue: isCollapsed ? 1 : 0,
        duration: ANIM_DURATION,
//        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),  

    ]).start();

  }, [isCollapsed]);



  useEffect(() => {
    const isOpening = origHeightSubcatCont > 0 ? true : false;
console.log(`ChannelTopics useEffect animation isOpenin ${isOpening}`);   
console.log(`ChannelTopics useEffect animation isOpenin origHeightSubcatCont ${origHeightSubcatCont}`);   

    Animated.parallel([
      // SubcategoriesContainer
      Animated.timing(aHeightSubcatCont, {
        toValue: isOpening ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(aOpacitySubcatCont, {
        toValue: isOpening ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),

      // MAIN container
      Animated.timing(animatedHeightExpand, {
        toValue: isOpening ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),

    ]).start();

  }, [origHeightSubcatCont]);

/*
  useEffect(() => {
//console.log('ChannelTopics useEffect activeCategory');
    if (activeCategory.key == null) {

    } else if (activeCategory.key != null) {
    }
  }, [activeCategory])
*/

  useEffect(() => {
console.log(`ChannelTopics useEffect subcategoriesCount ${subcategoriesCount}`);
    if (subcategoriesCount > 0) {
      const rows = Math.ceil(subcategoriesCount/4);
      const newOrigHeightSubcatCont = rows*styles.constants.topicHeight + styles.constants.dividerHeight;

      setOrigHeightSubcatCont(newOrigHeightSubcatCont);
//      setOriginalHeight(prevHeight => prevHeight+newOrigHeightSubcatCont);

    } else {
      setOrigHeightSubcatCont(0);
//      setOriginalHeight(prevHeight => prevHeight-prevOrigHeightSubcatCont);
    }
  }, [subcategoriesCount])




  useEffect(() => {
    let catTree = {};

    // Initial categories
    const userCategories = USER_NEWS_SOURCES[newsSource]['categories'];
    // Get all Category Keys
    for (let catKey of NEWS_SOURCES[newsSource]['categories']) {
      catTree[catKey] = { 
        enabled: catKey=='top' || Object.keys(userCategories).includes(catKey) ? true : false 
      };
    }

    // Initial subcategories
    for (let subcatKey of NEWS_SOURCES[newsSource]['subcategories']) {
      let categoryKey = SUBCATEGORIES[subcatKey].category;

      if (Object.keys(userCategories).includes(categoryKey)) {
        catTree[categoryKey][subcatKey] = userCategories[categoryKey].includes(subcatKey) ? true : false;
      } else {
        catTree[categoryKey][subcatKey] = true;
      }
    }
console.log('### ChannelTopics -- initial category Tree');
console.log(catTree);
    setCategoriesTree(catTree);
  }, []);

{/*
  const ChannelCategory = ({ item, index }) => (
    <View style={{ flexBasis: '25%', border: '1px solid green', alignItems: 'center', height: 40 }}>
      <ImageBackground 
        style={[defaultStyles.flexCenter, { width: '100%',  }]}
        source={CATEGORIES[item]['imageSource']} 
        resizeMode="cover" 
      >
        <View style={{backgroundColor: '#0000002b', width: '100%', height: '100%', position: 'absolute', zIndex: -1}}>
        </View>
      
        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 9 }}>{CATEGORIES[item]['category']}</Text>
      </ImageBackground>

      <View style={{ position: 'absolute', bottom: 0, border: '1px solid green',  }}>

      </View>
    </View>
  )
*/}

  const ChannelCategory2 = (props) => {
    const { catKey, catIndex } = props

    const chooseCategory = () => {

      let emptyPair = {
        index: null,
        key: null
      }
      let keyPair = {
        index: catIndex,
        key: catKey,
      }

      // Exclude Top News
      if (catKey == 'top') return;

      // Was Selected / Subcategories open
      if (lastCategoryPressed.key==catKey) {
//console.log('### ChannelCategory2.lastCategoryPressed: '+lastCategoryPressed.key); 

        setCategoriesTree(prevTree => ({
          ...prevTree,
          [catKey]: {
            ...prevTree[catKey],
            'enabled': false
          }
        }));

        setLastCategoryPressed(emptyPair);

      // Choose category
      } else if (activeCategory.key!=catKey) {
//console.log('### ChannelCategory2.activeCategory.key!=catKey: '+lastCategoryPressed.key);        
        setActiveCategory(keyPair);

        setCategoriesTree(prevTree => ({
          ...prevTree,
          [catKey]: {
            ...prevTree[catKey],
            'enabled': true
          }
        }));

      // Deselect category
      } else if (activeCategory.key==catKey){
//console.log('### ChannelCategory2.activeCategory.key==catKey: '+lastCategoryPressed.key);        
        setActiveCategory(emptyPair); // close subcategories
        setLastCategoryPressed(keyPair);
      }


//      setSubcategoriesCount(0);

    }

    return (
      <View style={{ 
        flexBasis: '25%', border: catKey==activeCategory.key ? '3px solid red' :'', 
        opacity:  categoriesTree[catKey]&&categoriesTree[catKey]['enabled']==true ? 1 : 0.4,
        alignItems: 'center', 
        height: styles.constants.topicHeight }}>
      <Pressable style={{ flex: 1, width: '100%' }}
        onPress={chooseCategory}
      >
        <ImageBackground 
          style={[defaultStyles.flexCenter, { width: '100%'/*, paddingVertical: 15*/ }]}
          source={CATEGORIES[catKey]['imageSource']} 
          resizeMode="cover" 
        >
  {/* */}
          <View style={{backgroundColor: '#0000002b', width: '100%', height: '100%', position: 'absolute', zIndex: -1}}>
          </View>
        
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 9 }}>{CATEGORIES[catKey]['category']}</Text>
        </ImageBackground>

      </Pressable>
      </View>
    )
  }

  const ChannelSubcategory = (props) => {
    const { subcatKey, subcatIndex } = props

    const catKey = SUBCATEGORIES[subcatKey].category;

    const handlePress = () => {
      let emptyPair = {
        index: null,
        key: null
      }
      let keyPair = {
        index: subcatIndex,
        key: subcatKey,
      }

      // Invert Subcategory boolean
      setCategoriesTree(prevTree => {
        let copy = {...prevTree};
        copy[catKey][subcatKey] = !copy[catKey][subcatKey];
        return copy;
      })
    }

    return (
      <View style={{ 
        flexBasis: '25%', alignItems: 'center', 
        height: styles.constants.topicHeight,
        opacity: categoriesTree[catKey][subcatKey]==true ? 1 : 0.4 }}
      >
      <Pressable style={{ flex: 1, width: '100%' }}
        onPress={handlePress}
      >
        <ImageBackground 
          style={[defaultStyles.flexCenter, { width: '100%',  }]}
          source={SUBCATEGORIES[subcatKey]['imageSource']} 
          resizeMode="cover" 
        >
  {/* */}
          <View style={{backgroundColor: '#0000002b', width: '100%', height: '100%', position: 'absolute', zIndex: -1}}>
          </View>
        
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 9 }}>{SUBCATEGORIES[subcatKey]['subcategory']}</Text>
        </ImageBackground>

      </Pressable>
      </View>
    )
  }

  const SubcategoriesContainer = (props) => {
    const { catKey, catIndex } = props; // key and index of the 3, 7, 11th elements followed by SubcategoriesContainer

    // Target specific container
    const isTheContainer = activeCategory.key != null && Array.from({length: 4}, (v, i) => i + catIndex-3).includes(activeCategory.index); // [0,1,2,3].includes(activeCategory), [4,5,6,7].includes(activeCategory)
    
    const fillContainer = () => {
/*
console.log('SubcategoriesContainer.fillContainer');
console.log('categoriesTree');
console.log(categoriesTree);
console.log('catIndex');
console.log(catIndex);
*/
console.log('SubcategoriesContainer activeCategory.index');
console.log(activeCategory.index);

      // activeCategory not empty AND target specific SubcategoriesContainer
      if (isTheContainer) {
        
        const subcategoryKeys = Object.keys(categoriesTree[activeCategory.key]); 
        
        // Set subcategories count
        setSubcategoriesCount(subcategoryKeys.length-1); // exclude {enabled:true} key

        let subcatElems = [];
        subcategoryKeys.map((subcatKey, subcatIndex) => {
          if (subcatKey != 'enabled') {
            subcatElems.push(<ChannelSubcategory catIndex={catIndex} subcatKey={subcatKey} subcatIndex={subcatIndex} />);
          }
        })

        let dividerElems = [];
        for(let i=0; i<4; i++) {
          if (activeCategory.index % 4 == i) {
            dividerElems.push(<View style={{flexBasis: '25%', alignItems: 'center', justifyContent: 'center'}}><FontAwesome5 name="chevron-down" color={'#AD0000'} size={20} style={{}} /></View>)
          } else {
            dividerElems.push(<View style={{flexBasis: '25%'}}/>)
          }
        }

        return (
          <>
            <View style={{ flexDirection: 'row', flexBasis: '100%', 
              height: styles.constants.dividerHeight }}>
              {dividerElems}
            </View>
            {subcatElems}
          </>
        );


      } else {
        setSubcategoriesCount(0); // 
      }

    } 


    const interpolHeight = aHeightSubcatCont.interpolate({
      inputRange: [0, 1],
      outputRange: [0, origHeightSubcatCont]
    })

    return (
      <Animated.View style={[
        { 
//          border: '2px solid green', 
          flexDirection: 'row', flexBasis: '100%', flexWrap: 'wrap', 
//        flex: 1,
          height: 0,
//          height: isTheContainer ? interpolHeight : 'auto', 
//          opacity: isTheContainer ? aOpacitySubcatCont : 1,
        }, 
        isTheContainer? { height: interpolHeight, opacity: aOpacitySubcatCont } : ''
      ]}
        onLayout={(event) => { 
          const onLayoutHeight = event.nativeEvent.layout.height;
//          console.log(`ChannelTopics - SubcategoriesContainer ${newsSource} ${catIndex} height: `+onLayoutHeight);
//          getContainerHeight(onLayoutHeight)
        }}
      >
        { fillContainer() }
      </Animated.View>
    )
  }


  const saveTopics = () => {
console.log('### ChannelTopics.saveTopics');  
    if (contextData.categoriesUpdated == false) {
console.log('### categoriesTree');  
console.log(categoriesTree);

      let newCategoriesTree = {};

      for (const catKey in categoriesTree) {
        if (categoriesTree[catKey]['enabled'] == true) {
          newCategoriesTree[catKey] = [];

          for (const subcatKey in categoriesTree[catKey]) {
            if (subcatKey == 'enabled') continue;

            if (categoriesTree[catKey][subcatKey] == true) {
              newCategoriesTree[catKey].push(subcatKey);
            }
          }
        }
      }
console.log('### newCategoriesTree');  
console.log(newCategoriesTree);

      contextData.setContextData(prevContextData => {
        const newContext = {...prevContextData};
        newContext['categoriesUpdated'] = true;
        newContext['userInfo']['NEWS_SOURCES'][newsSource]['categories'] = newCategoriesTree;
        return newContext;
      })
    }
  }

{/*
  ChannelTopics render
*/}


  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, originalHeight]
  })

  const interpolHeightExpand = animatedHeightExpand.interpolate({
    inputRange: [0, 1],
    outputRange: [originalHeight, originalHeight+origHeightSubcatCont]
  })



  const interpolatedTop = aTop.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0]
  })

  return (
    <Animated.View style={[
      { border: '1px solid blue', 
        height: (containerHeight>0) ? ( (origHeightSubcatCont>0) ? interpolHeightExpand : interpolatedHeight) :'auto',
        opacity: animatedOpacity 
      },
      propStyle,
    ]}
      onLayout={(event) => { 
        const onLayoutHeight = event.nativeEvent.layout.height;
        getContainerHeight(onLayoutHeight)
      }}
    >
      <View style={{position: 'fixed', top:-10, zIndex: 100, backgroundColor: '#FFF'}}>
        <Text>
          oH:{originalHeight},
          savedH:{containerHeight},
          oHSub:{origHeightSubcatCont},
        </Text>
      </View>
{/*
      <SafeAreaView style={{ flex: 1}}>
        <FlatList
          data={NEWS_SOURCES[newsSource]['categories']}
          renderItem={ChannelCategory}
          keyExtractor={item => item.id}
          numColumns={4}
        />
      </SafeAreaView>
*/}
      <Animated.View style={{ 
        border: '1px solid orange', flexGrow:1, flexDirection: 'row', flexWrap: 'wrap',
        top: interpolatedTop,
      }}>
      { NEWS_SOURCES[newsSource]['categories'].map((catKey, catIndex) => {
        let categoriesCount = NEWS_SOURCES[newsSource]['categories'].length;
//console.log(`ChannelTopics render ${newsSource} categoriesCount: ${categoriesCount}`);        
        return (
          ( (catIndex+5) % 4 == 0 || catIndex==categoriesCount-1 )// catIndex == 3, 7, 11, .. || last catIndex
            ? <>
                <ChannelCategory2 catKey={catKey} catIndex={catIndex} /> 
                <SubcategoriesContainer catKey={catKey} catIndex={catIndex} /> 
              </>
            : <ChannelCategory2 catKey={catKey} catIndex={catIndex} />
        )
      }) }
      </Animated.View>

      <View style={{ flexDirection: 'row', justifyContent:'flex-end', marginTop: 6 }}>
        <Pressable style={{ backgroundColor: 'red', borderRadius: 25, flexBasis:'25%', paddingVertical: 4}}
          onPress={saveTopics}
        >
          <Text style={{ color: '#FFF',  fontSize: 9, letterSpacing: 2, textAlign:'center' }}>
            SAVE
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

export default ChannelTopics;