import { useState, useCallback,useLayoutEffect, useEffect  } from 'react';
import { StackActions } from '@react-navigation/native';
import debounce from '@react-navigation/stack/src/utils/debounce';

import { Image, Animated, Easing, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';
import { Link, useNavigation, useRoute } from '@react-navigation/native';

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Icon from '../components/Icon.js';

import defaultStyles from '../styles/defaultStyles.js';

const BackButton = (props) => {
  const { navigateToScreen } = props
  const navigation = useNavigation();
  const route = useRoute();

  const ANIM_DURATION = 400;

  const [aLeft, setALeft] = useState(new Animated.Value(0));
  const [aOpacity, setAOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    //alert('useLayoutEffect');
    const {params = {}} = route;
    slideBackground(false);
  }, [route]);

  const slideBackground = (coverBkg) => {
console.log('BackButton useLayoutEffect ANIMATION is: ');   
    Animated.parallel([

      // MAIN container
      Animated.timing(aLeft, {
        toValue: coverBkg ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(aOpacity, {
        toValue: coverBkg ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),

    ]).start();
  }

  const handleBackButton = () => {
console.log("### BackButton handleBackButton");   
console.log(navigation);  
    slideBackground(true);  
    setTimeout(() => {
      slideBackground(false);  
      navigation.goBack();
    }, 400)
//    goBack_WORKAROUND();
  }
/*
  const goBack_WORKAROUND = useCallback(
    debounce(() => {
      if (props.navigation.isFocused() && props.navigation.canGoBack()) {
        props.navigation.dispatch({
          ...StackActions.pop(),
          source: props.route.key,
        });
      }
    }, 50),
    [props.navigation, props.route.key]
  );
*/

  const interpolatedLeft = aLeft.interpolate({
    inputRange: [0, 1],
    outputRange: [-defaultStyles.screenDimensions.width-2, 0]
  })

  const interpolatedOpacity = aOpacity.interpolate({
//    inputRange: [0, 1],
    inputRange:   [0,   0.1,  0.2,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8,  0.9,  1],
//    inputRange: [0,   0,    0,    0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0.75, 1],
//    outputRange: [1, 0],
    outputRange:  [1,   1,    1,    1,    1,    1,    1,    1,    0.7,  0.6,  0.5],
//    outputRange: [1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 0.25, 0],
  })

  return (

    <Pressable onPress={handleBackButton}>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

      <Animated.View style={{ 
        width: defaultStyles.screenDimensions.width+2, height: defaultStyles.screenDimensions.height+defaultStyles.screenDimensions.statusBarHeight, 
        position: 'absolute', zIndex: 100, backgroundColor: '#FFF', 
        left: interpolatedLeft, top: -defaultStyles.screenDimensions.statusBarHeight,
//        opacity: interpolatedOpacity,
//        borderColor: 'red', borderWidth: 1,
      }} />

{/*
      <View style={[{ 
        backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20, 
        justifyContent: 'center', alignItems:'center', flexDirection: 'row' 
      },
        defaultStyles.shadowProps
      ]}>
        <MaterialCommunityIcons name="chevron-left" color={'#AD0000'} size={34} 
          style={{ 
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', transform: [{translateX: -1}]
          }} 
        />
      </View>
*/}
{/*
      <View style={[{ 
        backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20, 
        justifyContent: 'center', alignItems:'center', flexDirection: 'row' 
      },
        defaultStyles.shadowProps
      ]}>
        <FontAwesome5 name="chevron-left" color={'#AD0000'} size={20} 
          style={{ 
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', transform: [{translateX: -1}]
          }} 
        />
      </View>
*/}

      <View style={[
        { 
          backgroundColor: '#FFE1E1', borderRadius: 50, padding: 14, width: 20, height: 20,
          marginLeft: defaultStyles.screenPadding.paddingHorizontal, 
          justifyContent: 'center', alignItems:'center', flexDirection: 'row' 
        },
        defaultStyles.shadowProps
      ]}>
        <Octicons name="chevron-left" color={'#AD0000'} size={28} 
          style={{ 
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', transform: [{translateX: -1}]
          }} 
        />
      </View>

    </View>
    </Pressable>

  );

}

export default BackButton;
