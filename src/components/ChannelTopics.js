import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, Pressable, SafeAreaView, 
  View, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import { usePrevious } from '../util/utilMethods.js';
import defaultStyles from '../styles/defaultStyles.js';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const MISSINGIMG = require('../../assets/image/missing-image.png');

const styles = StyleSheet.create({
  CONSTANTS: {
    topicHeight: 50,
    saveButtonContainerHeight: 30,
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
  const [aMarginTopSubcatContInner, setAMarginTopSubcatContInner] = useState(new Animated.Value(0));

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
//console.log(`### ChannelTopics.getContainerHeight ${newsSource} renderCount: `+renderCount);
//console.log('### ChannelTopics.height: '+height);

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

/*
  useEffect(() => {
console.log('### ChannelTopics useEffect setting containerHeight');   
    if (innerData['ChannelTopics']['newsSource'][newsSource]) {
      const containerHeight = innerData['ChannelTopics']['newsSource'][newsSource]['containerHeight'];
//console.log('ChannelTopics useEffect setting containerHeight: '+containerHeight);   
//      setOriginalHeight(containerHeight);
    }
  }, [innerData['ChannelTopics']['newsSource'][newsSource]])
*/
  useLayoutEffect(() => {
console.log('ChannelTopics useLayoutEffect ANIMATION isCollapsed is: '+isCollapsed);   
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



  useLayoutEffect(() => {
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

      // SubcategoriesContainer Inner
      Animated.timing(aMarginTopSubcatContInner, {
        toValue: isOpening ? 1 : 0,
        duration: ANIM_DURATION,
//        easing: Easing.out(Easing.ease),
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

  useEffect(() => {
console.log(`ChannelTopics useEffect subcategoriesCount ${subcategoriesCount}`);
    if (subcategoriesCount > 0) {

//      const rows = Math.ceil(subcategoriesCount/4);
      const rows = Math.ceil(subcategoriesCount/columns);

      const newOrigHeightSubcatCont = rows*styles.CONSTANTS.topicHeight + styles.CONSTANTS.dividerHeight;

      setOrigHeightSubcatCont(newOrigHeightSubcatCont);

    } else {
      setOrigHeightSubcatCont(0);
    }
  }, [subcategoriesCount])


  useEffect(() => {
console.log(`ChannelTopics useEffect activeCategory ${activeCategory? activeCategory.key :''}`);
    if (activeCategory.key != null /*&& isTheContainer*/) {
      // Set subcategories count
      const subcategoryKeys = Object.keys(categoriesTree[activeCategory.key]); 
//console.log(`### SubcategoriesContainer useEffect setSubcategoriesCount: ${subcategoryKeys.length-1}`);
      setSubcategoriesCount(subcategoryKeys.length-1); // exclude {enabled:true} key
    } else {
//console.log(`### SubcategoriesContainer useEffect setSubcategoriesCount: 0`);
      setSubcategoriesCount(0); // 
    }
  }, [activeCategory])



  useEffect(() => {
console.log(`### ChannelTopics useEffect -- initial category Tree `);
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
      let parentCatKey = SUBCATEGORIES[subcatKey]['catKey'];

      if (Object.keys(userCategories).includes(parentCatKey)) {
        if (!catTree.hasOwnProperty(parentCatKey)) {
          catTree[parentCatKey] = { enabled: true }
        }
        catTree[parentCatKey][subcatKey] = userCategories[parentCatKey].includes(subcatKey) ? true : false;

      } else {
        if (!catTree.hasOwnProperty(parentCatKey)) {
          catTree[parentCatKey] = { enabled: false }
        }
        catTree[parentCatKey][subcatKey] = true;
      }
    }
console.log(`### ChannelTopics -- initial category Tree [${newsSource}]`);
console.log(catTree);

//    const rows = Math.ceil(Object.keys(catTree).length/4);
    const rows = Math.ceil(Object.keys(catTree).length/columns);

    const containerHeight = rows*styles.CONSTANTS.topicHeight + styles.CONSTANTS.saveButtonContainerHeight;
console.log(`### ChannelTopics - [${newsSource}] initial useEffect setOriginalHeight: ${containerHeight}`);
    setOriginalHeight(containerHeight);
    

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
//console.log('## ChannelTopics.chooseCategory');
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
//console.log('### ChannelCategory2.activeCategory.key!=catKey: '+catKey);        
        setActiveCategory(keyPair);

        setCategoriesTree(prevTree => ({
          ...prevTree,
          [catKey]: {
            ...prevTree[catKey],
            'enabled': true
          }
        }));

//      setSubcategoriesCount();

      // Deselect category
      } else if (activeCategory.key==catKey){
//console.log('### ChannelCategory2.activeCategory.key==catKey: '+catKey);        
        const subcatKeys = Object.keys(categoriesTree[catKey]);
        if (subcatKeys.length > 1) {
          setActiveCategory(emptyPair); // close subcategories
          setLastCategoryPressed(keyPair);
//          setSubcategoriesCount(0);  

        // Category has no Subcategories => remove Category from list
        } else {
          setActiveCategory(emptyPair); 
          setCategoriesTree(prevTree => ({
            ...prevTree,
            [catKey]: {
              ...prevTree[catKey],
              'enabled': false
            }
          }));
        }

      }
    }

    const flexBasisCalc = (100 / columns) +'%';

    return (
      <View style={[{ 
        flexBasis: flexBasisCalc, 
//        opacity:  categoriesTree[catKey]&&categoriesTree[catKey]['enabled']==true ? 1 : 0.7,
        alignItems: 'center', 
        height: styles.CONSTANTS.topicHeight },
        catKey==activeCategory.key ? {borderWidth: 2, borderColor: defaultStyles.colorPalette.red2} :''
      ]}>
      <Pressable style={{ flex: 1, width: '100%' }}
        onPress={chooseCategory}
      >
        <ImageBackground 
          style={[defaultStyles.flexCenter, 
            { width: '100%' }
          ]}
          source={CATEGORIES[catKey]['imageSource'] ? {uri: CATEGORIES[catKey]['imageSource']} :MISSINGIMG} 
          resizeMode="cover" 
        >
  {/* */}
          <View style={{
            backgroundColor: '#3d3d3d', width: '100%', height: '100%', position: 'absolute', zIndex: 0,
            opacity: categoriesTree[catKey]&&categoriesTree[catKey]['enabled']==true ? 0.3 : 0.75
          }} />
          <Text style={{ /*position: 'absolute', top:'50%' ,zIndex: 10,*/ 
            color: '#FFF', fontWeight: 'bold', fontSize: 9,
            opacity: categoriesTree[catKey]&&categoriesTree[catKey]['enabled']==true ? 1 : 0.4 
          }}>{CATEGORIES[catKey]['name']}</Text>
        </ImageBackground>

      </Pressable>
      </View>
    )
  }

  const ChannelSubcategory = (props) => {
    const { subcatKey, subcatIndex } = props

    const parentCatKey = SUBCATEGORIES[subcatKey]['catKey'];

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
        copy[parentCatKey][subcatKey] = !copy[parentCatKey][subcatKey];
        return copy;
      })
    }

    const flexBasisCalc = (100 / columns) +'%';

    return (
      <View style={{ 
        flexBasis: flexBasisCalc, alignItems: 'center', 
        height: styles.CONSTANTS.topicHeight,
        opacity: categoriesTree[parentCatKey][subcatKey]==true ? 1 : 0.4 }}
      >
      <Pressable style={{ flex: 1, width: '100%' }}
        onPress={handlePress}
      >
        <ImageBackground 
          style={[defaultStyles.flexCenter, { width: '100%',  }]}
          source={{ uri: SUBCATEGORIES[subcatKey]['imageSource'] }} 
          resizeMode="cover" 
        >
  {/* */}
          <View style={{backgroundColor: '#0000002b', width: '100%', height: '100%', position: 'absolute', zIndex: -1}} />
        
          <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 9, textAlign: 'center' }}>{SUBCATEGORIES[subcatKey]['name']}</Text>
        </ImageBackground>

      </Pressable>
      </View>
    )
  }

  const SubcategoriesContainer = (props) => {
    const { catKey, catIndex } = props; // key and index of the 3, 7, 11th elements followed by SubcategoriesContainer

    // Target specific container
//    const isTheContainer = activeCategory.key != null && Array.from({length: 4}, (v, i) => i + catIndex-3).includes(activeCategory.index); // [0,1,2,3].includes(activeCategory), [4,5,6,7].includes(activeCategory)
    const categoriesLength = getNewsSourceCategories().length;
console.log(`### SubcategoriesContainer categoriesLength: ${categoriesLength}`);    
//    const lastRow = [categoriesLength - (categoriesLength%3), categoriesLength - (categoriesLength%3)+1, categoriesLength - (categoriesLength%3)+2];
    const rowOffset = categoriesLength%columns > 0 ? categoriesLength%columns : columns;
    const lastRow = [categoriesLength - (rowOffset), categoriesLength - (rowOffset)+1, categoriesLength - (rowOffset)+2];
    let isTheContainer = null;

    if ( activeCategory.key != null ) {
      if ( catIndex == categoriesLength-1 && lastRow.includes(activeCategory.index) ) {
        isTheContainer = true;

      } else if ( catIndex != categoriesLength-1 && Array.from({length: columns}, (v, i) => i + catIndex-columns+1).includes(activeCategory.index) ) { // [0,1,2,3].includes(activeCategory), [4,5,6,7].includes(activeCategory)
        isTheContainer = true;
      }
    }
console.log(`### SubcategoriesContainer lastRow: ${lastRow}`);    
//    const isTheContainer = activeCategory.key != null 
//      && Array.from({length: columns}, (v, i) => i + catIndex-columns+1).includes(activeCategory.index) // [0,1,2,3].includes(activeCategory), [4,5,6,7].includes(activeCategory)
    const fillContainer = () => {
/*
console.log('SubcategoriesContainer.fillContainer');
console.log('categoriesTree');
console.log(categoriesTree);
console.log('catIndex');
console.log(catIndex);
*/
//console.log(`### SubcategoriesContainer activeCategory.index: ${activeCategory.index}`);

      // activeCategory not empty AND target specific SubcategoriesContainer
      if (isTheContainer) {
        
        const subcategoryKeys = Object.keys(categoriesTree[activeCategory.key]); 
        
        // Set subcategories count
//        setSubcategoriesCount(subcategoryKeys.length-1); // exclude {enabled:true} key

        let subcatElems = [];
        subcategoryKeys.map((subcatKey, subcatIndex) => {
          if (subcatKey != 'enabled') {
            subcatElems.push(<ChannelSubcategory catIndex={catIndex} subcatKey={subcatKey} subcatIndex={subcatIndex} />);
          }
        })

        let dividerElems = [];
        const flexBasisCalc = (100 / columns) +'%';
//        for(let i=0; i<4; i++) {
        for(let i=0; i<columns; i++) {
//          if (activeCategory.index % 4 == i) {
          if (activeCategory.index % columns == i) {
            dividerElems.push(
              <View style={{ 
//                borderWidth:1, borderColor:'red',
//                flexBasis: '25%', alignItems: 'center', justifyContent: 'center', }}>
                flexBasis: flexBasisCalc, alignItems: 'center', justifyContent: 'center', }}>
                <FontAwesome5 name="chevron-down" color={'#AD0000'} size={20} style={{ 
//                  borderWidth:1, borderColor:'blue', 
                  justifyContent: 'center', alignItems: 'center', width: 19, height: 24 }} />
              </View>)
          } else {
//            dividerElems.push(<View style={{flexBasis: '25%'}}/>)
            dividerElems.push(<View style={{flexBasis: flexBasisCalc}}/>)
          }
        }

        const interpolMarginTop = aMarginTopSubcatContInner.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0]
        })

        return (
          <Animated.View style={{ 
//            borderColor: 'blue', borderWidth: 1,
            flexDirection: 'row', flexBasis: '100%',flexWrap: 'wrap', 
            marginTop: interpolMarginTop,

          }}>
            <View style={{ flexDirection: 'row', flexBasis: '100%', 
              height: styles.CONSTANTS.dividerHeight }}>
              {dividerElems}
            </View>
            {subcatElems}
          </Animated.View>
        );

      } else {
//        setSubcategoriesCount(0); // 
      }

    } 


    const interpolHeight = aHeightSubcatCont.interpolate({
      inputRange: [0, 1],
      outputRange: [0, origHeightSubcatCont]
    })

    return (
      <Animated.View style={[
        { 
//          borderColor: 'green', borderWidth: 2, 
          flexDirection: 'row', flexBasis: '100%', flexWrap: 'wrap', 
          overflow: 'hidden',
//          position: 'relative',
//        flex: 1,
        }, 
        isTheContainer? { height: interpolHeight, opacity: aOpacitySubcatCont } : ''
      ]}>
        { fillContainer() }
      </Animated.View>
    )
  }


  const saveTopics = () => {
console.log('### ChannelTopics.saveTopics');  
    if (contextData.topicsUpdated == false) {
console.log('### categoriesTree');  
console.log(categoriesTree);

      let newCategoriesTree = {};

      for (const catKey in categoriesTree) {
        if (categoriesTree[catKey]['enabled'] == true) {
          newCategoriesTree[catKey] = [];

          for (const subcatKey in categoriesTree[catKey]) {
            // skip 'enabled' key (internal key)
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
        newContext['userInfo']['NEWS_SOURCES'][newsSource]['categories'] = newCategoriesTree;
        newContext['topicsUpdated'] = true;
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

  const columnWidthCalc = (100 / columns) +'%'; 


  const getNewsSourceCategories = () => {
    let newsCategories = NEWS_SOURCES[newsSource]['categories'];
    for (let subcatKey of NEWS_SOURCES[newsSource]['subcategories']) {
      const parentCatKey = SUBCATEGORIES[subcatKey]['catKey'];
      if (newsCategories.indexOf(parentCatKey) == -1) {
        newsCategories.push(parentCatKey);
      }
    }

    return newsCategories;
  }

  return (
    <Animated.View style={[
      { 
//        borderColor: 'blue', borderWidth: 1, 
//        height: (containerHeight>0) ? ( (origHeightSubcatCont>0) ? interpolHeightExpand : interpolatedHeight) :'auto',
        height: (origHeightSubcatCont>0) ? interpolHeightExpand : interpolatedHeight,
        opacity: animatedOpacity, 
        marginTop: isCollapsed? 10 : 0,
      },
      propStyle,
    ]}
      onLayout={(event) => { 
        const onLayoutHeight = event.nativeEvent.layout.height;
        getContainerHeight(onLayoutHeight)
      }}
    >
{/*
      <View style={{position: 'absolute', bottom:-10, zIndex: 100, backgroundColor: '#FFF'}}>
        <Text>
          oH:{originalHeight},
          savedH:{containerHeight},
          oHSub:{origHeightSubcatCont},
        </Text>
      </View>
*/}
      <Animated.View style={{ 
//        borderColor: 'orange', borderWidth: 1, 
        flexGrow:1, flexDirection: 'row', flexWrap: 'wrap',
        top: interpolatedTop,
      }}>
      { getNewsSourceCategories().map((catKey, catIndex) => {
        let categoriesCount = getNewsSourceCategories().length;
//console.log(`ChannelTopics render ${newsSource} categoriesCount: ${categoriesCount}`);        
        return (
//          ( (catIndex+5) % 4 == 0 || catIndex==categoriesCount-1 )// catIndex == 3, 7, 11, .. || last catIndex
          ( (catIndex+columns+1) % columns == 0 || catIndex==categoriesCount-1 )// catIndex == 3, 7, 11, .. || last catIndex
            ? <>
                <ChannelCategory2 catKey={catKey} catIndex={catIndex} /> 
                <SubcategoriesContainer catKey={catKey} catIndex={catIndex} /> 
              </>
            : <ChannelCategory2 catKey={catKey} catIndex={catIndex} />
        )
      }) }
      </Animated.View>

      <View style={{ 
//        borderColor: 'orange', borderWidth: 1,
        flexDirection: 'row', justifyContent:'flex-end', 
        height: styles.CONSTANTS.saveButtonContainerHeight 
      }}>
        <Pressable style={{ 
//          borderColor: 'green', borderWidth: 1,
//          backgroundColor: 'red', borderRadius: 20, width:'25%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
          backgroundColor: 'red', borderRadius: 20, width: columnWidthCalc, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
          onPress={saveTopics}
        >
          <Text style={{ 
//            borderColor: 'blue', borderWidth: 1,
            color: '#FFF',  fontSize: 9, letterSpacing: 2, textAlign:'center' }}>
            SAVE
          </Text>
        </Pressable>
      </View>

    </Animated.View>
  )
}

export default ChannelTopics;