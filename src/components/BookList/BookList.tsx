import React from 'react';
import { IBook } from '../../types/book.type';

import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.scss';


export default function BookList({ books }: { books: IBook[] }) {


    return (
        <div className={styles['book-list']}>
            {
                books.map((book: IBook) => (
                    <BookCard key={book.id_book} book={book} />
                ))
            }
        </div>
    );
}