import { useContext, useState, useEffect, useLayoutEffect, useRef, 
forwardRef, useImperativeHandle } from 'react';

import { Animated, Easing, ScrollView, TouchableWithoutFeedback, Pressable, ImageBackground, View, Text, StyleSheet } from 'react-native';
import { useNavigation  } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import RenderHtml from 'react-native-render-html';

import DataContext from '../contexts/DataContext.js';

import NewsSource from '../components/NewsSource.js';
import Icon from '../components/Icon.js';
import CategoryLabel from '../components/CategoryLabel.js';

import { openURL } from '../util/utilMethods.js';
import { styleHTML, formatPubDate } from '../util/parsingMethods.js';
import defaultStyles from '../styles/defaultStyles.js';


const tagsStyles = {
  body: {
//    maxHeight: styles.CONSTANTS.feedItem.descriptionHeight+'px',
    overflow: 'hidden',
  },
  span: {
//    color: styles.CONSTANTS.feedItem.descriptionColor,
//    fontSize: styles.CONSTANTS.feedItem.descriptionFontSize,
//    lineHeight: 18,
  }, 
  ol: {
    marginTop: 0,
    marginBottom: 8,
//    marginLeft: 4,
    padding: 0,
//    paddingLeft: 8,
    listStyleType: 'none',
  },
  ul: {
    marginTop: 0,
    marginBottom: 8,
//    marginLeft: 4,
    padding: 0,
//    paddingLeft: 8,
    listStyleType: 'none',
  },
  li: {
    marginBottom: 16,
    fontSize: 11,
//    letterSpacing: 1,
    lineHeight: 20,
  },
  p: {
    marginBottom: 16,
    fontSize: 11,
//    letterSpacing: 1,
    lineHeight: 20,
  },
  a: {
    color: defaultStyles.colorPalette.red1,
    textDecorationColor: defaultStyles.colorPalette.red1,
  }

};

const introTagStyles = {
  body: {
    maxHeight: 42,
    overflow: 'hidden',
    paddingHorizontal: 4,
  },
  li: {
    color: '#FFF',
    fontSize: 11,
    lineHeight: 20,
  },
  p: {
    color: '#FFF',
    fontSize: 11,
    lineHeight: 20,
  },
  a: {
    color: '#FFF',
//    textDecorationStyle: 'none',
    textDecorationLine: "none",
//    textDecorationColor: "none",
  }
};

const classesStyles = {

}

