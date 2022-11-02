import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { TouchableOpacity,TouchableWithoutFeedback, Pressable, 
  SafeAreaView, View, FlatList, VirtualizedList, Text, StyleSheet, TextInput } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import DataContext from '../contexts/DataContext.js';
//import { SUBCATEGORIES, CATEGORIES } from '../data/CATEGORIES.js';
 


import { getStorageData, setStorageData, deleteStorageData, getAllStorageKeys } from '../data/asyncStorage.js';
import defaultStyles from '../styles/defaultStyles.js';

const styles = StyleSheet.create({

});




const ActionInput = (props) => {   
  const { setParentValue, value } = props;

  const updateInput = (input) => {
    setParentValue(input);
  }

  return (
    <TextInput 
      style={{backgroundColor: '#FFF', width: 100}} 
      value={value} onChangeText={updateInput} placeholder="key"
    />
  )
}

const StorageActions = () => {
  const contextData = useContext(DataContext);
  const CATEGORIES = contextData.CATEGORIES;
  const SUBCATEGORIES = contextData.SUBCATEGORIES;

  const [isVisible, setVisible] = useState(false);

  const [keyToGet, setKeyToGet] = useState("");
  const [keyToDelete, setKeyToDelete] = useState("");

  const actionGetContext = () => {
    console.log(contextData);
  }

  const actionGetKeys = () => {
    getAllStorageKeys().then((keys) => {
      console.log(keys);
    })
  }

  const actionGetData = () => {
    getStorageData(keyToGet).then((data) => {
      console.log(data);
    })
  }

  const actionDeleteKey = () => {
//    console.log(keyToDelete);
    deleteStorageData(keyToDelete);
  }


  const ActionButton = (props) => {   
    const { name, children, action } = props;

    return (
      <View style={{ backgroundColor: '#000', border: '2px solid #5732ff',
          paddingHorizontal: 6, paddingVertical: 2, marginVertical: 2}}
      >
        {children}
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: "center"
          }}
          onPress={action}
        >
          <Text style={{ color: '#FFF', fontSize: 12 }}>{name}</Text>
        </TouchableOpacity>
      </View>

    );
  }

  return (
    <View style={{ position: 'absolute', top: 100, right: isVisible ? 0 : -120, flexDirection: 'row' }}>
      <Pressable  style={{backgroundColor: '#000', position: 'absolute', left: -26, borderRadius: 25, padding: 3 }}
        onPress={() => setVisible(prevState => !prevState)}
      >
        <MaterialCommunityIcons name="database-sync-outline" color={'#FFF'} size={20} />
      </Pressable>
      <View>
        <ActionButton name={"GetContextData"} action={actionGetContext} />
        <ActionButton name={"StorageKeys"} action={actionGetKeys} />
        <ActionButton name={"GetData"} action={actionGetData} >
          <ActionInput value={keyToGet} setParentValue={setKeyToGet} />
        </ActionButton>
        <ActionButton name={"DeleteKey"} action={actionDeleteKey} >
          <ActionInput value={keyToDelete} setParentValue={setKeyToDelete} />
        </ActionButton>
      </View>

    </View>
  );
}

export default StorageActions;