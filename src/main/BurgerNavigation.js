import * as React from 'react';
import { Button, View, Image, SafeAreaView, FlatList, Text, StyleSheet, Pressable  } from 'react-native';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Link, useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MENU1 from "../../assets/icon/menu-left-lined.svg";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import HomeScreen from '../screens/HomeScreen.js';
import TopicsScreen from '../screens/TopicsScreen.js';
import SettingsHomeScreen from '../screens/SettingsHomeScreen.js';
import SettingsNewsFeedScreen from '../screens/SettingsNewsFeedScreen.js';

//import Icon from '../components/Icon.js';

import MenuIcon from '../main/MenuIcon.js';
import LogoIcon from '../main/LogoIcon.js';
import SettingsIcon from '../main/SettingsIcon.js';
import BackButton from '../main/BackButton.js';

import CategoriesTree from '../util/CategoriesTree.js';
import defaultStyles from '../styles/defaultStyles.js';



const styles = StyleSheet.create({
	CONSTANTS: {

	},
  logo: {
    fontSize: 18,
  },
});


/*
function SettingsIcon() {
	return (
		<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: defaultStyles.pageOffset.padding }} 
			nativeID="#IMAGECONTAINER123">
            <MaterialCommunityIcons name="cog-outline" color={'red'} size={22} />
            <Ionicons name="settings-outline" color={'red'} size={20} />
		</View>
	);
}
*/



function ScreenTitle(props) {
	const { propStyle } = props;

	return (
	<Text style={[{...propStyle}, { textAlign: 'center', fontSize: 18, letterSpacing: 1 }]}>
		{props.title}
	</Text>
	);
}


function SettingsNavigator({ route, navigation }) {
  return (
    <Stack.Navigator
			initialRouteName="SettingsHome"
			screenOptions={(props) => ({
//				headerShown: false,
				headerLeft: () => <BackButton {...props} navigateToScreen={"Home"} />,	  
				headerTitleAlign: 'center',

//				...TransitionPresets.SlideFromRightIOS,
				animationTypeForReplace: "push",
				presentation: 'transparentModal',

				headerStyle: {
			    height: defaultStyles.screenDimensions.headerHeight,
  				backgroundColor: defaultStyles.colorPalette.red1,
//				    borderBottomWidth: 1, borderBottomColor: 'red',
  			},
			})}
    >
      <Stack.Screen 
      	name="SettingsHome" 
      	component={SettingsHomeScreen} 
				options={(props) => ({
//					headerShown: false   
					headerTitle: () => (
						<ScreenTitle 
							title={"Settings"} 
							propStyle={{ color: '#FFF' }}
						/>
					), 
				})}

      />
      <Stack.Screen 
      	name="SettingsNewsFeed" 
      	component={ (props) => <SettingsNewsFeedScreen {...props} title={"news feed"} />} 
				options={(props) => ({
//					headerShown: false  
					headerTitle: (props) => (
						<ScreenTitle 
							title={"Settings"} 
							propStyle={{ color: '#FFF' }}
						/>
					), 
				})}
      />
      <Stack.Screen name="Profile3" component={ProfileScreen3} />
    </Stack.Navigator>
  );
}


function ProfileScreen3({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile3 Screen</Text>
    </View>
  );
}


function BurgerNavigation() {
  return (
  	<Drawer.Navigator 
			initialRouteName="Home"
			id="HomeDrawer"
			screenOptions={(props) => ({
				drawerPosition: 'left',
				drawerType: 'slide',
				animationTypeForReplace:"pop",
	//			headerShown: false,
				headerTitleAlign: 'center',
				headerLeft: () => <MenuIcon {...props} />,	
				headerStyle: {
			    height: defaultStyles.screenDimensions.headerHeight,
  			},
			})}
		>
			<Drawer.Screen 
				name="Home" 
				component={HomeScreen} 
				options={(props) => ({
					headerTitle: () => <LogoIcon {...props} />,
					headerRight: () => <SettingsIcon {...props} />,	        
				})}
			/>
			<Drawer.Screen 
				name="Topics" 
				component={TopicsScreen} 
				options={(props) => ({
	//				headerShown: false            
					headerTitle: (props) => (
						<ScreenTitle 
							title={"Topics"} 
							propStyle={{ color: '#FFF' }}
						/>

					),
					headerLeft: (props) => <BackButton {...props} navigateToScreen={"Home"} />,	
					headerStyle: {
	  				backgroundColor: '#AD0000',
//				    borderBottomWidth: 1, borderBottomColor: 'red',
				    height: defaultStyles.screenDimensions.headerHeight,
	  			},
				})}
			/>		

	    <Drawer.Screen 
	    	name="Settings" 
	    	component={SettingsNavigator} 
	    	options={(props) => ({
					headerShown: false,           
				})}
	    />

			<Drawer.Screen name="*CategoriesTree" component={CategoriesTree} />

		</Drawer.Navigator>
  );
}

export default BurgerNavigation;