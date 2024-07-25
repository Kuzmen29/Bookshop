import React from 'react';

import styles from './MiniLoading.module.scss';
export default function MiniLoading() {

    return (
        <div className={styles['mini-loading']}>
            <div className={styles["book"]}>
                <div className={styles["book__pg-shadow"]}></div>
                <div className={styles["book__pg"]}></div>
                <div className={[styles["book__pg"], styles['book__pg--2']].join(' ')}></div>
                <div className={[styles["book__pg"], styles['book__pg--3']].join(' ')}></div>
                <div className={[styles["book__pg"], styles['book__pg--4']].join(' ')}></div>
                <div className={[styles["book__pg"], styles['book__pg--5']].join(' ')}></div>
            </div>
            <h2 className={styles['mini-loading__title']}>Загрузка...</h2>
        </div>

    );
}