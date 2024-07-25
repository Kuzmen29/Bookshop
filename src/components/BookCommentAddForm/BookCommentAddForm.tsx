import React, { useState } from 'react';

import classes from "./BookCommentAddForm.module.scss";
import Close from "./Close.png";
import StarRating from '../StarRating/StarRating';
import { useIsAuthContext } from '../../context/AuthProvider';
import { IUserComment } from '../../types/comment.type';

interface IBookCommentAddFormProps {
    bookID: string;
}
export default function BookCommentAddForm({ bookID }: IBookCommentAddFormProps) {

    const isAuth = useIsAuthContext();

    const [comment, setComment] = useState<IUserComment>({
        rating: null,
        header: '',
        text: '',
        plus: '',
        minus: '',
    })

    function addComment() {
        let data = {
            userID: isAuth.id,
            bookID,
            date: new Date(),
            comment
        }
        console.log(data);
    }
    return (
        <form className={classes['add-comment']} action="#">

            <h2 className={classes['add-comment__title']}>Оставить отзыв</h2>

            <div className={classes['add-comment__rating']}>
                <StarRating
                    comment={comment}
                    setComment={setComment}
                />
            </div>

            <form className={classes['data']}>
                <input type="text"
                    className={classes['data__input']}
                    value={comment.header}
                    onChange={(event) => setComment({ ...comment, header: event.target.value })}
                    name="header" placeholder="Заголовок" />
                <textarea
                    className={classes['data__text']}
                    value={comment.text}
                    onChange={(event) => setComment({ ...comment, text: event.target.value })}
                    placeholder="Ваш отзыв"></textarea>
                <input type="text"
                    value={comment.plus}
                    onChange={(event) => setComment({ ...comment, plus: event.target.value })}
                    className={classes['data__input']}
                    name="plus" placeholder="Плюсы" />
                <input type="text"
                    className={classes['data__input']}
                    value={comment.minus}
                    onChange={(event) => setComment({ ...comment, minus: event.target.value })}
                    name="minus" placeholder="Минусы" />
            </form>


            <div className={classes['add-comment__buttons']}>
                <button
                    type='button'
                    className={[classes['add-comment__button-add'], classes['add-comment__button']].join(' ')}
                    onClick={() => addComment()}
                >Добавить</button>
                <button type="button"
                    className={[classes['add-comment__button-reset'], classes['add-comment__button']].join(' ')}
                    onClick={() => setComment({
                        rating: null,
                        header: '',
                        text: '',
                        plus: '',
                        minus: '',
                    })}
                >Сбросить</button>
            </div>
        </form>
    );
}