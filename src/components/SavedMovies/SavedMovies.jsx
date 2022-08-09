import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from "../Footer/Footer";

function SavedMovies({ loading }) {
    return (
        <>
            <Header isLoggedIn={true} isMovies={false} isSavedMovies={true} />
            <SearchForm />
            {loading && <Preloader />}
            <MoviesCardList isSavedMovies={true} />
            <Footer />
        </>
    )
}

export default SavedMovies;