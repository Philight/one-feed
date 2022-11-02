export const SUBCATEGORIES = {
	'art': { 
		subcategory: 'Art', category: 'culture', color: '', 
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400', 
	},
	'film': { 
		subcategory: 'Film', category: 'culture', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'music': { 
		subcategory: 'Music', category: 'culture', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'dance': { 
		subcategory: 'Dance', category: 'culture', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'theatre': { 
		subcategory: 'Theatre', category: 'culture', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'tvandradio': { 
		subcategory: 'TV & Radio', category: 'culture', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },

	'business': { 
		subcategory: 'Business', category: 'eco', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'stockmarket': { 
		subcategory: 'Stock Market', category: 'eco', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },

	'webdesign': { 
		subcategory: 'Web Design', category: 'dsgn', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },

	'recruiting': { 
		subcategory: 'Recruiting', category: 'hr', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },
	'sourcing': { 
		subcategory: 'Sourcing', category: 'hr', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	 },

	'brainscience': { 
		subcategory: 'Brain Science', category: 'neuro', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},
	'neurology': { 
		subcategory: 'Neurology', category: 'neuro', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},

	'fashion': { 
		subcategory: 'Fashion', category: 'style', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},
	'health': { 
		subcategory: 'Health', category: 'style', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},

	'biology': { 
		subcategory: 'Biology', category: 'science', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},
	'medicine': { 
		subcategory: 'Medicine', category: 'science', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},

	'robotics': { 
		subcategory: 'Robotics', category: 'ai', color: '',
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},
};

export const CATEGORIES = {
	'ai': { 
		category: 'Artificial Intelligence', 
		subcategories: ['robotics'], 
		color: '', 
		imageSource: 'https://imageio.forbes.com/specials-images/imageserve/600b279b38fb40a4043817d3/0x0.jpg?format=jpg&width=400',
	},
	'corona': { 
		category: 'Coronavirus', color: '',  
		subcategories: [], 
		imageSource: 'https://en.powys.gov.uk/image/10418/Coronavirus-molecule/imageBannerBackgroundUncropped.jpg?m=1584961342093',
	},	
	'culture': { 
		category: 'Culture', color: '', 
		subcategories: ['film', 'music', 'art', 'tvandradio'], 
		imageSource: 'https://farm4.static.flickr.com/3066/2986140749_e4c896239b.jpg',
	},
	'dsgn': { 
		category: 'Design', color: '', 
		subcategories: ['webdesign'], imageSource: '',
	},
	'eco': {
		category: 'Economics', color: '', 
		subcategories: ['business', 'stockmarket'], 
		imageSource: 'https://blogsmedia.lse.ac.uk/blogs.dir/99/files/2020/05/digital-currency.jpg',
	},
	'env': { 
		category: 'Environment', color: '',  
		subcategories: [], imageSource: '',
	},
	'rights': { 
		category: 'Human Rights', color: '',  
		subcategories: [], imageSource: '',
	},
	'hr': { 
		category: 'Human Resources', color: '', 
		subcategories: ['recruiting', 'sourcing'], imageSource: '',
	},
	'insp': { 
		category: 'Inspiration', color: '',  
		subcategories: [], imageSource: '',
	},
	'polit': { 
		category: 'Politics', color: '',  
		subcategories: [], imageSource: '',
	},
	'psy': { 
		category: 'Psychology', color: '', 
		subcategories: [], imageSource: '',
	},
	'neuro': { 
		category: 'Neuroscience', color: '', 
		subcategories: ['brainscience', 'neurology'], imageSource: '',
	},
	'style': { 
		category: 'Life&Style', color: '', 
		subcategories: ['fashion', 'health'],  imageSource: '',
	},
	'local': { 
		category: 'Local News', color: '',  
		subcategories: [], imageSource: '',
	},
	'science': { 
		category: 'Science', color: '', 
		subcategories: ['biology', 'medicine'], imageSource: '',
	},
	'sport': { 
		category: 'Sports', color: '',  
		subcategories: [], imageSource: 'https://imageio.forbes.com/specials-images/imageserve/6016f605dc2db28f499c86ad/0x0.jpg?format=jpg&width=600',
	},
	'socio': { 
		category: 'Sociology', color: '',  
		subcategories: [], 
		imageSource: '',
	},
	'spirit': { 
		category: 'Spirituality', color: '',  
		subcategories: [], 
		imageSource: '',
	},
	'tabloid': { 
		category: 'Tabloid', color: '', 
		subcategories: [], 
		imageSource: '',
	},		
	'tech': { 
		category: 'Technology', color: '', 
		subcategories: [], 
		imageSource: 'https://www.macquarie.com/au/en/perspectives/technology/_jcr_content/root/general_hero_copy/mobile-image.coreimg.jpeg/1660197980541/hero-technology-hub.jpeg',
	},
	'top': { 
		category: 'Top News', color: '', 
		subcategories: [], 
		imageSource: '',
	},
	'travel': { 
		category: 'Travel', color: '',  
		subcategories: [], 
		imageSource: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/09/4e/cf/c8.jpg',
	},
	'world': { 
		category: 'World News', color: '',  
		subcategories: [], 
		imageSource: 'https://media.wired.com/photos/627af9c9b6048c47d506c6be/master/pass/How-to-Protest-Safely-Update-GettyImages-1395281862.jpg',
	}, //Global Issues
};

//export default CATEGORIES;

