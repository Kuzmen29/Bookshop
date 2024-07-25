import React, { useEffect, useState } from 'react';

import styles from './BookCard.module.scss';
import { useBasketContext } from '../../context/BasketProvider';
import { useNavigate } from 'react-router-dom';
import { IBasket } from '../../pages/Basket/Basket';
import { BOOKS_IMAGES, HOST, PORT } from '../../API/paths';

import useActions from '../../hooks/useActions';
import useFavorites from '../../hooks/useFavorites';
import { IBook } from '../../types/book.type';

export type bookID = string;


interface IBookCardProps {
    book: IBook;
}

export default function BookCard({ book }: IBookCardProps) {

    const navigate = useNavigate();

    const { addToFavorites } = useActions()
    const { favorites } = useFavorites();

    const { basket, addToBasket } = useBasketContext();

    return (
        <div className={styles['book-card']}>
            <div className={styles['book-card__body']}
                onClick={() => navigate(`/books/${book.id_book}`)}>
                <img
                    src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/cover.jpg`}
                    className={styles['book-card__poster']} />
                <h1 className={styles['book-card__price']}>{book.new_price} &#8381;</h1>
                <h2 className={styles['book-card__name']}>{book.name_book}</h2>
                <h3 className={styles['book-card__author']}>{book.name_author} {book.surname_author}</h3>

                <h3 className={styles['book-card__rating']}>{book.year_publication}</h3>
            </div>

            {
                basket.find((item: IBasket) => item === book.id_book)
                    ? <button
                        className={[styles['book-card__btn-basket'], styles['book-card__btn-basket_has']].join(' ')}
                    >В корзинe</button>
                    :
                    <button
                        className={styles['book-card__btn-basket']}
                        onClick={() => {
                            addToBasket(book.id_book);
                        }}
                    >В корзину</button>
            }
            {
                favorites.find((item: bookID) => item === book.id_book)
                    ? <button
                        className={[styles['book-card__btn-basket'], styles['book-card__btn-basket_has']].join(' ')}
                    >В избранном</button>
                    :
                    <button
                        className={styles['book-card__btn-basket']}
                        onClick={() => {
                            addToFavorites(book.id_book)
                        }}
                    >В избранное</button>
            }
        </div>
    );
}