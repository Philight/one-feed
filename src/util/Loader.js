
import { ActivityIndicator, Image, Animated, TouchableWithoutFeedback, Pressable, 
  SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

/*
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
*/
import defaultStyles from '../styles/defaultStyles.js';

const Loader = (props) => {
  const { propStyle, color, } = props;

  return (
    <View style={[
      {  },
      propStyle
    ]}>
      <ActivityIndicator size="large" color={defaultStyles.colorPalette.red1} />
    </View>
  )
}

export default Loader;
