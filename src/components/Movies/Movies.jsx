import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <>
            <Header isLoggedIn={true} isMovies={true} isSavedMovies={false} />
            <SearchForm />
            <MoviesCardList isSavedMovies={false} />
            <Footer />
        </>
    )
}

export default Movies;