import { useContext } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';

import Icon from '../components/Icon.js';

import defaultStyles from '../styles/defaultStyles.js';

import { openURL } from '../util/utilMethods.js';

const NewsSource = (props) => {
	const { newsSource, } = props;

	const contextData = useContext(DataContext);
	const NEWS_SOURCES = contextData.NEWS_SOURCES;

	return (
    <Pressable 
      onPress={() => openURL(newsSource? NEWS_SOURCES[newsSource]['website'] :'')}
      style={{
        flexDirection: 'row', alignItems: 'center',
      }}
    >
      <Icon 
        icon={newsSource? NEWS_SOURCES[newsSource]['iconName'] :''}
        width={20} 
        height={20}
        color={newsSource? NEWS_SOURCES[newsSource]['iconColor'] :''} 
        propStyle={[ ]}
      />
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 6, color: '#333333' }}>
        {newsSource? NEWS_SOURCES[newsSource]['name'] :''}
      </Text>
    </Pressable>
	);
}

export default NewsSource;