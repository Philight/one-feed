
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import Icon from '../components/Icon.js';

import defaultStyles from '../styles/defaultStyles.js';

const MenuIcon = (props) => {

  const handlePress = () => {
    props.navigation.toggleDrawer();
  }

  return (
    <Icon 
      icon="menu-left-lined" 
      width={26}
      color={defaultStyles.colorPalette.red2}  
      propStyle={{ marginLeft: defaultStyles.screenPadding.paddingHorizontal }}
      onPress={handlePress}
    />
  );
}

export default MenuIcon;
