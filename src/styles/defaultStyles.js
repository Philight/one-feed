import { Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
  colorPalette: {
    red1: '#ad0000',
    red2: 'red',
    pink1: '#ffe1e1',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
/* 
  pageOffset: {
    margin: 'auto',
    padding: 16
  },
*/
  screenPadding: {
    paddingHorizontal: 14,
  },
  screenDimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    statusBarHeight: StatusBar.currentHeight,
    headerHeight: 90,
  },

  shadowProps: { 
    shadowColor: "#656565",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.18,
    shadowRadius: 4.59,
    elevation: 5
  },
});