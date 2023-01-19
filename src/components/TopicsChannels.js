import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, ScrollView,
  FlatList, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import EmptyView from '../components/EmptyView.js';
import ChannelTopics from '../components/ChannelTopics.js';
import CategoryLabel from '../components/CategoryLabel.js';

import DataContext from '../contexts/DataContext.js';
import { getStorageData, setStorageData } from '../data/asyncStorage.js';
import defaultStyles from '../styles/defaultStyles.js';

import AntDesign from 'react-native-vector-icons/AntDesign';

const TopicsChannels = (props) => {
	const { activeCategory, propStyle } = props;

	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const CATEGORIES = contextData.CATEGORIES;
	const NEWS_SOURCES = contextData.NEWS_SOURCES;
  const DEVICE_ID = contextData.userInfo.DEVICE_ID;
  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;

  const TOPICS_COLUMNS = 3; // 1 TO DO

  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    if (Object.keys(USER_NEWS_SOURCES).length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [USER_NEWS_SOURCES])


  const removeChannel = (newsSourceKey) => {
console.log('### TopicsChannels.removeChannel');

    contextData.setContextData(prevData => {
      const updatedData = {...prevData.userInfo['NEWS_SOURCES']};
      delete updatedData[newsSourceKey];

      return ({
        ...prevData,
        userInfo: {
          ...prevData.userInfo,
          NEWS_SOURCES: {
            ...updatedData
          }
        }
      })
    })
  }


  const NewsChannel = (props) => {
    const { newsSource } = props;

    const [topicsShown, setTopicsShown] = useState(false);

    const toggleTopics = () => {
console.log('### TopicsChannels.toggleTopics newsSource: '+newsSource);
      setTopicsShown(prevState => !prevState);
    }

    const COLUMN_WIDTH = (100 / TOPICS_COLUMNS);

    useEffect(() => {
console.log('### TopicsChannels useEffect INITIAL setTopicsShown');
      setTopicsShown(false);
    }, [])



{/*
      <View style={[
//        defaultStyles.shadowProps,
        { 
//        borderColor: 'red', borderWidth: 1,
//        flexBasis: '100%', flexGrow: 1, 

          flexShrink: 1,
          marginTop: 8, 
          marginHorizontal: 2,
          paddingVertical: 8,
          paddingHorizontal: 16,
          paddingBottom: topicsShown ? 17 : 8, 
          borderBottomWidth: 1, borderBottomColor: '#dbdbdb',
          overflow: 'hidden',
          borderRadius: 25,
          
        }
      ]}>
*/}
    return (

    <View style={[
      defaultStyles.shadowProps,
      { 
//        borderColor: 'red', borderWidth: 1,
//        flexBasis: '100%', flexGrow: 1, 
        flexShrink: 1,
        marginTop: 8, 
        marginHorizontal: 2,
//        paddingVertical: 8,
//        paddingHorizontal: 16,
//        paddingBottom: topicsShown ? 17 : 8, 
        borderBottomWidth: 1, borderBottomColor: '#dbdbdb',
        overflow: 'hidden',
        borderRadius: 25,
        backgroundColor: '#FFF',
      }
    ]}>
      { topicsShown ?
        <ImageBackground 
          style={[
  //          defaultStyles.shadowProps,
            { 
  //            borderColor: 'red', borderWidth: 1,  
              width: '100%', height: '100%', 
              position: 'absolute', 
            }
          ]}
          source={{ uri: NEWS_SOURCES[newsSource]['backgroundImage']  }} 
          resizeMode="cover"  
        >
          <View style={{ 
//            borderColor: 'red', borderWidth: 1,  
            backgroundColor: '#000', opacity: 0.4, 
            width: '100%', height: '100%', 
          }} />
        </ImageBackground> : ''
      }


      <View style={[
        { 
          paddingVertical: 8,
          paddingHorizontal: defaultStyles.screenPadding.paddingHorizontal,
          paddingBottom: topicsShown ? 17 : 8, 
        }
      ]}>

        <View style={[
          { 
            flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 2, 
//            backgroundColor: '#FFF', 
          }
        ]}>
          <View style={{ 
//            borderWidth: 1,borderColor: 'blue',
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap',
            width: (100-COLUMN_WIDTH)+'%',}}>

            <Text style={{ color: topicsShown? '#FFF' : '#000', fontWeight: 'bold', fontSize: 14, flexShrink: 0,  }}>
              {NEWS_SOURCES[newsSource]['name']}
            </Text>

            { NEWS_SOURCES[newsSource]['topcategories'] 
              ? NEWS_SOURCES[newsSource]['topcategories'].map((catKey) => (
              <CategoryLabel label={CATEGORIES[catKey]['name']} backgroundColor={CATEGORIES[catKey]['color']} propStyle={{marginLeft: 4, marginTop: 2}} /> 
            )) :''}

          </View>


          <View style={{ 
            width: COLUMN_WIDTH+'%', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center', 
          }}>
            <Pressable style={[
                {  
                  position: 'absolute', zIndex: 1, 
                  backgroundColor: topicsShown ? '#be4242' : 'red', 
                  borderRadius: 25, 
                  paddingHorizontal: 8, paddingVertical: 4,
                  opacity: topicsShown ? 0.5 : 1,
                },
                TOPICS_COLUMNS>3 ? { left:0 } :'',
                defaultStyles.shadowProps,
              ]}
              onPress={toggleTopics}
            >
              <Text style={{ color: '#FFF',  fontSize: 7, letterSpacing: 1 }}>TOPICS</Text>
            </Pressable>

            <View style={[
              { 
//              borderWidth:1, borderColor: 'blue', 
                width: '100%', alignItems: 'center',  justifyContent: 'center',
              },
              defaultStyles.shadowProps,
            ]}> 
              <AntDesign name="minuscircle" color={'#AD0000'} size={18} style={[{alignSelf: 'flex-end'}, ]}
                onPress={() => removeChannel(newsSource)}
              />
            </View>

          </View>
        </View>


        <ChannelTopics 
          propStyle={[]} 
          newsSource={newsSource}
          columns={TOPICS_COLUMNS}

          isCollapsed={topicsShown}
          setView={setTopicsShown}
        />
      </View>

    </View>
    )
  };

  const ChannelsContainer = (props) => {

    return (
      <SafeAreaView style={{ flex: 1, borderRadius: 20 }}>
{/*
        <FlatList
          data={Object.keys(USER_NEWS_SOURCES)}
          renderItem={NewsChannel}
          keyExtractor={item => item.id}
        />
*/}
      <ScrollView nestedScrollEnabled={true} 
        contentContainerStyle={{ 
          height: 1800, 
//          borderColor: 'purple', borderWidth: 1,
          //flexDirection: 'row', flexWrap: 'wrap', 
          justifyContent: 'flex-start'  
        }}
      >
        { Object.keys(USER_NEWS_SOURCES).map((newsSource, index) => {
          return <NewsChannel newsSource={newsSource} />
        }) }
      </ScrollView> 

      </SafeAreaView>
    )
  }

	return (
		<View style={[{ flex: 1 }]}>
      { isEmpty 
        ? <EmptyView /> 
        : <ChannelsContainer />
      }
    </View>
	);
}

export default TopicsChannels;