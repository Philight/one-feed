
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Linking  } from 'react-native';


export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const openURL = (URL) => {
  Linking.canOpenURL(URL).then(isSupported => {
    if (isSupported) {
      Linking.openURL(URL);
    } else {
      console.log("!!! Don't know how to open URI: " + URL);
    }
  });
}