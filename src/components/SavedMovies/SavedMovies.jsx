import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function SavedMovies({ loading, onDelete, moviesList }) {
    return (
        <>
            <Header isLoggedIn={true} isMovies={false} isSavedMovies={true} isMain={false} onDelete={onDelete} />
            <SearchForm />
            {loading && <Preloader />}
            <MoviesCardList isSavedMovies={true} moviesList={moviesList} />
            <Footer />
        </>
    )
}

export default SavedMovies;