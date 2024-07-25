import React, { useCallback, useEffect, useMemo, useState } from 'react';

import classes from './Basket.module.scss';

import { useFetching } from '../../hooks/useFetching';
import { BooksService } from '../../API/BooksService';

import Remove from './Remove.svg'
import { useBasketContext } from '../../context/BasketProvider';
import { BOOKS_IMAGES, HOST, PORT } from '../../API/paths';

import { IBook } from '../../types/book.type';
export type IBasket = string;

export default function Basket() {

    const { basket: basketLocalStorage, addToBasket, deleteFromBasket } = useBasketContext();


    const [basket, setBasket] = useState<IBook[]>([]);

    const [getBooksFromBasket, isBooksFromBasketLoading, booksFromBasketError] = useFetching(async () => {
        let response = await BooksService.getBooksFromBasket(basketLocalStorage);
        setBasket(response.data)
    })

    useEffect(() => {
        getBooksFromBasket();
    }, [])

    const summa = useMemo(() => {
        let sum = 0;
        for (const iterator of basket) {
            sum += iterator.new_price
        }
        return sum;
    }, [basket])

    function deleteBook(item: string) {
        setBasket(basket.filter((book: IBook) => book.id_book !== item));
        deleteFromBasket(item);
    }

    interface IBasketCardProps {
        book: IBook
    }
    function BasketCard({ book }: IBasketCardProps) {

        return (
            <div key={book.id_book} className={classes.book}>
                <img
                    className={classes.book__poster}
                    src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/cover.jpg`}
                    alt="" />

                <div className={classes.book__info}>
                    <h1 className={classes.book__name}>{book.name_book}</h1>
                    <h2 className={classes.book__author}>{book.name_author} {book.surname_author}</h2>
                    <h1 className={classes.book_priceo}>{book.new_price} &#8381;</h1>
                </div>
                <img src={Remove}
                    className={classes.book__remove}
                    onClick={() => deleteBook(book.id_book)} />
            </div>
        );
    }

    return (
        <section className={classes.basket}>

            {
                basketLocalStorage.length
                    ? <h1 className={classes.basket__title}>Корзина</h1>
                    : <h2 className={classes.basket__empty}>Корзина пуста</h2>
            }

            <div className={classes.basket__inner}>

                <div className={classes.basket__list}>

                    {
                        basket.length ?
                            basket.map(function (book: IBook) {
                                return <BasketCard key={book.id_book} book={book} />
                            })
                            : undefined
                    }

                </div >

                {
                    basket.length
                        ? <div className={classes.order}>
                            <h2 className={classes.order__value}>{basket.length} товара</h2>
                            <h1 className={classes.order__summa}>{summa} &#8381;</h1>
                            <button className={classes.order__button}>Оформить заказ</button>
                        </div>
                        : undefined
                }
            </div >
        </section >
    );
}