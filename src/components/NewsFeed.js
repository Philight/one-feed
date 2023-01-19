import { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { ActivityIndicator, Animated, TouchableWithoutFeedback, 
	Pressable, SafeAreaView, View, FlatList, Text, StyleSheet, ImageBackground, Linking  } from 'react-native';

import RenderHtml from 'react-native-render-html';

import axios from 'axios';

import DataContext from '../contexts/DataContext.js';

import NewsSource from '../components/NewsSource.js';
import Icon from '../components/Icon.js';
import CategoryLabel from '../components/CategoryLabel.js';

import { openURL } from '../util/utilMethods.js';
import { formatDescription, formatPubDate } from '../util/parsingMethods.js';
import Loader from '../util/Loader.js';

import { VARIABLES } from '../data/ENV.js';
import defaultStyles from '../styles/defaultStyles.js';

//import MENU_LEFT_LINED from "../../assets/icon/menu-left-lined.svg";

const API_FETCH_NEWS_URL = `${VARIABLES.API_HOST+':'+VARIABLES.API_PORT}/one-feed/fetch-news`;

const styles = StyleSheet.create({
	CONSTANTS: {
		feedItem: {
			backgroundImageHeight: 180,
			titleHeight: 74,
			descriptionHeight: 58,
			descriptionFontSize: 12,
			descriptionColor: '#a0a0a0',
//			containerHeight: 500,
		}
	},
	HTML: {
		p: 'margin-top: 0px; margin-bottom: 8px;',
//		divContainer: 'height: 200px; ',
	},
	categoryLabel: { 
		fontSize: 11, lineHeight: 13,
		paddingHorizontal: 8, paddingVertical: 2, 
		marginRight: 4,
	}
});

const tagsStyles = {
  body: {
  	maxHeight: styles.CONSTANTS.feedItem.descriptionHeight+'px',
  	overflow: 'hidden',
  },
  span: {
    color: styles.CONSTANTS.feedItem.descriptionColor,
    fontSize: styles.CONSTANTS.feedItem.descriptionFontSize,
    lineHeight: 18,
  }, 
  ol: {
  	marginTop: 0,
  	marginBottom: 8,
  	marginLeft: 4,
  	padding: 0,
  	paddingLeft: 8,
  },
  ul: {
  	marginTop: 0,
  	marginBottom: 8,
  	marginLeft: 4,
  	padding: 0,
  	paddingLeft: 8
  },
  li: {
  	paddingLeft: 6,
  },
  a: {
  	color: defaultStyles.colorPalette.red1,
  	textDecorationColor: defaultStyles.colorPalette.red1,
  }

};

const NewsFeed = (props) => {
	const { propStyle, activeTopic, openModal } = props;

	const contextData = useContext(DataContext);
	const SUBCATEGORIES = contextData.SUBCATEGORIES;
	const CATEGORIES = contextData.CATEGORIES;
	const NEWS_SOURCES = contextData.NEWS_SOURCES;

	const ISGUESTUSER = contextData.guestUser;
	const USER_SETTINGS = contextData.userInfo.SETTINGS;
  const USER_NEWS_SOURCES = contextData.userInfo.NEWS_SOURCES;

	const COUNT_PER_TOPIC = 15;

	const [isLoading, setLoading] = useState(true);
	const [feedPosts, setFeedPosts] = useState(null);


	const sortPosts = (feedData) => {
//		const newsSources = Object.keys(feedData); // [newsSource, newsSource]

		let sortedPosts = [];

		for (let i=0; i < COUNT_PER_TOPIC; i++) {

			for (let newsSource in feedData) {

				if (Object.keys(feedData[newsSource]['category']).length > 0) {
					const catKey = Object.keys(feedData[newsSource]['category'])[0];
					const postsArr = feedData[newsSource]['category'][catKey];
/*					
console.log(`### sortPosts | postsArr`);
console.log(postsArr[i]);
*/
					if (postsArr[i] == 'undefined') continue;
					// add Custom Props
					postsArr[i]['newsSource'] = newsSource;
					postsArr[i]['category'] = catKey;

					sortedPosts.push(postsArr[i]);

				} else if (Object.keys(feedData[newsSource]['subcategories']).length > 0) {
					for (let subcatKey in feedData[newsSource]['subcategories']) {
						const postsArr = feedData[newsSource]['subcategories'][subcatKey];

					
console.log(`### sortPosts | postsArr`);
console.log(postsArr[i]);
					if (postsArr[i] == 'undefined') continue;
						// add Custom Props
						postsArr[i]['newsSource'] = newsSource;
						postsArr[i]['subcategory'] = subcatKey;

						sortedPosts.push(postsArr[i]);
					}
				}
			}

		}
console.log(`+++ NewsFeed.sortPosts`);
console.log(sortedPosts);
		setFeedPosts(sortedPosts);
	}

  const getNews = async () => {
   	try {

			/*
	      newsSources: {
	        'nyt': {
	          activeCategory: 'catKey',
	          activeSubcategory: 'subcatKey',
	          activeSubcategories: ['subcatKey', 'subcatKey', 'subcatKey'],
	        },
	        'guardian': {
	          activeCategory: 'catKey',
	          activeSubcategory: 'subcatKey',
	          activeSubcategories: ['subcatKey', 'subcatKey', 'subcatKey'],
	        },
	      }
			*/
			let newsSources = { }; 
			
			// SAVED USER
			if (!ISGUESTUSER) {
console.log('### NewsFeed.getNews | SAVED USER');			

				// CATEGORY
				if (activeTopic.category) {

//					if (USER_SETTINGS.MERGE_CATEGORIES == true) {

						for (let newsSource in USER_NEWS_SOURCES) {
								
							if ( USER_NEWS_SOURCES[newsSource]['categories'].hasOwnProperty(activeTopic.category) ) {

								// culture: ['art', 'dance']
								if (USER_NEWS_SOURCES[newsSource]['categories'][activeTopic.category].length > 0) {
									newsSources[newsSource] = {
										activeSubcategories: USER_NEWS_SOURCES[newsSource]['categories'][activeTopic.category],
									}

								// culture: []
								} else {
									newsSources[newsSource] = {
										activeCategory: activeTopic.category,
									}
								}

							}

						}

					// USER_SETTINGS.MERGE_CATEGORIES == false
/*
					} else {

						for (let newsSource in USER_NEWS_SOURCES) {

							if ( USER_NEWS_SOURCES[newsSource]['categories'].hasOwnProperty(activeTopic.category) ) {

								// culture: []
								newsSources[newsSource] = {
									activeCategory: activeTopic.category,
								}

							}
						}

					}
*/
				// SUBCATEGORY
				} else if (activeTopic.subcategory) { // USER_SETTINGS.MERGE_CATEGORIES == false

					for (let newsSource in USER_NEWS_SOURCES) {

						for (let catKey in USER_NEWS_SOURCES[newsSource]['categories']) {

							if (USER_NEWS_SOURCES[newsSource]['categories'][catKey].includes(activeTopic.subcategory)) {
								newsSources[newsSource] = {
//									activeSubcategory: activeTopic.subcategory,
									activeSubcategories: [activeTopic.subcategory],
								}				
							}

						}
					}

				}
				
			// GUEST USER
			} else {
console.log('### NewsFeed.getNews | GUEST');			

				// CATEGORY
				if (activeTopic.category) {
					newsSources['nyt'] = {
						activeCategory: activeTopic.category,
//						activeCategory: 'culture',
					}
					newsSources['guardian'] = {
						activeCategory: activeTopic.category,
//						activeSubcategories: ['art', 'film'],
					}
				}

			}

console.log('### NewsFeed.getNews | sending JSON newsSources:');			
console.log(newsSources);			
			
			
			// CALL API

			const reqBody = { 
				newsSources: newsSources,
				COUNT_PER_TOPIC: COUNT_PER_TOPIC,
			};

      const response = await axios.post(API_FETCH_NEWS_URL, reqBody);
console.log('### NewsFeed /one-feed/fetch-news response');
console.log(response);
console.log(response.data);

			await sortPosts(response.data);

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

  useEffect( () => {
console.log('### NewsFeed changed Topic');
    setLoading(true);

    const returnedData = getNews();
console.log('+++ NewsFeed returnedData');
console.log(returnedData);

  }, [activeTopic]);

  const FeedPost = (props) => {
  	const { post } = props;

  	return (
	    <Pressable style={[{ 
//	    	borderWidth: 1, borderColor: 'blue',
		    	backgroundColor: '#FFF',
		    	paddingVertical: 14, 
		    	paddingHorizontal: 10, 
		    	marginBottom: defaultStyles.screenPadding.paddingHorizontal / 3 * 2,
		    	borderRadius: 20,
	    	},
	    	defaultStyles.shadowProps,
	    ]}
	    	onPress={() => USER_SETTINGS['FEED_PREVIEW'] == true ? openModal(post) : ''} 
	    > 
	    	<View style={{ flexDirection: 'row', alignItems: 'center' }}>
	    		<CategoryLabel propStyle={[ styles.categoryLabel ]} catKey={post.category ? post.category :''} subcatKey={post.subcategory ? post.subcategory :''} />
	    		{ post.subcategory ? <CategoryLabel propStyle={[ styles.categoryLabel ]} catKey={SUBCATEGORIES[post.subcategory]['name']} /> :'' }
	    	</View>
	    	<ImageBackground 
	    		style={{ width: '100%', height: styles.CONSTANTS.feedItem.backgroundImageHeight, marginTop: 8,}}
	    		source={{ uri: post['media']!="" ? post['media']['url'] : NEWS_SOURCES[post['newsSource']]['backgroundImage'] }} 
	    		resizeMode="cover" 
	    	/>

	    	{/*	TITLE */}
	    	<Text style={{ 
	    		marginTop: 8, marginBottom: 6,
	    		fontSize: 18, fontWeight: 'bold', lineHeight: 24, color: '#000', 
	    		maxHeight: styles.CONSTANTS.feedItem.titleHeight, overflow: 'hidden'
	    	}}>
	    		{post.title}
	    	</Text>

	    	{/*	DESCRIPTION */}
	    	{ ['</p>', '</div>', '</a>'].some(tag => post.description && post.description.includes(tag)) 
	    		?	 <RenderHtml 
		    			contentWidth={"100%"} 
		    			source={{ html: `<span>`+formatDescription(post.newsSource, post.description)+'</span>' }}
		    			tagsStyles={tagsStyles} 
		    		/>
		    	: <Text style={{ 
			    		marginTop: 8,
			    		fontSize: styles.CONSTANTS.feedItem.descriptionFontSize, lineHeight: 18,
			    		color: styles.CONSTANTS.feedItem.descriptionColor, 
			    		maxHeight: styles.CONSTANTS.feedItem.descriptionHeight,
			    		overflow: 'hidden',
	    			}}>
	    				{post.description}
	    			</Text>
	    	}

	    	{/*	BOTTOM DETAILS */}
	    	<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
	    		marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderColor: '#e9e9e9' }}>
	    		
	    		<View style={{ flexDirection: 'row', alignItems: 'center'}}>

            <NewsSource newsSource={post.newsSource} />	    		
		    		<View style={{ backgroundColor: '#c9c9c9', width: 2.5, height: 2.5, marginHorizontal: 5, marginTop: 2, borderRadius: 50 }} />
		    		{/*
		    		<Text style={{ fontSize: 8, marginTop: 1.6, color: '#5d5d5d' }}>{formatPubDate(post['newsSource'], post['pubDate'], false)}</Text>  
		    		*/}
		    		<Text style={{ fontSize: 8, marginTop: 1.6, color: '#5d5d5d' }}>{post['pubDate']}</Text>  
	    		
	    		</View>

	    		<Pressable
	    			onPress={() => openURL(post.link)}
	    			style={{ flexDirection: 'row', alignItems: 'center', 
	    			borderRadius: 25, backgroundColor: defaultStyles.colorPalette.red1,
	    			paddingHorizontal: 6, paddingVertical: 4 }}
	    		>
		    		<Text style={{ fontSize: 11, lineHeight: 13, letterSpacing: 2, 
//		    			color: defaultStyles.colorPalette.red1, 
		    			color: '#FFF', 
		    			marginRight: 4 }}>OPEN</Text>
			    	<Icon 
			    		icon="link-external4"
			    		width={14} 
			    		height={14}
			    		color={"#FFF"/*defaultStyles.colorPalette.red1*/} 
			    		propStyle={{ borderWidth: 1, 
//			    			borderColor: defaultStyles.colorPalette.red1, 
		    				borderColor: '#FFF', 
			    		}}
		    		/>
	    		</Pressable>
	    	</View>

	    </Pressable> 
  	)
  }

	return (
    <View 
    	nativeID="news-feed"
    	style={[
    		{ 
//    			borderWidth: 1, borderColor: 'green', 
					marginVertical: 1,
					marginHorizontal: 3,
    		},
    		propStyle,
    	]}
    >
    	{ isLoading 
    		? <Loader propStyle={{marginTop: defaultStyles.screenDimensions.height/2 - 200}}/> 
    		: (
  			feedPosts.map((post)=> <FeedPost post={post} />)	
      )}
    </View>
	);
}

export default NewsFeed;