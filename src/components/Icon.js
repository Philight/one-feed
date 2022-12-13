
import { Image, Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, FlatList, Text, StyleSheet } from 'react-native';

/*
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
*/
import defaultStyles from '../styles/defaultStyles.js';

import BOOKMARK1 from "../../assets/icon/bookmark1.svg";
import BOOKMARK2 from "../../assets/icon/bookmark2.svg";
import BOOKMARK3 from "../../assets/icon/bookmark3.svg";
import BOOKMARK4 from "../../assets/icon/bookmark4.svg";
import BOOKMARK5 from "../../assets/icon/bookmark5.svg";
import BOOKMARK_SAVED from "../../assets/icon/bookmark-saved.svg";

import COGWHEEL from "../../assets/icon/cogwheel.svg";
import EYE from "../../assets/icon/eye.svg";
import CHEVRON_UP from "../../assets/icon/chevron-up.svg";
import CHEVRON_UP3 from "../../assets/icon/chevron-up3.svg";
import MENU_LEFT_LINED from "../../assets/icon/menu-left-lined.svg";
import NEWSPAPERS_RED from "../../assets/icon/newspapers-red.svg";
import NEWS_FEED from "../../assets/icon/news-feed.svg";
import NEW_YORK_TIMES from "../../assets/icon/new-york-times.svg";
import PUBLISH from "../../assets/icon/publish.svg";
import THE_GUARDIAN from "../../assets/icon/the-guardian.svg";

import LINK_EXTERNAL1 from "../../assets/icon/link-external1.svg";
import LINK_EXTERNAL2 from "../../assets/icon/link-external2.svg";
import LINK_EXTERNAL4 from "../../assets/icon/link-external4.svg";

//import OCTAGON_OUTLINE_FILL_1 from "../../assets/icon/octagon-outline-fill-1.svg";
import X_MARK from "../../assets/icon/x-mark.svg";

const Icon = (props) => {
  const { icon, propStyle, width, height, color, onPress } = props;

  const renderIcon = () => {
    switch(icon) {

      case 'bookmark1': return <BOOKMARK1 color={color ? color : '#000'} />
        break;
      case 'bookmark2': return <BOOKMARK2 color={color ? color : '#000'} />
        break;
      case 'bookmark3': return <BOOKMARK3 color={color ? color : '#000'} />
        break;
      case 'bookmark4': return <BOOKMARK4 color={color ? color : '#000'} />
        break;
      case 'bookmark5': return <BOOKMARK5 color={color ? color : '#000'} />
        break;
      case 'bookmark-saved': return <BOOKMARK_SAVED color={color ? color : '#000'} />
        break;

      case 'chevron-up': return <CHEVRON_UP color={color ? color : '#000'} />
        break;
      case 'chevron-up3': return <CHEVRON_UP3 color={color ? color : '#000'} />
        break;

      case 'cogwheel': return <COGWHEEL color={color ? color : '#000'} />
        break;
      case 'eye': return <EYE color={color ? color : '#000'} />
        break;
      case 'menu-left-lined': return <MENU_LEFT_LINED color={color ? color : '#000'} />
        break;
      case 'newspapers-red': return <NEWSPAPERS_RED color={color ? color : '#000'} />
        break;
      case 'news-feed': return <NEWS_FEED color={color ? color : '#000'} />
        break;
      case 'publish': return <PUBLISH color={color ? color : '#000'} />
        break;
      case 'x-mark': return <X_MARK color={color ? color : '#000'} />
        break;

      case 'new-york-times':return <NEW_YORK_TIMES color={color ? color : '#000'} />
        break;
      case 'the-guardian': return <THE_GUARDIAN color={color ? color : '#000'} />
        break;

      case 'link-external1': return <LINK_EXTERNAL1 color={color ? color : '#000'} />
        break;
      case 'link-external2': return <LINK_EXTERNAL2 color={color ? color : '#000'} />
        break;
      case 'link-external4': return <LINK_EXTERNAL4 color={color ? color : '#000'} />
        break;

    }
  }

  return (
    <Pressable 
      style={[
//        { borderColor: 'purple', borderWidth: 1, },
        { width: width? width : 20 },
//        height? {height: height} :'',
        { height: height? height : 20 },
//        defaultStyles.flexCenter, 
        propStyle,
      ]} 
      nativeID="#iconWrapper"
      onPress={onPress} 
    >
      { renderIcon() }
    </Pressable>
  )

}

export default Icon;
