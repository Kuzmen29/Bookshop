import React, { useEffect, useState } from 'react';


import classes from './News.module.scss';
import { NewsService } from '../../API/NewsService';
import { useFetching } from '../../hooks/useFetching';
import Loading from '../../components/Loading/Loading';
import { NavLink } from 'react-router-dom';


import NotImage from "./NotImage.svg";
import { INew } from '../../types/new.type';
import { Error } from '../../components/Error/Error';

export default function News() {

    const [news, setNews] = useState<INew[]>([]);

    const [getAllNews, isGetAllNewsLoading, getAllNewsError] = useFetching(async () => {
        let response = await NewsService.getLastNews();
        setNews(response.data)
    }

    )

    useEffect(() => {
        getAllNews();
    }, [])


    return (
        <section className={classes.news}>
            <h1 className={classes.news__heading}>Новости литературы</h1>
            <div className={classes.news__list}>
                {
                    isGetAllNewsLoading
                        ? <Loading />
                        : getAllNewsError
                            ? <Error width={25} height={25}/>
                            : news.map((item: INew) =>
                                <NavLink key={item.title} to={item.href}>
                                    <div className={classes.new}>
                                        <div className={classes.new__header}>
                                            <h2 className={classes.new__date}>{item.date}</h2>
                                            <h1 className={classes.new__category}>{item.category}</h1>
                                        </div>
                                        {
                                            item.poster 
                                            ? <img src={item.poster} className={classes.new__image} alt="" />
                                            : <img src={NotImage} className={classes['new__not-image']} alt="" />
                                        }
                                        <p className={classes.new__description}>{item.title}</p>
                                        {
                                            item.exclusive && <h1 className={classes.new__exclusive}>{item.exclusive}</h1>
                                        }
                                    </div>

                                </NavLink>
                            )
                }
            </div>
        </section>
    );
}