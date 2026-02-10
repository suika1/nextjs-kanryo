import { useRef } from 'react';

export default function usePrevious<T>(value: T): T | null {
  const currentRef = useRef(value);
  const previousRef = useRef<T>(null);
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }
  return previousRef.current;
}
