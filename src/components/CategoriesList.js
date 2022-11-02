import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(
  Pressable
);

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';

const CategoriesList = (props) => {
	const { activeCategory, updateCategory, transitionDuration, propStyle } = props;

	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;

  	const ANIM_DURATION = transitionDuration | 400;

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
	        }),
	       	Animated.timing(scaleDown, {
	          toValue: 1,
	          duration: ANIM_DURATION,
	        })/*,/*,
	        Animated.timing(fadeTranslate2, {
	          toValue: 0,
	          duration: ANIM_DURATION,
	        }),        */
		]).start();
	}, [activeCategory])

  	const chooseCategory = (key) => {
console.log('choosing category: '+key);  
		updateCategory(key);
  	}

	const listItem = ({ item, index }) => (
		<AnimatedPressable
			nativeID="categories-item"
			style={[
				{ marginHorizontal: 12, marginVertical: 8 },
				{ transform: [{ scale: activeCategory==item ? scaleUp : 1 }] },
				//{ transform: [{ scale: activeCategory!=index ? scaleDown : 1 }] }
			]}
			onPress={() => chooseCategory(item)}
		>
{/*
		  	<span style={{ fontWeight: 400, color: "#414141" , opacity: activeCategory==item ? 1 : 0.5 }}>{CATEGORIES[item].category}</span>
*/}
		  	<Text style={{ /*fontWeight: 400, */color: "#414141" , opacity: activeCategory==item ? 1 : 0.5 }}>{CATEGORIES[item].category}</Text>
		  	
		  	{activeCategory==item ? <View style={{ backgroundColor: defaultStyles.colorPalette.colorRed1, width: '100%', height: 1.8, marginTop: 2 }} /> :''}
		</AnimatedPressable>
	);

  	return (
  		<View style={[propStyle, {width: defaultStyles.screenDimensions.width} ]}>
      	<SafeAreaView style={{ width: '100%', border: '1px solid blue', overflow: 'hidden' }}>
	        <FlatList
						nativeID="categories-list"
						data={Object.keys(CATEGORIES)}
						renderItem={listItem}
						keyExtractor={item => item.id}
						horizontal
	        />
      	</SafeAreaView>
  		</View>
	);
}

export default CategoriesList;