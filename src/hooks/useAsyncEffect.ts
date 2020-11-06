import { DependencyList, useEffect } from 'react';

// Wrapper for useEffect hook to allow async/await to be used by changing the effect type to any
const useAsyncEffect = (effect: () => any, deps?: DependencyList) => useEffect(effect, deps);

export default useAsyncEffect;
