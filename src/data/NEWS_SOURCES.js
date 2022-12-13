/**
 * https://docs.rsshub.app/ena
 * Guardian api key: d29987d3-6525-4f8d-b245-225fa76181f9
 * NEWS_SOURCES - all news data
 * 
 * If only subcategory selected, dont include category
*/



export const LINK_SOURCES = {
	'nyt': {
	// API RSS Feed https://api.nytimes.com/services/xml/rss/nyt/{topic}.xml
		categories: {
			'world': 'World',
			'polit': 'Politics',
			'local': 'NYRegion',
			'eco': 'Economy',
			'tech': 'Technology',
			'science': 'Science',
			'sport': 'Sports',
			'culture': 'Arts',
			'travel': 'Travel',
			'tabloid': 'TMagazine',
			'top': 'HomePage'
		},
		subcategories: {
			'business': 'Business',
			'health': 'Health',
			'art': 'ArtandDesign',
			'film': 'Health',
			'dance': 'Dance',
			'theatre': 'Theater',
			'tvandradio': 'Television',
			'fashion': 'FashionandStyle',
		}
	},
	'guardian': {
	// RSS Feed: https://www.theguardian.com/{$topic}/rss
		categories: {
			'top': 'uk',
			'world': 'world',
			'local': 'politics',
			'corona': 'world/coronavirus-outbreak',
			'env': 'uk/environment',
			'polit': 'politics',
			'tech': 'uk/technology',
			'sport': 'uk/sport',
			'culture': 'uk/culture',
			'style': 'uk/lifeandstyle',
			'travel': 'uk/travel',
		},
		subcategories: {
			'globaldevelopment': 'global-development',
			'business': 'uk/business',
			'football': 'football',
			'film': 'uk/film',
			'music': 'music',
			'tvandradio': 'uk/tv-and-radio',
			'art': 'artanddesign',
			'theatre': 'stage',
			'fashion': 'fashion',
			'beauty': 'fashion/beauty',
			'women': 'lifeandstyle/women',
			'men': 'lifeandstyle/men',
			'loveandsex': 'lifeandstyle/love-and-sex',
		}
	}
};




