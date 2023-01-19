import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import { Link, useNavigation } from '@react-navigation/native';

import Icon from '../components/Icon.js';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

const SettingsColumn = (props) => {
	const { heading, icon, navigateToScreen } = props;

	const navigation = useNavigation();

//	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
//	const CATEGORIES = contextData.CATEGORIES;
{/*
		<Pressable style={[{ 
				flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
				marginBottom: 10,
				backgroundColor: '#FFF',
				borderWidth: 1, borderColor: 'red',
			}]}
			onPress={(e) => navigatetoScreen}
		>
		<Link to={{ screen: 'Home' }} style={{}}>
*/}

	const navigateTo = (e) => {
		navigation.navigate(navigateToScreen);
	}

	return (

		<Pressable style={[{ 
				flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
				marginBottom: 10,
				backgroundColor: '#FFF',
//				borderWidth: 1, borderColor: 'red',
			}]}
			onPress={navigateTo}
		>

			<View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
				<Icon icon={icon} width={20} height={20} color={defaultStyles.colorPalette.red1}
					onPress={navigateTo}
				/>
		    <Text style={[{ 
		    	marginLeft: 10,
		      fontSize: 15, fontWeight: 'bold', letterSpacing: 1,
		      color: '#4b4b4b',
		  	}]}>
		    	{heading}
		    </Text>
			</View>

			<Icon icon={"chevron-up3"} width={17} height={15} color={defaultStyles.colorPalette.red1}
				onPress={navigateTo}
				propStyle={{ transform: [{rotate: '90deg'}]}}
			/>

		</Pressable>

	);


	{/*
		</Link>
		</Pressable>
*/}
}

export default SettingsColumn;