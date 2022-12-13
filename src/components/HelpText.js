
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import defaultStyles from '../styles/defaultStyles.js';


const HelpTextTitle = (props) => {
  const { title, circleStyle } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end',   
//        borderWidth:1, borderColor: 'red',
    }}>
      <View style={[
        { position: 'absolute', left: 0, bottom: 0,
          borderWidth: 2.5, borderColor: 'red', borderRadius: 50, 
          width: 8, height: 8, },
          circleStyle
      ]} />

      <Text style={[{ 
        color: '#FFF',
        fontWeight: 'bold', fontSize: 18, lineHeight: 18, letterSpacing: 3, 
      }]}>
        {title}
      </Text>      

      <View style={{ 
        backgroundColor: 'red', position: 'absolute',
        width: 46, height: 2.4, bottom: -6, left: 1.4 }} />
    </View>
  )
}

const HelpTextParagraph = (props) => {
  const { text, circleStyle } = props;
{/*
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{
        color: '#FFF',
        fontSize: 10, lineHeight: 16, letterSpacing: 2,
        position: 'relative', 
      }}>
        {text}
      </Text>
      <View style={{ backgroundColor: 'red', width: 14, height: 2.4, position: 'absolute', bottom: -6, left: 1.4 }}/>
    </View>
  )
*/}

  return (
    <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'flex-end' }}>
      <View style={[
        { position: 'absolute', left: 0, bottom: 0,
          borderWidth: 2.5, borderColor: 'red', borderRadius: 50, 
          width: 8, height: 8, },
          circleStyle
        ]} />

      <Text style={{
        color: '#FFF',
        fontSize: 10, lineHeight: 16, letterSpacing: 2,
        position: 'relative', 
      }}>
        {text}
      </Text>

      <View style={{ 
        backgroundColor: 'red', position: 'absolute', 
        width: 14, height: 2.4, bottom: -6, left: 1.4 }}/>
    </View>
  )


}

const HelpText = (props) => {
  const { title, titleCmp, paragraphs } = props;

  return (
    <View
      style={[
        {
          width: '100%',
          borderRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          marginTop: 10,
          backgroundColor: '#000'
        },
        defaultStyles.shadowProps,
      ]}
    >
      <HelpTextTitle 
        title={`How d  es it work?`}
        circleStyle={{
          left: 68.4, bottom: 3.8,
          borderWidth: 2.6,
          width: 10.4, height: 10.4, 
        }}
      />
{ /*
      paragraphs.map((text) => (

      <View>
        <Text style={{
          color: '#FFF',
          fontSize: 10, lineHeight: 16, letterSpacing: 2,
          position: 'relative', marginTop: 16
        }}>
          {text}
        </Text>
        <View style={{ backgroundColor: 'red', width: 14, height: 2.4, position: 'absolute', bottom: -6, left: 1.4 }}/>
      </View>

      ))
*/    }

      <HelpTextParagraph 
        text={`Select from available News Channels\nby Categ  ry or Subcategory`}
        circleStyle={{
          left: 56.3, bottom: 3.6,
          borderWidth: 1.3,
          width: 5.8, height: 5.8, 
        }}
      />

      <HelpTextParagraph 
        text={`News Channels can be further specified\nby picking t  pics under "Your Channels"`}
        circleStyle={{
          left: 75.5, bottom: 3.6,
          borderWidth: 1.3,
          width: 5.8, height: 5.8, 
        }}
      />
    </View>
  );
}

export default HelpText;
