import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import { Link } from '@react-navigation/native';

const AnimatedPressable = Animated.createAnimatedComponent(
  Pressable
);

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';

const CategoriesList = (props) => {
	const { activeTopic, updateTopic, transitionDuration, propStyle } = props;

	const contextData = useContext(DataContext);
	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;
//  const NEWS_SOURCES = contextData.NEWS_SOURCES;
  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;
  const USER_SETTINGS = contextData.userInfo.SETTINGS;
	const ISGUESTUSER = contextData.guestUser;
//  const categoriesUpdated = contextData.categoriesUpdated;

  const ANIM_DURATION = transitionDuration || 400;
/*
	categoryTree: {
		top: [],
		culture: ['art', 'music'],
	}
*/
  const [categoryTree, setCategoryTree] = useState({ });
  const [categoriesLength, setCategoriesLength] = useState(0);

	const scaleUp = useRef(new Animated.Value(1)).current; 
	const scaleDown = useRef(new Animated.Value(1)).current; 
	const fadeTranslate = useRef(new Animated.Value(-100)).current; 
	const fadeTranslate2 = useRef(new Animated.Value(-100)).current; 

	useLayoutEffect(() => {
		scaleUp.setValue(1);
		//scaleUp =new Animated.Value(1);
		Animated.parallel([
      Animated.timing(scaleUp, {
        toValue: 1.2,
        duration: ANIM_DURATION,
    		useNativeDriver: false,
      }),
     	Animated.timing(scaleDown, {
        toValue: 1,
        duration: ANIM_DURATION,
    		useNativeDriver: false,
      })/*,/*,
      Animated.timing(fadeTranslate2, {
        toValue: 0,
        duration: ANIM_DURATION,
      }),        */
		]).start();
	}, [activeTopic])

	const updateCategoryTree = () => {
console.log('### CategoriesList useEffect - SETTING CAT TREE');
		if ( !ISGUESTUSER ) {
			let newCatTree = { };

			for (let newsSource in USER_NEWS_SOURCES) {

				const userCategories = USER_NEWS_SOURCES[newsSource]['categories'];
				for (let catKey in userCategories) {

					newCatTree[catKey] = [];

					if (userCategories[catKey].length > 0) {

						for (let subcatKey of userCategories[catKey]) {
							if (newCatTree[catKey].indexOf(subcatKey) === -1) {						
								newCatTree[catKey].push(subcatKey);
							}
						}
					}

				}
			}

console.log('### CategoriesList useEffect - INITIAL CAT TREE');
console.log(newCatTree);
			setCategoryTree(newCatTree);

		// Dummy Category Tree
		} else {
			let newCatTree = { 
				'top': [], 
				'world': [], 
				'polit': [], 
				'culture': [], 
				'tech': [], 
			}

			setCategoryTree(newCatTree);
		}
	}

	useEffect(() => {
		updateCategoryTree();
	}, [USER_NEWS_SOURCES])

	useEffect(() => {
		if (contextData.categoriesUpdated == true) {
			updateCategoryTree();
		}
	}, [contextData.categoriesUpdated])

	const chooseCategory = (key) => {
//console.log('### CategoriesList | choosing category/subcategory: '+key); 
		if (Object.keys(CATEGORIES).includes(key)) {
			updateTopic({ category: key, subcategory: '' });
		} else if (Object.keys(SUBCATEGORIES).includes(key)){
			updateTopic({ category: '', subcategory: key });
		} else {
			updateTopic({ category: 'undefined', subcategory: 'undefined' });
		}
	}

	const listItem = ({ item, index }) => {
		const itemIsActive = [activeTopic.category, activeTopic.subcategory].includes(item);
		return (
			<>
				<AnimatedPressable
					nativeID="categories-item"
					style={[
						{ marginHorizontal: 12, marginVertical: 8 },
						{ transform: [{ scale: itemIsActive ? scaleUp : 1 }] },
						//{ transform: [{ scale: activeCategory!=index ? scaleDown : 1 }] }
					]}
					onPress={() => chooseCategory(item)}
				>
			  	<Text style={{ /*fontWeight: 400, */color: "#414141" , opacity: itemIsActive? 1 : 0.5 }}>
			  		{CATEGORIES.hasOwnProperty(item) ? CATEGORIES[item]['name'] : SUBCATEGORIES.hasOwnProperty(item) ? SUBCATEGORIES[item]['name'] : 'undefined'}
			  	</Text>
				  	
			  	{ itemIsActive? <View style={{ backgroundColor: defaultStyles.colorPalette.red2, width: '100%', height: 1.8, marginTop: 2, borderRadius: 25 }} /> :''}
				</AnimatedPressable>

		    { ISGUESTUSER && (index==getCatSubcatList().length-1) ? 
		    	<View style={{ 
	//	    		borderWidth: 1, borderColor: 'blue', 
		    		alignItems: 'center', justifyContent: 'center', 
		    	}}>
		  			<Link to={{ screen: 'Topics', params: { id: 'topics' } }} style={{
	//	  				borderWidth: 1, borderColor: 'green', 
		  				alignItems: 'center', justifyContent: 'center', 
		  				borderRadius: 25, backgroundColor: defaultStyles.colorPalette.red1, 
		  				paddingVertical: 3, paddingHorizontal: 10, 
			    		marginLeft: 8,
			    		marginRight: defaultStyles.screenPadding.paddingHorizontal,
		  			}}>
				    	<Text style={{ 
				    		color: '#FFF', fontSize: 11, lineHeight: 13, 
				    	}}>View more Topics</Text>
		    		</Link>
		    	</View> :''}
			</>
		)
	};


		const getCatSubcatList = () => {
			if (USER_SETTINGS && USER_SETTINGS.MERGE_CATEGORIES == true) {
//console.log('### CategoriesList.getCatSubcatList')	;
//console.log(Object.keys(categoryTree))	;
				return Object.keys(categoryTree);

			} else {
			// include both categories and subcategories in one array
				let topics = [];
				for (let catKey of Object.keys(categoryTree)) {
					// Add Category instead of Subcategories
					if (categoryTree[catKey].length == 0) {
						topics.push(catKey);
					// Else use subcategories
					} else {
						topics.push(...categoryTree[catKey]);
					}
				}
//console.log('### CategoriesList.getCatSubcatList')	;
//console.log(topics)	;
				return topics;
			}
		}

  	return (
    	<SafeAreaView style={[{ 
//      		borderWidth: 1, borderColor: 'blue', 
      		width: defaultStyles.screenDimensions.width, 
      		justifyContent: 'center', alignItems: 'center', 
//      		marginLeft: -defaultStyles.screenPadding.paddingHorizontal,
      	},
    		propStyle
    	]}>
    	
        <FlatList
					nativeID="categories-list"
					data={getCatSubcatList()}
					renderItem={listItem}
					keyExtractor={item => item.id}
					horizontal
        />

    	</SafeAreaView>
	);
}

export default CategoriesList;