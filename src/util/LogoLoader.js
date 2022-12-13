import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';

import { Image, Animated,Easing,  
TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import LogoIcon from '../main/LogoIcon.js';

import defaultStyles from '../styles/defaultStyles.js';


const styles = StyleSheet.create({
  CONSTANTS: {
  },
  logo: {
  },
});


const useLoopAnimation = (animationFn) => {
  // loopAnimation halts when changing state variables (using useState) for unknown reason
  // so use a let variable instead.
  let stopped = false;
  const loopAnimation = () => {
    if (stopped) return false;
    animationFn().start(() => loopAnimation());
  };

  // this runs on component dismount to stop the recursive loop.
  useEffect(() => () => {
    stopped = true;
  });
  return loopAnimation;
};


const LogoLoader = (props) => {
  const { propStyle, color, animationDuration } = props;

  const ANIM_DURATION = animationDuration || 900;

  const [aScale, setAScale] = useState(new Animated.Value(0));
  const [aOpacity, setAOpacity] = useState(new Animated.Value(0));

  const [isStopped, setIsStopped] = useState(false);

  let stopped = false;
  const animatePulse = (isReverse) => {
console.log('### LogoLoader ANIMATION isReverse is: '+isReverse);   
    if (stopped) return false;
    Animated.parallel([
      // MAIN container
      Animated.timing(aScale, {
        toValue: !isReverse ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(aOpacity, {
        toValue: !isReverse ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
//        easing: Easing.linear,
        useNativeDriver: false
      }),
    ]).start(() => {
      animatePulse(isReverse? false : true);
    });
  }
/*
  const loopAnimation = useLoopAnimation(() => {
      Animated.sequence([animatePulse(false), animatePulse(true)])
    }
  );
*/
  useEffect(() => {
    animatePulse(true);
  }, []);

  useEffect(() => () => {
    stopped = true;
    setIsStopped(true);
  });

  const interpolatedScale = aScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.23]
  })

  const interpolatedOpacity = aOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 0.95]
  })

  return (
    <LogoIcon propStyle={{ opacity: interpolatedOpacity, transform: [{ scale: interpolatedScale }], }} />
  );
}

export default LogoLoader;
