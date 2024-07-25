import React, { useEffect, useState } from 'react';

import classes from './BookSearch.module.scss';
import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';
import { BooksService } from '../../API/BooksService';
import BookCard from '../../components/BookCard/BookCard';
import Loading from '../../components/Loading/Loading';
import { IBook } from '../../types/book.type';
import { useSelector } from 'react-redux';
import BookList from '../../components/BookList/BookList';
import SearchResults from '../../components/SearchResults/SearchResults';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../stores/search/search.slice';

export default function BookSearch() {

    // const params = useParams();
    // const query = params.query;

    const [books, setBooks] = useState([]);
    const searchQuery = useSelector((state:any)=>state.search);
    const dispatch = useDispatch();

    const [getBooksBySearch, isGetBooksBySearchLoading, getBooksBySearchError] = useFetching(async (query:string) => {
        let response = await BooksService.getBooksBySearch(query);
        setBooks(response.data)
    })

    useEffect(()=>{
        getBooksBySearch(searchQuery);
    },[searchQuery])

    useEffect(()=>{
        console.log('created');
        return ()=>{
            dispatch(searchActions.searchByQuery(null));
        }
    },[])

    return (
        <section className={classes['book-search']}>
            <SearchResults result={books.length}/>
            {
                isGetBooksBySearchLoading
                    ? <Loading/>
                    : getBooksBySearchError
                        ? <h1>Error</h1>
                        : <BookList books={books}/>
            }
        </section>
    );
}