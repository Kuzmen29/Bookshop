import React from 'react';

import { useTypedSelector } from './useTypedSelector';

export default function useFavorites() {
    
    const favorites = useTypedSelector((state:any) => state.favorites);
    return (
        {favorites}
    );
}