const PostModal = forwardRef((props, ref) => {
  const {  } = props;

  const styles = StyleSheet.create({
    modalOpened: {
      opacity: 1, visibility: 'visible', zIndex: 10000
    },
    modalClosed: {
      opacity: 0, visibility: 'hidden',  zIndex: -10
    },
    categoryLabel: { 
      fontSize: 9, lineHeight: 12,
      paddingHorizontal: 10, paddingVertical: 2, 
      marginRight: 4,
    }
  });

  const navigation = useNavigation();

  const ANIM_DURATION = 400;

  const contextData = useContext(DataContext);
  const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const NEWS_SOURCES = contextData.NEWS_SOURCES;

  const [modalShown, setModalShown] = useState(false);
  const [feedPost, setFeedPost] = useState( {} );

  const [aScale, setAScale] = useState(new Animated.Value(0));

  const scrollViewRef1 = useRef(null);
  const scrollViewRef2 = useRef(null);
  const [leftIsScrolling, setLeftIsScrolling] = useState(false);
  const [rightIsScrolling, setRightIsScrolling] = useState(false);


//  useLayoutEffect(() => {
  const containerAnimation = (isOpen) => {
//    aScale.setValue(0);
console.log(`### PostModal open animation`);   
    Animated.parallel([
      Animated.timing(aScale, {
        toValue: isOpen ? 1 : 0,
        duration: ANIM_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }
//  }, []);


  const openModal = (post) => {
console.log('### PostModal openModal post');
console.log(post);
    navigation.setOptions({ headerShown: false });
    setModalShown(true);
    containerAnimation(true);

    const formattedDate = formatPubDate(post.newsSource, post.pubDate[0], true);
    const formattedDesc = styleHTML(post.newsSource, post.description[0]);

    const feedPostData = {
      title: post.title,
      category: post.category,
      subcategory: post.subcategory,
      newsSource: post.newsSource,
      link: post.link[0],
      pubDate: formattedDate,
      description: formattedDesc,
      media: post.media,
    }
console.log('### PostModal openModal feedPostData');
console.log(feedPostData);
    setFeedPost(feedPostData)
  }

  const closeModal = () => {
    navigation.setOptions({ headerShown: true });
    setTimeout(() => {
      setModalShown(false);
    }, ANIM_DURATION)
    containerAnimation(false);
  }

  useImperativeHandle(ref, () => ({
//    return {
      openModal: openModal
//    };
  }));

  const interpolatedScale = aScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.01, 1]
  })

  return (
    <Animated.View nativeID="#PostModal" 
      style={[
      {
        borderColor: 'purple', borderWidth: 1, 
        position: 'absolute',  top: 0, left: 0,
        height: defaultStyles.screenDimensions.height + defaultStyles.screenDimensions.statusBarHeight, 
        width: defaultStyles.screenDimensions.width,
//        height: (defaultStyles.screenDimensions.height + defaultStyles.screenDimensions.statusBarHeight) / 2, 
//        width: defaultStyles.screenDimensions.width / 2,
        transform: [ { scale: 0.01 } ],
        transform: [ { scale: interpolatedScale } ],
        backgroundColor: '#FFF',
      },
      modalShown ? styles.modalOpened : styles.modalClosed,
    ]}>

      <View style={{
//            borderWidth: 1, borderColor: 'blue',
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
        paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal, 
//            paddingTop:defaultStyles.screenPadding.paddingHorizontal 
//            padding: defaultStyles.screenPadding.paddingHorizontal,
        height: defaultStyles.screenDimensions.headerHeight,
        position: 'absolute', width: '100%', zIndex: 1,
      }}>

        <Icon 
          icon="x-mark" 
          width={28}
          height={28}
          color={defaultStyles.colorPalette.red1}  
          propStyle={{ 
            padding: 2,
            borderRadius: 100,
            backgroundColor: defaultStyles.colorPalette.pink1,
  //                marginHorizontal: defaultStyles.screenPadding.paddingHorizontal, marginVertical:defaultStyles.screenPadding.paddingHorizontal, 
  //                alignItems: 'center',
  //                marginLeft: defaultStyles.screenPadding.paddingHorizontal
             }}
          onPress={() => closeModal() }
        />

      </View>

      <ImageBackground 
        style={{ 
          width: '100%', height: defaultStyles.screenDimensions.height / 3 * 2,
          position:'absolute', top: 0, zIndex: -2
        }}
        source={{ uri: feedPost.media ? feedPost.media['url'] : feedPost.newsSource? NEWS_SOURCES[feedPost.newsSource]['backgroundImage'] : '' }}
//        : 'https://c4.wallpaperflare.com/wallpaper/535/787/608/moon-night-eclipse-portrait-display-hd-wallpaper-preview.jpg' }} 
        resizeMode="cover" 
      >
        {/* OVERLAY */}
        <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',  }} />

        <View style={{ 
          top: defaultStyles.screenDimensions.height / 5, zIndex: 1,
          paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal, 
        }}>

          <View style={{ flexDirection: 'row', marginBottom: 10, }}>
            <CategoryLabel propStyle={[ styles.categoryLabel ]} catKey={feedPost.category ? feedPost.category :''} subcatKey={feedPost.subcategory ? feedPost.subcategory :''} />
            { feedPost.subcategory ? <CategoryLabel propStyle={[ styles.categoryLabel ]} catKey={SUBCATEGORIES[feedPost.subcategory].category} /> :'' }
          </View>

          <Text style={{ 
            paddingHorizontal: 3, marginBottom: 8,
            fontSize: 30, fontWeight: 'bold', lineHeight: 40, letterSpacing: 1, color: '#FFF', maxHeight: 128, overflow: 'hidden'}}>
            {feedPost.title}
          </Text>

          {/* DESCRIPTION */}
          { ['</p>', '</div>', '</a>', '</li>'].some(tag => feedPost.description && feedPost.description.includes(tag)) 
            ? <RenderHtml 
                contentWidth={"100%"} 
                source={{ html: `<span>`+feedPost.description+'</span>' }}
                tagsStyles={{...tagsStyles, ...introTagStyles}} 
              />
            : <Text style={{ 
                color: '#FFF', fontSize: 11, lineHeight: 20,
              }}>
                {feedPost.description}
              </Text>
          }

        </View>
      </ImageBackground>
{/*
      <ScrollView
        scrollEventThrottle={16}
        ref={scrollViewRef1}
        onScroll={e => {
console.log('### PostModal ScrollView Left scrolling..');            
          if (!leftIsScrolling) {
            setRightIsScrolling(true);
            var scrollY = e.nativeEvent.contentOffset.y;
            scrollViewRef2.current?.scrollTo({ x: 0, y: scrollY, animated: true });
          }
          setLeftIsScrolling(false);
        }}
        nativeID="modal-scrollView"
        style={{
          borderWidth: 2, borderColor: 'teal',
          width: '90%', height: defaultStyles.screenDimensions.height, height: 2000,
          backgroundColor: 'rgba(255,0,0,0.3)',
          position: 'absolute',
//          top: defaultStyles.screenDimensions.height / 3 * 2,
//              marginBottom: defaultStyles.screenPadding.paddingHorizontal,
//              paddingBottom: 300,
//            overflow : 'visible',
          zIndex: 0,
        }}>

        <View style={{backgroundColor: 'rgba(0,255,0,0.3)', top: 100, height: 300, width: '100%'}} />
      </ScrollView>
*/}
      <ScrollView
        nativeID="modal-scrollView"
        style={{
          borderWidth: 1, borderColor: 'green',
          width: '100%', 
          backgroundColor: 'transparent',
//          zIndex: 0,
//              marginBottom: defaultStyles.screenPadding.paddingHorizontal,
//              paddingBottom: 300,
//            overflow : 'visible',
        }}
        contentContainerStyle={[
          {
  //          borderWidth: 1, borderColor: 'orange',
  //          overflow: 'visible',
  //                height: 1000,
          },
        ]}
      >



        {/* OVERLAY */}
        <View style={[ 
          { 
            position: 'absolute',
            width: '100%', height: defaultStyles.screenDimensions.height / 3 * 2, zIndex: -1,
          }
        ]}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.98)']}
            style={{ 
    //                width: defaultStyles.screenDimensions.width,
              width: '100%',
              height: '100%',
  //            height: defaultStyles.screenDimensions.height / 3 * 2,
  //            position: 'absolute',
    //                left: -defaultStyles.screenPadding.paddingHorizontal,
            }} 
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.98)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']}
            style={{ 
    //                width: defaultStyles.screenDimensions.width,
              width: '100%',
              height: '100%',
  //            height: defaultStyles.screenDimensions.height / 3 * 2,
  //            position: 'absolute',
    //                left: -defaultStyles.screenPadding.paddingHorizontal,
            }} 
          />
        </View>


        {/* CONTENT */}

        <View style={[
          { 
            zIndex: 10,
            marginTop: defaultStyles.screenDimensions.height / 3 * 2 -(defaultStyles.screenDimensions.height / 10),
  //                bottom: -200,
//            height: 1400,  
            borderRadius: 20,
            backgroundColor: '#FFF',
            marginHorizontal: defaultStyles.screenPadding.paddingHorizontal,
            marginBottom: defaultStyles.screenPadding.paddingHorizontal,
  //              paddingBottom: 300,
  //                marginHorizontal: 5,
            paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal,
            paddingVertical: defaultStyles.screenPadding.paddingHorizontal * 2,
//            paddingTop: defaultStyles.screenPadding.paddingHorizontal,
            paddingBottom: 100,
          },
          defaultStyles.shadowProps,
        ]}>


          {/* POST META */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: defaultStyles.screenPadding.paddingHorizontal }}>

            {/* POST AUTHOR */}
            <View style={{ 
              flexDirection: 'row', alignItems: 'center', 
              borderRadius: 25, padding: 6,
              backgroundColor: defaultStyles.colorPalette.pink1 
            }}>
              <View style={{ borderRadius: 25, borderWidth: 1.2, borderColor: defaultStyles.colorPalette.red2, width: 26, height: 26 }}>
              </View>
              <Text style={{ marginHorizontal: 8, color: defaultStyles.colorPalette.red1, fontSize: 12 }}>Author</Text>
            </View>

            {/* POST PUB DATE */}
            <View style={{ 
              flexDirection: 'row', alignItems: 'center', 
              borderRadius: 25, padding: 9.8,
              backgroundColor: defaultStyles.colorPalette.pink1 
            }}>
              <Icon 
                icon="publish" 
                width={16}
                height={16}
                color={defaultStyles.colorPalette.red1}  
                propStyle={{ 
//                marginHorizontal: defaultStyles.screenPadding.paddingHorizontal, marginVertical:defaultStyles.screenPadding.paddingHorizontal, 
//                alignItems: 'center',
//                marginLeft: defaultStyles.screenPadding.paddingHorizontal
                }}
              />
              <Text style={{ marginLeft: 8, color: defaultStyles.colorPalette.red1, fontSize: 12 }}>{feedPost.pubDate? feedPost.pubDate : 'Publish Date'}</Text>
            </View>

            {/* POST VIEWS */}
            <View style={{ 
              flexDirection: 'row', alignItems: 'center', 
              borderRadius: 25, padding: 9.8,
              backgroundColor: defaultStyles.colorPalette.pink1 
            }}>
              <Icon 
                icon="eye" 
                width={20}
                height={16}
                color={defaultStyles.colorPalette.red1}  
                propStyle={{ 
//                marginHorizontal: defaultStyles.screenPadding.paddingHorizontal, marginVertical:defaultStyles.screenPadding.paddingHorizontal, 
//                alignItems: 'center',
//                marginLeft: defaultStyles.screenPadding.paddingHorizontal
                }}
              />
              <Text style={{ marginHorizontal: 4, color: defaultStyles.colorPalette.red1, fontSize: 12 }}>{feedPost.views? feedPost.views : 'Views'}</Text>
            </View>

          </View>

          {/* DIVIDER */}
          <View style={{ backgroundColor: defaultStyles.colorPalette.red2, height: 1.4, borderRadius: 50, marginBottom: defaultStyles.screenPadding.paddingHorizontal }} />
          
          {/* SOURCE */}
          <View style={{ 
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            marginBottom: defaultStyles.screenPadding.paddingHorizontal * 2,
          }}>
            <NewsSource newsSource={feedPost.newsSource} />
 
            <View style={{
              flexDirection: 'row', alignItems: 'center',
            }}>
              <Icon 
                icon="bookmark1"
                width={18} 
                height={18}
                color={defaultStyles.colorPalette.red1} 
                propStyle={{ 
                  marginRight: 12,
  //                borderWidth: 1, borderColor: defaultStyles.colorPalette.red1, 
  //                borderColor: '#FFF', 
                }}
              />
              <Icon 
                icon="link-external2"
                width={22} 
                height={22}
                color={defaultStyles.colorPalette.red1} 
                propStyle={{ 
  //                borderWidth: 1, borderColor: defaultStyles.colorPalette.red1, 
  //                borderColor: '#FFF', 
                }}
                onPress={() => openURL(feedPost.link)}
              />
            </View>

          </View>
{/*   */}


          {/* TITLE */}
          <Text style={{ 
            fontSize: 20, fontWeight: 'bold', lineHeight: 32, letterSpacing: 1, color: '#000', 
//            paddingHorizontal: 3, 
            marginBottom: 16,
          }}>
            {feedPost.title}
          </Text>

          {/* DESCRIPTION */}
          { ['</p>', '</div>', '</a>', '</li>'].some(tag => feedPost.description && feedPost.description.includes(tag)) 
            ? <RenderHtml 
                contentWidth={"100%"} 
                source={{ html: `<span>`+feedPost.description+'</span>' }}
                tagsStyles={tagsStyles} 
              />
            : <Text style={{ 
                fontSize: 11, lineHeight: 20,
              }}>
                {feedPost.description}
              </Text>
          }

          {/* FULL ARTICLE */}
          <Pressable style={{ alignSelf: 'center', marginTop: 44, paddingVertical: 7, paddingHorizontal: 26,
            backgroundColor: defaultStyles.colorPalette.red1, borderRadius: 25 }} 
            onPress={() => openURL(feedPost.link)}
          >
            <Text style={{fontSize: 10, color: '#FFF', letterSpacing: 1, lineHeight: 14 }}>Continue reading..</Text>
          </Pressable>

        </View>
      </ScrollView>

    </Animated.View>
  );

});

export default PostModal;
