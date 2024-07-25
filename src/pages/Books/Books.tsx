import React, { useEffect, useReducer, useState } from 'react';

import styles from './Books.module.scss';
import AlphabeticalSearch from '../../components/AlphabeticalSearch/AlphabeticalSearch';

import { useFetching } from '../../hooks/useFetching';
import { BooksService } from '../../API/BooksService';
import Pagination from '../../components/Pagination/Pagination';
import { getPageCount } from '../../utils/pages';
import { IBook } from '../../types/book.type';
import Loading from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';
import BookList from '../../components/BookList/BookList';

export default function Books() {

    const [books, setBooks] = useState<IBook[]>([]);
    const [booksTotalPages, setBooksTotalPages] = useState<number>(0);
    const [booksCurrentPage, setBooksCurrentPage] = useState<number>(1);
    const [booksLimitPage, setBooksLimitPage] = useState<number>(5);

    const [booksLetter, setBooksLetter] = useState<string>('');

    const [getAllBooks, isGetAllBooksLoading, getAllBooksError] = useFetching(async function (page: number, limit: number) {
        let response = await BooksService.getAllBooks(page, limit);

        setBooks(response.data);
        setBooksTotalPages(getPageCount(response.total, booksLimitPage));
    })

    const [getBooksByLetter, isGetBooksByLetterLoading, getBooksByLetterError] = useFetching(
        async function (letter: string, page: number, limit: number) {
            let response = await BooksService.getBooksByLetter(letter);

            setBooks(response.data);
            setBooksTotalPages(getPageCount(response.total, booksLimitPage));
        })

    useEffect(() => {

        if (booksLetter) {
            getBooksByLetter(booksLetter, booksCurrentPage, booksLimitPage);
        } else {
            getAllBooks(booksCurrentPage, booksLimitPage);
        }


    }, [booksCurrentPage, booksLetter, booksLimitPage])


    return (
        <section className={styles['books']}>

            <div className={styles['books__alphabetical-search']}>
                <AlphabeticalSearch
                    getBooksByLetter={(letter: string) => {
                        setBooksLetter(letter);
                    }} />
            </div>

            <div className={styles['books__main']}>
                {
                    isGetAllBooksLoading
                        ? <Loading />
                        : getAllBooksError
                            ? <Error width={25} height={25} />
                            : (
                                <div className={styles['books__list']}>
                                    <div className={styles['books__pagination']}>
                                        <Pagination totalPages={booksTotalPages} page={booksCurrentPage} changePage={setBooksCurrentPage} />
                                        <select defaultValue={booksLimitPage} onChange={(event) => setBooksLimitPage(+event.target.value)} >
                                            <option value="5">5</option>
                                            <option value="3">3</option>
                                            <option value="7">7</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <BookList books={books} />
                                </div>

                            )
                }
            </div>

        </section>
    );
}