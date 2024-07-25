import React from 'react';

import styles from './InDeveloping.module.scss';
import inDevelopingImage from './InDeveloping.jpg';
export default function InDeveloping() {
    
    
    return (
        <div className={styles['in-developing']}>
            <h1 className={styles['in-developing__title']}>Страница разрабатывается!</h1>
            <img className={styles['in-developing__image']} src={inDevelopingImage} alt=""/>
        </div>
    );
}