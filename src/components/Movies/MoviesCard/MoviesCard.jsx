import React from "react";

import "./MoviesCard.css";
import { HOUR_TIME } from "../../../utils/constants";

function MoviesCard({
    isSavedMovies,
    movie,
    onDelete,
    onSave,
    savedMovies,
    isSaved,
}) {
    function handleDeleteClick() {
        onDelete(movie);
    }

    function handleSaveClick() {
        onSave(movie);
    }

    function countMovieTime(duration) {
        const hours = Math.trunc(duration / HOUR_TIME);
        const minutes = duration % HOUR_TIME;

        if (hours === 0) {
            return `${minutes}м`;
        } else {
            return `${hours}ч ${minutes}м`;
        }
    }

    return (
        <div className="card">
            <div className="card__about-container">
                <div className="card__text">
                    <h2 className="card__name">{movie.nameRU}</h2>
                    <p className="card__time">
                        {countMovieTime(movie.duration)}
                    </p>
                </div>
                <button
                    type="button"
                    className={`card__save-btn ${!isSaved &&
                        savedMovies.find((m) => m.movieId === movie.id)
                        ? "card__save-btn_active"
                        : ""
                        } ${isSavedMovies && "card__save-btn_delete"}`}
                    onClick={
                        isSavedMovies ? handleDeleteClick : handleSaveClick
                    }
                />
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card__image"
                    src={`https://api.nomoreparties.co${movie.image.url}`}
                    alt={movie.nameRU}
                />
            </a>
        </div>
    );
}

export default MoviesCard;
