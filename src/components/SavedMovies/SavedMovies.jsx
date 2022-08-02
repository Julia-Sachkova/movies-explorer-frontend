import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function SavedMovies() {
    return (
        <>
            <Header isLoggedIn={true} isMovies={false} isSavedMovies={true} />
            <SearchForm />
            <MoviesCardList isSavedMovies={true} />
            <Footer />
        </>
    )
}

export default SavedMovies;