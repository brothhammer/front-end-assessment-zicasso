import * as React from 'react'

/**
 * Custom hook to manage state with localStorage.
 * 
 * @template T
 * @param {string} key - The key under which the state is stored in localStorage.
 * @param {T} base - The initial state value.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The state and the state setter function.
 */
const useLocalStorageState = <T,>(key: string = "", base: unknown = ""): [T, React.Dispatch<React.SetStateAction<T>>] => {

    const [state, setState] = React.useState<T>(() => {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : base;
    });
    
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);
    
    return [state, setState];

}

export default useLocalStorageState;
