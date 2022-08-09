import React from 'react';

import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function Movies({ loading, moviesList }) {
    const width = window.screen.width;
    const [filmsAmount, setFilmsAmount] = React.useState(() => {
        if (width >= 768) {
            return 12;
        } else if (width >= 520) {
            return 8;
        } else {
            return 5;
        }
    });

    const [filmsAdd, setFilmsAdd] = React.useState(() => {
        if (width >= 768) {
            return 3;
        } else {
            return 2;
        }
    });

    const moviesListDisplay = moviesList.slice(0, filmsAmount);

    function onChangeWidth() {
        if (width >= 768) {
            setFilmsAmount(12);
            setFilmsAdd(3);
        } else if (width >= 520) {
            setFilmsAmount(8);
            setFilmsAdd(2);
        } else {
            setFilmsAmount(5);
            setFilmsAdd(2);
        }
    };

    React.useEffect(() => {
        window.addEventListener('resize', onChangeWidth);
    });

    function handleAddFilms() {
        setFilmsAmount((start) => start + filmsAdd);
    }

    return (
        <>
            <Header isLoggedIn={true} isMovies={true} isSavedMovies={false} />
            <SearchForm />
            {loading && <Preloader />}
            <MoviesCardList isSavedMovies={false} moviesList={moviesListDisplay} />
            {moviesListDisplay.length > moviesList.length ?
                <button type="button" className="movies__more" onClick={handleAddFilms}>Ещё</button>
                :
                <></>
            }
            <Footer />
        </>
    )
}

export default Movies;