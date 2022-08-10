import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies, moviesList, onDelete, onSave }) {
    return (
        <section>
            <ul className="cards">
                {moviesList.map((movies) => (
                    <MoviesCard
                        isSavedMovies={isSavedMovies}
                        key={isSavedMovies ? movies._id : movies.id}
                        onDelete={onDelete}
                        onSave={onSave}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;