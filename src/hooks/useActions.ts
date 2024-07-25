import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { favoritesActions } from '../stores/favorites/favorite.slice';

const rootActions = {
    ...favoritesActions,
}

export default function useActions() {
    
    const dispatch = useDispatch();

    return useMemo(()=> bindActionCreators(rootActions, dispatch), [dispatch])
}