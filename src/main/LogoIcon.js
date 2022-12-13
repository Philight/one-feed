
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

//import Icon from '../components/Icon.js';
import defaultStyles from '../styles/defaultStyles.js';


const styles = StyleSheet.create({
  CONSTANTS: {
  },
  logo: {
    fontSize: 18,
  },
});


const LogoIcon = (props) => {
  const { propStyle } = props;

  return (
    <Animated.View style={[ { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}, propStyle ]}>

      <Text style={{ fontSize: styles.logo.fontSize, }}><Text style={{ color: 'red', fontWeight: 'bold' }}>o</Text>ne</Text>

      <View style={{ borderWidth: 1.7, borderColor: 'red', borderRadius: 50, 
        width: 6, height: 6, marginTop: 9.5 }} />
      
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: styles.logo.fontSize, }}>
          fe
        </Text>

        <View>
          <Text style={{ fontSize: styles.logo.fontSize }}>e</Text>
          <View style={{ backgroundColor: 'red', width: 8, height: 2, position: 'absolute', bottom: 0, left: 0.8, borderRadius: 25 }}/>
        </View>

        <Text style={{ fontSize: styles.logo.fontSize, }}>
          d
        </Text>
      </View>

    </Animated.View>
  );
}

export default LogoIcon;
