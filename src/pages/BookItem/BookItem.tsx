import React, { useEffect, useState } from 'react';

import classes from './BookItem.module.scss';
import { useParams } from 'react-router-dom';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { useFetching } from '../../hooks/useFetching';
import { BooksService } from '../../API/BooksService';


import Close from './Close.png'
import { getDate } from '../../utils/date';
import BookCommentAddForm from '../../components/BookCommentAddForm/BookCommentAddForm';
import { BOOKS_IMAGES, HOST, PORT } from '../../API/paths';
import { IBook } from '../../types/book.type';
import { IBookReview, IUserComment } from '../../types/comment.type';
import { useIsAuthContext } from '../../context/AuthProvider';
import Login from '../Login/Login';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginWindowActions } from '../../stores/loginWindow/loginWindow';

export default function BookItem() {

    const param = useParams();
    const bookID = param.bookID;

    const [book, setBook] = useState<IBook>(null);
    const [bookMainImage, setBookMainImage] = useState<string>();

    const [modalWindowImagesVisible, setModalWindowImagesVisible] = useState(false);
    const [modalWindowAddComment, setModalWindowAddComment] = useState(false);

    const isAuth = useIsAuthContext();
    const dispatch = useDispatch();

    const loginWindow = useSelector((state: any) => state.loginWindow);


    const [getBook, isGetBookLoading, getBookError] = useFetching(async (bookID: string) => {
        let response = await BooksService.getBook(bookID)
        setBook(response.data);
    })

    useEffect(() => {
        getBook(bookID)
    }, [])

    useEffect(() => {
        if (book) {
            setBookMainImage(book.imgs[0]);
        }
    }, [book])

    function pushBookIDToBasket(bookID: string) {

    }
    function addComment() {

    }

    return (
        book &&
        <section className={classes['book-item']}>

            <div className={classes['book-item__main']}>

                <div className={classes['images']}>

                    {
                        modalWindowImagesVisible &&
                        <ModalWindow visible={modalWindowImagesVisible} setVisible={setModalWindowImagesVisible}>
                            <img src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/${bookMainImage}`}
                                className={classes['images__modal-window-main-image']} />
                            <div className={classes['images__modal-window-all-images']} >
                                {
                                    book.imgs.map((image: string) => {
                                        return <img
                                            src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/${image}`}
                                            className={classes['images__modal-window-item-images']}
                                            onClick={() => setBookMainImage(image)} />
                                    })
                                }
                            </div>
                        </ModalWindow>

                    }
                    <img src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/${bookMainImage}`} className={classes['images__main-image']} onClick={() => setModalWindowImagesVisible(true)} />
                    <div className={classes['images__all-images']}>
                        {
                            book.imgs.map((image: string) => {
                                return <img
                                    src={HOST + PORT + `${BOOKS_IMAGES}/Section ${book.section}/${book.place}/${book.id_book}/${image}`}
                                    className={classes['images__item-image']}
                                    onClick={() => setBookMainImage(image)} />
                            })
                        }
                    </div>
                </div>

                <div className={classes['info']}>
                    <h1 className={classes['info__name-book']}>{book.name_book}</h1>
                    <h2 className={classes['info__name-author']}>{book.name_author} {book.surname_author}</h2>
                    <table className={classes['info__data']}>
                        <tr>
                            <td>ID Книги</td>
                            <td>{book.id_book}</td>
                        </tr>
                        <tr>
                            <td>Издательство</td>
                            <td>{book.publishing_house}</td>
                        </tr>
                        <tr>
                            <td>Город издания</td>
                            <td>{book.city_publication}</td>
                        </tr>
                        <tr>
                            <td>Год издания</td>
                            <td>{book.year_publication}</td>
                        </tr>
                        <tr>
                            <td>Количество страниц</td>
                            <td>{book.number_pages}</td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>{book.ISBN}</td>
                        </tr>
                    </table>
                </div>

                <div className={classes['order']}>
                    <h1 className={classes['order__price']}>{book.new_price}  &#8381;</h1>
                    <button className={classes['order__basket']} onClick={() => pushBookIDToBasket(book.id_book)} >В корзину</button>
                </div>

            </div>

            <section className={classes['comments']}>
                <div className={classes['comments__header']}>
                    {
                        book.comments && book.comments.length
                            ? <h2 className={classes['comments__thoughts']}>Отзывов о книге {book.comments.length}</h2>
                            : <h2 className={classes['comments__thoughts']}>Отзывов о данной книге пока нет</h2>
                    }

                    <button
                        className={classes['comments__add-button']}
                        onClick={() => {
                            if (isAuth) {
                                setModalWindowAddComment(true);
                            } else {
                                dispatch(loginWindowActions.toggleLoginWindow(true))
                            }
                        }}
                    >Написать отзыв</button>

                    <select name="sort" className={classes['comments__sort']}>
                        <option value="new">Сначала новые</option>
                        <option value="old">Сначала старые</option>
                    </select>


                </div>

                {
                    book.comments && book.comments.length &&
                    <div className={classes['comments__list']}>
                        {
                            book.comments.map((comment: IBookReview) => {
                                return <div className={classes['comments__comment']}>
                                    <div className={classes['comments__user']}>
                                        <h1 className={classes['comments__user-name']}>{comment.name_user}</h1>
                                        <h1 className={classes['comments__user-date']}>{getDate(comment.full_date)}</h1>
                                    </div>
                                    <div className={classes['comments__content']}>
                                        <h1 className={classes['comments__content-theme']}>{comment.title}</h1>
                                        <p className={classes['comments__content-thought']}>
                                            {comment.text}
                                        </p>
                                    </div>
                                    <div className={classes['comments__rating']}>

                                    </div>
                                </div>
                            })
                        }
                    </div>
                }

                {
                    modalWindowAddComment &&
                    <ModalWindow visible={modalWindowAddComment} setVisible={setModalWindowAddComment}>
                        <BookCommentAddForm bookID={book.id_book} />
                    </ModalWindow>
                }
            </section >
        </section >
    );
}