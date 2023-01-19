
//import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  CONSTANTS: {
  },
  HTML: {
    p: 'margin-top: 0px; margin-bottom: 8px;',
//    divContainer: 'height: 200px; ',
  },

});

export const formatDescription = (newsSource, HTMLString) => {
//console.log('### NewsFeed.formatDescription');
//      let styledString = HTMLString.replaceAll('<p>',`<p style="${styles.HTML.p}">`);
//      let styledString = HTMLString.replaceAll('<p>','<p style="">');
  let styledString = HTMLString.split('<p>').join(`<p style="${styles.HTML.p}">`);
//console.log(styledString);

  switch(newsSource) {

    // The Guardian - remove 'Continue reading' link
    case 'guardian':
      let pos = styledString.lastIndexOf('<a href'); 
      let pos2 = styledString.lastIndexOf('</a>');
      let linkSubstring = styledString.substring(pos, pos2+('</a>'.length));
    //console.log(linkSubstring);
      styledString = styledString.replace(linkSubstring, '');
    break;

    default:
    break;

  }

  return styledString;
}

export const formatPubDate = ( newsSource, pubDate, shortenedFlag ) => {
//console.log('### NewsFeed.formatPubDate');
//console.log(pubDate);
  const shortened = shortenedFlag;
  let formattedDate = '';
  let pos = '';

  switch(newsSource) {
/*    
    case 'nyt':
      pos = pubDate.lastIndexOf(':'); 
      formattedDate = pubDate.replace(pubDate.substring(pos, pubDate.length), '');
      break;

    case 'guardian':
      pos = pubDate.lastIndexOf(':'); 
      formattedDate = pubDate.replace(pubDate.substring(pos, pubDate.length), '');
      break;
*/
    default:
      pos = pubDate.lastIndexOf(':'); 
      formattedDate = pubDate.replace(pubDate.substring(pos, pubDate.length), '');
      if (shortened) {
        // Remove Time
        pos = formattedDate.lastIndexOf(':'); 
        formattedDate = formattedDate.replace(formattedDate.substring(pos-3, formattedDate.length), '');
        // Remove WeekDay
        formattedDate = formattedDate.split(', ')[1];
      }
      break;
  }

  return formattedDate;
}