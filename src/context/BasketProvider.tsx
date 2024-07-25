import React, { useContext } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BasketContext = createContext(null);

export function useBasketContext() {
    return useContext(BasketContext);
}

interface IBasketProviderProps {
    children: React.ReactNode
}

export default function BasketProvider({ children }: IBasketProviderProps) {

    const [basketLocalStorage, setBasketLocalStorage] = useLocalStorage('BookshopBasket', []);

    function addToBasket(bookID: string) {
        setBasketLocalStorage([...basketLocalStorage, bookID]);
    }
    function deleteFromBasket(bookID:string) {
        setBasketLocalStorage(basketLocalStorage.filter((book: string) => book !== bookID))
    }

    return (
        <BasketContext.Provider value={{ basket: basketLocalStorage, addToBasket, deleteFromBasket }}>
            {
                children
            }
        </BasketContext.Provider>
    );
}