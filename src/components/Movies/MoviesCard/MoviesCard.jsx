import './MoviesCard.css';

function MoviesCard({ isSavedMovies, movie, onDelete, onSave }) {

    function handleDeleteClick() {
        onDelete(movie);
    }

    function handleSaveClick() {
        onSave(movie);
    }

    function countMovieTime(duration) {
        const hours = Math.trunc(duration / 60);
        const minutes = duration % 60;

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
                    <p className="card__time">{countMovieTime(movie.duration)}</p>
                </div>
                <button type="button" className={`card__save-btn ${isSavedMovies && 'card__save-btn_delete'}`} onClick={isSavedMovies ? handleDeleteClick : handleSaveClick} />
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer"><img className="card__image" src={movie.image.url} alt={movie.nameRU} /></a>
        </div>
    )
}

export default MoviesCard;