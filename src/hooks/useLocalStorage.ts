import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {

    const [value, setValue] = useState(
        () => {
            return getStorageValue(key, defaultValue);
        }
    )

    useEffect( () => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return (
        [value, setValue]    
    );
}

function getStorageValue(key: any, defaultValue: any) {
    // getting stored value

    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);

    return initial || defaultValue;
}