import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageData = async (key) => {
  try {
console.log(`+++ AsyncStorage.getStorageData`);
console.log(`+++ AsyncStorage.getStorageData - key: ${key}`);
    const jsonValue = await AsyncStorage.getItem(String(key));
console.log(`+++ AsyncStorage.getStorageData - key: ${key}, data: `);
console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;

  } catch(e) {
    console.error('!!! AsyncStorage.getStorageData: '+e);
  }
}

export const setStorageData = async (key, object) => {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonValue);
console.log(`+++ AsyncStorage.setStorageData - key: ${key}, data: `);
console.log(jsonValue);

  } catch (e) {
    console.error('!!! AsyncStorage.setStorageData: '+e);
  }
}

export const updateStorageData = async (key, object) => {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.mergeItem(key, jsonValue);
console.log(`+++ AsyncStorage.updateStorageData - key: ${key}, data: `);
console.log(jsonValue);

  } catch (e) {
    console.error('!!! AsyncStorage.updateStorageData: '+e);
  }
}

export const deleteStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`+++ AsyncStorage.deleteStorageData - key: ${key} removed `);

  } catch (e) {
    console.error('!!! AsyncStorage.deleteStorageData: '+e);
  }
}

export const getAllStorageKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys(); 

  } catch (e) {
    console.error('!!! AsyncStorage.getAllStorageKeys: '+e);
  }

//console.log(`+++ AsyncStorage.getAllStorageKeys - keys`);
//console.log(keys);
//  return keys;
}