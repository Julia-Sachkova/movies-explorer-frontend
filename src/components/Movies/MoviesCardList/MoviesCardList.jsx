import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies, moviesList }) {
    return (
        <section>
            <ul className="cards">
                {moviesList.map((movies) => (
                    <MoviesCard
                        isSavedMovies={isSavedMovies}
                        key={isSavedMovies ? movies._id : movies.id}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;