import { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Pressable, SafeAreaView, View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';

import { Tab, TabView } from '@rneui/themed';

import DataContext from '../contexts/DataContext.js';
import defaultStyles from '../styles/defaultStyles.js';

import TopicsChannels from '../components/TopicsChannels.js';
import TopicsCategories from '../components/TopicsCategories.js';
import EmptyView from '../components/EmptyView.js';

function TabShadow(props) {
  const { heading } = props;
  return (
    <View style={[
      { 
        shadowColor: "#656565",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
      },
      { 
//        backgroundColor: '#000', 
//        height: 2, width: '100%', backgroundColor: '#FFF',
        borderBottomColor: '#FFF', borderBottomWidth: 2, marginTop: -2, zIndex: -10
      }]} 
    />
  );
}

const TopicsContent = (props) => {
	const { propStyle } = props;

  const [index, setIndex] = useState(0);

	return (
    <View
      style={[
        {...defaultStyles.shadowProps},
        {
//          flex: 1,
          height: 600,
          width: '100%',
          borderRadius: 20,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#FFF',
        }
      ]}
    >

      <View nativeID="#topics__inner-content" 
        style={{ overflow: 'hidden', flex: 1 }}
      >


        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
          flex: 1,
            backgroundColor: 'red',
            height: 2,
          }}
          variant="default"
  //        scrollable={true}
        >
          <Tab.Item
            title="YOUR CHANNELS"
            titleStyle={(active) => ({ 
              fontSize: 8, 
              color: active ? "red" :"#D3D3D3",
            })}
            icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
            variant="primary"
            dense={true}
            iconContainerStyle={{ display: 'none' }}

            buttonStyle={{}}
          >
          </Tab.Item>

          <Tab.Item
            title="CATEGORIES"
            titleStyle={(active) => ({ 
              fontSize: 8, 
              color: active ? "red" :"#D3D3D3",
            })}
            icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
            iconContainerStyle={{ display: 'none' }}
            dense={true}
          />
          <Tab.Item
            title="SUBCATEGORIES"
            titleStyle={(active) => ({ 
              fontSize: 8, 
              color: active ? "red" :"#D3D3D3",
            })}
            icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
            iconContainerStyle={{ display: 'none' }}
            dense={true}
          />
        </Tab>
        <TabShadow />

        <TabView value={index} 
          onChange={setIndex} 
          animationType="spring"
          containerStyle={{ 
            flex: 1,
          }}
          tabItemContainerStyle={{ flex: 1 }}
        >

          <TabView.Item style={{ backgroundColor: '#FFF', width: '100%'}}>

            <TopicsChannels />

          </TabView.Item>



          <TabView.Item style={{ backgroundColor: '#FFF', width: '100%' }}>

            <TopicsCategories />

          </TabView.Item>



          <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>

            <Text >Cart</Text>

          </TabView.Item>

        </TabView>




      </View>

    </View>
	);
}

export default TopicsContent;