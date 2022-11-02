import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  colorPalette: {
    colorRed1: 'red',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageOffset: {
    margin: 'auto',
    padding: 16
  },
  screenPadding: {
    paddingHorizontal: 16
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
  screenDimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});