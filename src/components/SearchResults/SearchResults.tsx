import React from 'react';

import styles from './SearchResults.module.scss';

interface ISearchResultsProps {
    result : number
}
export default function SearchResults({result} : ISearchResultsProps) {
    
    
    return (
        <h2 className={styles['search-results']}>Результатов поиска: {result}</h2>
    );
}