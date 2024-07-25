import { getPagesArray } from '../../utils/pages';
import classes from './Pagination.module.scss'

interface IPaginationProps {
    totalPages : number,
    page : number,
    changePage : (item:number)=>void
}

export default function Pagination({ totalPages, page, changePage }: IPaginationProps) {

    const pagesArray = getPagesArray(totalPages)

    return (
        <div className={classes['pagination']}>
            {
                pagesArray.map((item: number) => <h1 key={item}
                    className={
                        item === page
                            ? [classes['pagination__page-number'], classes['pagination__page-number_active']].join(' ')
                            : classes['pagination__page-number']
                    }
                    onClick={() => { changePage(item) }}
                >{item}</h1>)
            }
        </div>
    );
}