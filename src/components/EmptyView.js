
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import defaultStyles from '../styles/defaultStyles.js';

const NEWSPAPERS1 = require('../../assets/image/newspapers-red-1.png');
const NEWSPAPERS2 = require('../../assets/image/newspapers-blue-1.png');
const NEWSPAPERS3 = require('../../assets/image/newspapers-teal-1.jpg');
//const NEWSPAPERS4 = require('../../assets/icon/newspapers-red.svg');

import NEWSPAPERS4 from "../../assets/icon/newspapers-red.svg";

const EmptyView = () => {
  return (
    <View style={[ 
      defaultStyles.flexCenter,
      { paddingHorizontal: 20 }
    ]}>
{/*
        <Image
          style={{ width: '80%', height: 160 }}
          source={NEWSPAPERS1}
          nativeID="#IMAGE-456"
          resizeMode="contain"
        />
        <Image
          style={{ width: '80%', height: 200 }}
          source={NEWSPAPERS2}
          nativeID="#IMAGE-456"
          resizeMode="cover"
        />
        <Image
          style={{ width: '80%', height: 200 }}
          source={NEWSPAPERS3}
          nativeID="#IMAGE-456"
          resizeMode="cover"
        />
*/}        
{/*

        <Image
          style={[{ width: '80%', height: 160 }]}
          source={NEWSPAPERS4}
          resizeMode="contain"
        />      
*/}        

      <NEWSPAPERS4 height={160} width={"80%"} />

      <Text style={{ fontSize: 18, fontWeight: 'bold', lineHeight: 26, textAlign: 'center', marginTop: 12 }}>Your selected News Channels will appear here</Text>
      <Text style={{ fontSize: 12, letterSpacing: 1, lineHeight: 16, textAlign: 'center', marginTop: 12 }}>Pick from available news sources in the Categories or Subcategories tab</Text>
      
      <View style={{ marginTop: 48 }}>
        <MaterialCommunityIcons name="ray-end-arrow" color={'#d5c6c8'} size={26} style= {{ position: 'absolute', top: -22, left: -12 }}/>
        <FontAwesome name="hand-pointer-o" color={'#d5c6c8'} size={28} />
      </View>

    </View>
  )
}

export default EmptyView;
