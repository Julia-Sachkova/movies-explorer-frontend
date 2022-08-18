import React from "react";

import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
    loading,
    moviesList,
    onSave,
    searchMovie,
    onDeleteMovie,
    savedMovies,
    onCheck,
    isCheckboxChecked,
}) {
    return (
        <>
            <Header
                isLoggedIn={true}
                isMovies={true}
                isSavedMovies={false}
                isMain={false}
            />
            <SearchForm
                isSaved={false}
                searchMovie={searchMovie}
                onCheck={onCheck}
                isCheckboxChecked={isCheckboxChecked}
            />
            {loading && <Preloader />}
            <MoviesCardList
                isSavedMovies={false}
                moviesList={moviesList}
                onSave={onSave}
                onDelete={onDeleteMovie}
                savedMovies={savedMovies}
            />
            <Footer />
        </>
    );
}

export default Movies;
