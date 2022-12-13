
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import Icon from '../components/Icon.js';

import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
  CONSTANTS: {
  },
  logo: {
    fontSize: 18,
  },
});


const SettingsIcon = (props) => {
  return (
    /*<Link to={{ screen: 'ProfileScreen', params: { id: 'ProfileScreen' } }}>*/
    <Icon 
      icon="cogwheel" 
      width={20}
      color={defaultStyles.colorPalette.red2}  
      propStyle={{ marginRight: defaultStyles.screenPadding.paddingHorizontal }}
      onPress={() => props.navigation.navigate('Settings', { screen: 'SettingsHomeScreen' })}
    />
    /*</Link>*/
  );
}

export default SettingsIcon;
