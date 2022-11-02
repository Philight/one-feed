import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, 
  FlatList, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import EmptyView from '../components/EmptyView.js';
import ChannelTopics from '../components/ChannelTopics.js';

import DataContext from '../contexts/DataContext.js';
import { getStorageData, setStorageData } from '../data/asyncStorage.js';
import defaultStyles from '../styles/defaultStyles.js';

import AntDesign from 'react-native-vector-icons/AntDesign';


/*
const getStorageData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;

  } catch(e) {
    // error reading value
  }
}

const setStorageData = async (key, object) => {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonValue);

  } catch (e) {
    // saving error
  }
}
*/


const TopicsChannels = (props) => {
	const { activeCategory, propStyle } = props;

	const contextData = useContext(DataContext);
//	const SUBCATEGORIES = contextData.SUBCATEGORIES;
  const CATEGORIES = contextData.CATEGORIES;
	const NEWS_SOURCES = contextData.NEWS_SOURCES;
  const DEVICE_ID = contextData.userInfo.DEVICE_ID;
  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;

  const [isEmpty, setEmpty] = useState(true);


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

  useEffect(() => {
    if (Object.keys(USER_NEWS_SOURCES).length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [USER_NEWS_SOURCES])

{/*
  const NewsChannel = ({ item, index }) => (
    <View style={[{ border: '1px solid red' , marginTop: 8} ]}>
      <View style={[
        { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }
      ]}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>{NEWS_SOURCES[item].name}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', flexBasis: '25%', justifyContent: 'space-between' }}>
          <Pressable style={{ backgroundColor: 'red', borderRadius: 25, paddingHorizontal: 8, paddingVertical: 4}}
            onPress={toggleTopics}
          >
            <Text style={{ color: '#FFF',  fontSize: 8, letterSpacing: 1 }}>TOPICS</Text>
          </Pressable>

          <AntDesign name="minuscircle" color={'#AD0000'} size={18} style={{ }}
            onPress={() => removeChannel(item)}
          />
        </View>
      </View>

      <ChannelTopics propStyle={{   }} newsSource={item} />
    </View>
  );
*/}

  const NewsChannel2 = (props) => {
    const { newsSource } = props;

    const [topicsShown, setTopicsShown] = useState(false);

    const toggleTopics = () => {
console.log('### TopicsChannels.toggleTopics newsSource: '+newsSource);
      setTopicsShown(prevState => !prevState);
    }

    return (
      <View style={[{ border: '1px solid red' , marginTop: 8, overflow: 'hidden' }]}>
        <View style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 2, backgroundColor: '#FFF'
          }
        ]}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>{NEWS_SOURCES[newsSource].name}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', flexBasis: '25%', justifyContent: 'space-between' }}>
            <Pressable style={{ backgroundColor: 'red', borderRadius: 25, paddingHorizontal: 8, paddingVertical: 4}}
              onPress={toggleTopics}
            >
              <Text style={{ color: '#FFF',  fontSize: 8, letterSpacing: 1 }}>TOPICS</Text>
            </Pressable>

            <AntDesign name="minuscircle" color={'#AD0000'} size={18} style={{ }}
              onPress={() => removeChannel(newsSource)}
            />
          </View>
        </View>
{/*
        <ChannelTopics 
          propStyle={[]} 
          newsSource={newsSource}

          isCollapsed={topicsShown}
          setView={setTopicsShown}
        />
*/}
      </View>
    )
  };

  const ChannelsContainer = (props) => {

    return (
      <SafeAreaView style={{ flex: 1 }}>
{/*
        <FlatList
          data={Object.keys(USER_NEWS_SOURCES)}
          renderItem={NewsChannel}
          keyExtractor={item => item.id}
        />
*/}
      { Object.keys(USER_NEWS_SOURCES).map((newsSource, index) => {
        return <NewsChannel2 newsSource={newsSource} />
      }) }

      </SafeAreaView>
    )
  }

	return (
		<View style={[{ flex: 1 }]}>
      { isEmpty 
        ? <EmptyView /> 
        : <ChannelsContainer />
      }
      
      <Text>{DEVICE_ID}:{isEmpty?'empty':'notempty'}</Text>
    </View>
	);
}

export default TopicsChannels;