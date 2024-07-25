import React from 'react';

import styles from './AlphabeticalSearch.module.scss'

interface IAlphabeticalSearchProps {
    getBooksByLetter: (letter: string) => void;
}

export default function AlphabeticalSearch({ getBooksByLetter }: IAlphabeticalSearchProps) {

    const RussianAlphabet: string[] = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

    return (
        <div className={styles['alphabetical-search']}>
            {
                RussianAlphabet.map((letter: string) => {
                    return <input
                        type="button"
                        key={letter}
                        className={styles['alphabetical-search__letter']}
                        onClick={() => getBooksByLetter(letter)}
                        value={letter} />
                })
            }
        </div>
    );
}