import React from 'react';

import classes from './Home.module.scss';

import HomePoster from "./HomePoster.jpg";
export default function Home() {


    return (
        <section className={classes.home}>
            <img src={HomePoster} alt="" className={classes.home__img} />
            <p className={classes.home__text}>
                Добро пожаловать в букинистический интернет-магазин "Ликбез"! Здесь Вы найдете литературу иностранных и отечественных писателей, поэтов, мыслителей и учёных, изданных в советское и новейшее время. Читайте, развивайтесь и почаще думаете о своем будущем!
            </p>
        </section>
    );
}