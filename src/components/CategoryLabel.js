import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

const CategoryLabel = (props) => {
	const { label, catKey, subcatKey, 
    color, backgroundColor, propStyle } = props;

	const contextData = useContext(DataContext);
	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;

  const getLabel = () => {
//console.log('### CategoryLabel.getLabel');    
//console.log(catKey);    
//console.log(subcatKey);    
    return catKey ? CATEGORIES[catKey]['name'] : subcatKey ? SUBCATEGORIES[subcatKey]['name'] : ''; 
  }

  const getColor = () => {
    let colorCode = '';
    colorCode = catKey ? CATEGORIES[catKey]['color'] : subcatKey ? SUBCATEGORIES[subcatKey]['color'] : '';
    return colorCode ? colorCode : color ? color : '#FFF';
  }

	return (
		<Text style={[
      { borderRadius: 25, 
        paddingHorizontal: 6, paddingVertical: 2, 
        justifyContent: 'center', alignItems: 'center', 
        backgroundColor: backgroundColor? backgroundColor :'#000', 
        color: getColor(),
        fontSize: 6, lineHeight: 7,
      },
      { 
shadowColor: "#656565",
shadowOffset: {
width: 0,
height: 1,
},
shadowOpacity:  0.18,
shadowRadius: 4.59,
elevation: 5
      },
      propStyle
    ]}>
      {label || getLabel()}
    </Text>
	);
}

export default CategoryLabel;