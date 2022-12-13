import { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, SafeAreaView, View, FlatList, VirtualizedList, Text, StyleSheet } from 'react-native';

import DataContext from '../contexts/DataContext.js';
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
 
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({
  containerStyle: {
//    display: 'inline-flex',
    marginTop: 8,
    marginBottom: 8,
  },
  categoryStyle: {
    padding: 4,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: 20,
    fontSize: 12, lineHeight: 1,

    position: 'relative',
  },
  subcategoryContainer: {
    margin: 0, padding: 0,
    marginLeft: 28,
  },
  subcategoryStyle: {
    display: 'inline-flex',
    marginTop: 8,
    marginRight: 4,
  }
});

const CategoriesTree = () => {
  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;
  const SUBCATEGORIES = contextData.SUBCATEGORIES;

  const renderCategories = () => {
    let listItems = [];
    for (let cat of Object.values(CATEGORIES)) {

      let subcategories = [];

      let mainCat = (
        <summary style={{}}>
          <span style={{...styles.categoryStyle}}>{cat.category}</span>
        </summary>
      );

      if (cat['subcategories'].length > 0) {
        for (let subcat of cat['subcategories']) {
          subcategories.push(
            <li style={{...styles.categoryStyle, ...styles.subcategoryStyle}}>
              {SUBCATEGORIES[subcat]['subcategory']}
            </li>);
        }

        listItems.push(
          <div>
            <details style={{ ...styles.containerStyle, paddingLeft: 6 }}>
              {mainCat}
              <ul style={{padding: 0, margin: 0, marginLeft: 28}}>{subcategories}</ul>
            </details>
          </div>
        );

      } else {
        listItems.push(
          <div>
            <div style={{ ...styles.containerStyle, marginLeft: 22 }}>{mainCat}</div>
          </div>
        );
      }
    }
    return (
      listItems
    )
  }

  const listItem = ({ item, index }) => (
    <View
      nativeID="categories-item"
      style={[
      ]}
    >

    </View>
  );

  return (
    <div>
      {renderCategories()}
    </div>
/*
    <View> 
      <SafeAreaView style={{ maxWidth: '100vw', border: '1px solid blue' }}>
        <FlatList
          nativeID="categories-list"
          data={Object.values(CATEGORIES)}
          renderItem={listItem}
          keyExtractor={item => item.id}
          vertical
        />
      </SafeAreaView>
    </View>
*/
  );
}

export default CategoriesTree;