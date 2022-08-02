import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ isSavedMovies }) {
    return (
        <section>
            <ul className="cards">

                {/* временнные карточки для просмотра результата */}

                <MoviesCard isSavedMovies={isSavedMovies} />
                <MoviesCard isSavedMovies={isSavedMovies} />
                <MoviesCard isSavedMovies={isSavedMovies} />
                <MoviesCard isSavedMovies={isSavedMovies} />
            </ul>
            <button type="button" className="cards__more">Ещё</button>
        </section>
    )
}

export default MoviesCardList;