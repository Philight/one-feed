import * as React from 'react';
import { Button, View, Image, SafeAreaView, FlatList, Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Link } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

import HomeScreen from '../screens/HomeScreen.js';
import TopicsScreen from '../screens/TopicsScreen.js';

import CategoriesTree from '../util/CategoriesTree.js';

import defaultStyles from '../styles/defaultStyles.js';
const ICON_BURGER = require('../../assets/icon/menu-left-lined.svg');
const ICON_SETTINGS = require('../../assets/icon/cogwheel.svg');


const listItem = ({ item }) => (
	<Text style={{...styles.listItem}} 
		onPress={() => {
			if (selectedList == "key") {
			  if (KEYS_LIST[item].hasOwnProperty('enharmonicName')) {
			    modalOption(KEYS_LIST[item].name+'/'+KEYS_LIST[item].enharmonicName);
			  } else {
			    modalOption(KEYS_LIST[item].name);
			  }
			} else {
			  modalOption(item.name);
			}
		}}
	>
	  { selectedList != "key" ? item.name 
	    : KEYS_LIST[item].hasOwnProperty('enharmonicName') ? KEYS_LIST[item].name+'/'+KEYS_LIST[item].enharmonicName : KEYS_LIST[item].name }
	</Text>
);

function LogoIcon() {
  return (
  	<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} 
  		nativeID="#IMAGECONTAINER123">
  		<View style={{flex: 1, /*display: 'inline-flex',*/ flexDirection: 'row', alignItems: 'flex-end', fontSize: 22 }}>
{/*		
	  		<span style={{ color: 'red', fontWeight: 500 }}>o</span>ne
*/}	  		
	  		<Text><Text style={{ color: 'red', /*fontWeight: 500*/ }}>o</Text>ne</Text>
	  		
	  		<View>
		  		<View style={{ border: '2px solid red', borderRadius: 50, /*display: 'inline',*/ marginBottom: 4, width: 6, height: 6 }} />
	  		</View>
	  		<Text>fe<Text>e<Text style={{ backgroundColor: 'red', width: 9, height: 2.4, position: 'absolute', bottom: 0 }}/></Text>d</Text>
  		</View>
  	</View>
  );
}

function SettingsIcon() {
	return (
		<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: defaultStyles.pageOffset.padding }} 
			nativeID="#IMAGECONTAINER123">
            <MaterialCommunityIcons name="cog-outline" color={'red'} size={22} />
            <Ionicons name="settings-outline" color={'red'} size={20} />
		</View>
	);
}

function MenuIcon() {
  return (
  	<View nativeID="#IMAGECONTAINER123">
	    <Image
	      style={{ width: 50, height: 50 }}
	      source={ICON_BURGER}
	      nativeID="#IMAGE-456"
  	    />
  	</View>
  );
}

function ScreenTitle(props) {
	const { propStyle } = props;

	return (
	<Text style={[{...propStyle}, { textAlign: 'center' }]}>
		{props.title}
	</Text>
	);
}

function BackButton(props) {
  return (
    <View style={{ flexDirection:'row' }}>
    	<Link to={{ screen: 'Home', params: { id: 'home' } }}>
			<View style={{ 
			backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20, 
			justifyContent: 'center', alignItems:'center' 
			}}>
			<MaterialCommunityIcons name="chevron-left" color={'#AD0000'} size={34} 
				style={{ 
					/*display: 'inline-flex', */justifyContent: 'center', alignItems: 'center',
					marginLeft: -3
				}} 
			/>
			</View>

			<View style={{ 
			backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20, 
			justifyContent: 'center', alignItems:'center' 
			}}>
			<FontAwesome5 name="chevron-left" color={'#AD0000'} size={18} 
				style={{ 
					/*display: 'inline-flex', */justifyContent: 'center', alignItems: 'center',
					marginLeft: -3
				}} 
			/>
			</View>

			<View style={{ 
			backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20,
			justifyContent: 'center', alignItems:'center' 
			}}>
			<Octicons name="chevron-left" color={'#AD0000'} size={26} 
				style={{ 
					/*display: 'inline-flex', */justifyContent: 'center', alignItems: 'center',
					marginLeft: -3
				}} 
			/>
			</View>
    	</Link>
    </View>
  );
}

function BurgerNavigation() {
  return (
  	<Drawer.Navigator 
			initialRouteName="Topics"
			id="HomeDrawer"
			screenOptions={{
				drawerPosition: 'left',
	//			headerShown: false,
				headerTitleAlign: 'center',
				drawerContentStyle: (props) => <MenuIcon {...props} />
			}}
	>
		<Drawer.Screen 
			name="Home" 
			component={HomeScreen} 
			options={{
				headerTitle: (props) => <LogoIcon {...props} />,
				headerRight: (props) => <SettingsIcon {...props} />,	        
			}}
		/>
		<Drawer.Screen 
			name="Topics" 
			component={TopicsScreen} 
			options={{
				headerTitle: (props) => (
					<ScreenTitle 
						title={"Choose from available\nNews Channels"} 
						propStyle={{ color: '#FFF' }}
					/>

				),
				headerLeft: (props) => <BackButton {...props} />,	
//				headerShown: false            
				headerStyle: {
      				backgroundColor: '#AD0000',
				    borderBottomWidth: 1,
				    borderBottomColor: 'red',
    			},
			}}
		/>		
		<Drawer.Screen name="*CategoriesTree" component={CategoriesTree} />
	</Drawer.Navigator>
  );
}

export default BurgerNavigation;