import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

const TopicsSubcategories = (props) => {
	const { activeCategory, propStyle } = props;

	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;

	return (
		<View style={[
        { borderRadius: 25, 
          height:0,  width: '100%', 
          paddingHorizontal: 16, paddingVertical: 18, marginVertical: 10, 
          justifyContent: 'center',
          backgroundColor: '#FFF', color: '#dedcdc',
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
        }
    ]}>
      <Text>Search</Text>
    </View>
	);
}

export default TopicsSubcategories;