
import { useState, useEffect, useLayoutEffect, useRef } from 'react';


export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}