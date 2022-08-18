import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
    SCREEN_WIDTH_MID,
    SCREEN_WIDTH_MIN,
    MOVIES_AMOUNT_MAX,
    MOVIES_AMOUNT_MID,
    MOVIES_AMOUNT_MIN,
    MOVIES_ADD_MAX,
    MOVIES_ADD_MIN,
    START_MOVIES_AMOUNT,
} from "../../../utils/constants";

function MoviesCardList({
    isSavedMovies,
    moviesList,
    onDelete,
    onSave,
    savedMovies,
    isSaved,
}) {
    const width = window.screen.width;

    const [filmsAmount, setFilmsAmount] = React.useState(0);
    const [filmsAdd, setFilmsAdd] = React.useState(0);

    const moviesDisplay = moviesList.length - filmsAmount;

    React.useEffect(() => {
        if (width >= SCREEN_WIDTH_MID) {
            setFilmsAmount(MOVIES_AMOUNT_MAX);
            setFilmsAdd(MOVIES_ADD_MAX);
        } else if (width < SCREEN_WIDTH_MID && width >= SCREEN_WIDTH_MIN) {
            setFilmsAmount(MOVIES_AMOUNT_MID);
            setFilmsAdd(MOVIES_ADD_MIN);
        } else {
            setFilmsAmount(MOVIES_AMOUNT_MIN);
            setFilmsAdd(MOVIES_ADD_MIN);
        }
    }, [width]);

    function handleAddFilms() {
        setFilmsAmount(filmsAmount + filmsAdd);
    }

    return (
        <section>
            {moviesList.length === 0 ? (
                <p className="cards__err">Ничего не найдено</p>
            ) : (
                ""
            )}
            <ul className="cards">
                {moviesList
                    .slice(START_MOVIES_AMOUNT, filmsAmount)
                    .map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            isSavedMovies={isSavedMovies}
                            onDelete={onDelete}
                            onSave={onSave}
                            savedMovies={savedMovies}
                            isSaved={isSaved}
                        />
                    ))}
            </ul>
            {moviesDisplay >= 0 && !isSavedMovies ? (
                <button
                    type="button"
                    className="cards__more"
                    onClick={handleAddFilms}
                >
                    Ещё
                </button>
            ) : (
                <></>
            )}
        </section>
    );
}

export default MoviesCardList;