export const NEWS_SOURCES = {
	'nyt': { // https://developer.nytimes.com/ // need extract article
		name: 'New York Times',
		topics: ['world', 'us', 'politics', 'ny', 'business', /*'opinion',*/ 'tech', 'science', 'health', 'sports', 'arts', /*'books',*/ 'style', 'travel', 'magazine'],

		categories: ['top', 'world', 'polit', 'local', 'eco', 'tech', 'science', 'style', 'sport', 'culture', 'travel', 'tabloid'],
		'top-categories': ['world', 'local', 'polit'],
		subcategories: ['business', 'health', 'art', 'film', 'music', 'dance', 'theatre', 'tvandradio', 'fashion'],
	}, 
	'guardian': { // https://open-platform.theguardian.com/ // need extract article
		name: 'The Guardian',
		topics: ['world', 'uk-news', 'coronavirus-outbreak', 'business', 'environment', 'politics', 'technology', 'global-development', 'football', 'culture', 'film', 'music', 'tv-and-radio', 'artanddesign', 'stage', 'lifeandstyle', 'fashion', 'fashion/beauty', 'travel', 'lifeandstyle/women', 'lifeandstyle/men', 'lifeandstyle/love-and-sex', 'money' ],

		categories: ['top', 'world', 'local'],
		'top-categories': ['world', 'local', 'culture'],
		subcategories: [],
	}, 
	'jazeera': { // no API
		name: 'Al Jazeera', 
		topics: ['world', 'uk-news', 'coronavirus-outbreak', 'business', 'environment', 'politics', 'technology', 'global-development', 'football', 'culture', 'film', 'music', 'tv-and-radio', 'artanddesign', 'stage', 'lifeandstyle', 'fashion', 'fashion/beauty', 'travel', 'lifeandstyle/women', 'lifeandstyle/men', 'lifeandstyle/love-and-sex', 'money' ],
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, 
	'bbc': { // no API
		name: 'BBC News', 
//		topics: ['world', 'uk-news', 'coronavirus-outbreak', 'business', 'environment', 'politics', 'technology', 'global-development', 'football', 'culture', 'film', 'music', 'tv-and-radio', 'artanddesign', 'stage', 'lifeandstyle', 'fashion', 'fashion/beauty', 'travel', 'lifeandstyle/women', 'lifeandstyle/men', 'lifeandstyle/love-and-sex', 'money' ],
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},	
	'dailymail': { 
		name: 'Daily Mail', 
//		topics: ['world', 'uk-news', 'coronavirus-outbreak', 'business', 'environment', 'politics', 'technology', 'global-development', 'football', 'culture', 'film', 'music', 'tv-and-radio', 'artanddesign', 'stage', 'lifeandstyle', 'fashion', 'fashion/beauty', 'travel', 'lifeandstyle/women', 'lifeandstyle/men', 'lifeandstyle/love-and-sex', 'money' ],
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'ft': { 
		name: 'Financial Times', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API, 
	'google': { 
		name: 'Google News', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, //no API
	'atlantic': { 
		name: 'The Atlantic', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API

	'amnesty': { 
		name: 'Amnesty International' ,
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://www.amnesty.org.uk/press-releases/feed
	'apnews': { 
		name: 'Associated Press News', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://docs.rsshub.app/ena
	'hrw': { 
		name: 'Human Rights Watch', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS - shitrload / https://www.hrw.org/legacy/rsslist/
	'un': { 
		name: 'United Nations', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API

	'apa': { 
		name: 'APA',
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS - shitload of RSS categories / https://www.apa.org/rss
	'neuronews': { 
		name: 'Neuroscience News', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://neurosciencenews.com/feed/
	'sciencedaily': { 
		name: 'Science Daily', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS - shitload of RSS categories / https://www.sciencedaily.com/newsfeeds.htm

	'ere': { 
		name: 'ERE', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'hunted': { 
		name: 'Hunted', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'tlnt': { 
		name: 'TLNT', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},  // no API

	'dennikn': { 
		name: 'Dennik N', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS Feed / https://dennikn.sk/api/sitemap/news
	'e15': { 
		name: 'E15.cz', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://www.e15.cz/rss
	'eurocz': { 
		name: 'euro.cz', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://www.euro.cz/rss/seznam-cz/

	'artdaily': {  
		name: 'Art Daily', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS Feed  / https://artdaily.com/rss.asp
	'alistapart': {  
		name: 'A List Apart', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / full content / https://alistapart.com/main/feed/
	'creativebloq': {  
		name: 'Creative Bloq', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS Feed GENERATOR - for Topics as well / https://rss.app/rss-feed/creative-bloq-rss-feed
	'dailyartmagazine': {  
		name: 'Daily Art Magazine', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'designyoutrust': {  
		name: 'Design You Trust', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'designspiration': {  
		name: 'Designspiration', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'inspirationgrid': {  
		name: 'Inspiration Grid', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // no API
	'marginalian': {  
		name: 'The Marginalian', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	}, // RSS / https://feedproxy.google.com/brainpickings/rss

	'admiretheweb': {  
		name: 'Admire the Web', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'awwwards': {  
		name: 'Awwwards', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'brutalist': {  
		name: 'Brutalist Websites', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'calltoidea': {  
		name: 'Call To Idea', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'commercecream': {  
		name: 'Commerce Cream', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'landbook': {  
		name: 'Land-book', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'saaspages': {  
		name: 'SaaS Pages', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'siteinspire': {  
		name: 'site inspire', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
	'webdesigninspiration': {  		
		name: 'Webdesign Inspiration', 
		categories: ['top'],
		'top-categories': [],
		subcategories: [],
	},
};


// Web design components/pages?
// TODO Behance

//export default NEWS_SOURCES;

