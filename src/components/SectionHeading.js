import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

const SectionHeading = (props) => {
	const { heading, underlineStyle } = props;

//	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
//	const CATEGORIES = contextData.CATEGORIES;

	return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
      <Text style={[{ 
        fontSize: 17, fontWeight: 'bold', textTransform: 'lowercase', letterSpacing: 3,
        textAlign: 'center', color: '#262626',
      }]}>
        {heading}
      </Text>

      <View style={[
        { backgroundColor: 'red', position: 'absolute', borderRadius: 1,
          width: 12, height: 2.4, bottom: 0, left: 0 
        },
        underlineStyle
      ]} />
    </View>
	);
}

export default SectionHeading;