import { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { ActivityIndicator, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

import axios from 'axios';

import DataContext from '../contexts/DataContext.js';

//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
import defaultStyles from '../styles/defaultStyles.js';

const APIURL = 'https://localhost:3333';

const NewsFeed = (props) => {
	const { propStyle, activeCategory } = props;

	const [isLoading, setLoading] = useState(true);

	const contextData = useContext(DataContext);
	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;

  const getNews = async () => {
   	try {
/*
		  const configurationObject = {
		    method: 'get',
		    url: `${APIURL}`,
		  };
*/		
			const body = { 
				activeCategory: 'culture',
				activeSubCategories: ['art', 'dance'],
				sources: ['nyt'],
				countPerTopic: 15 
			};

			const body2 = { 
				activeCategory: 'culture',
				activeSubCategories: [],
				sources: ['guardian'],
				countPerTopic: 15 
			};

			const body3 = { 
				activeCategory: '',
				activeSubCategories: ['art'],
				sources: ['nyt'],
				countPerTopic: 15 
			};			
/*
      const response = await axios.post(`${APIURL}/onefeed/fetch-news`, body2);
console.log('### NewsFeed /onefeed/fetch-news response');
console.log(response);
console.log(response.data);
*/


//console.log(response.data['nyt']);
//console.log(response.data[0]);
//			return response;

/*
			const jsonRes = await JSON.parse(response.data);
console.log(jsonRes);
*/
/*
      const json = await response.json();
      setData(json.movies);
*/
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);

    getNews();
  }, []);


  useEffect( () => {
    setLoading(true);

    const returnedData = getNews();
console.log('### NewsFeed returnedData');
console.log(returnedData);

  }, [activeCategory]);


  useEffect( () => {
  	console.log('### NewsFeed - contextData');
  	console.log(contextData);
  	console.log('### NewsFeed - SUBCATEGORIES');
  	console.log(SUBCATEGORIES);
  }, [contextData]);


	return (
    <View 
    	nativeID="news-feed"
    	style={[propStyle,
    		{border: '1px solid green'}
    	]}
    >
      <Text>NEWSFEED: activeCategory</Text>
    	{isLoading ? <ActivityIndicator /> : (
    		<Text>DATA</Text>
      )}
    </View>
	);
}

export default NewsFeed;