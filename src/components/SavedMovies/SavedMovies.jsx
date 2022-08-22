import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
    loading,
    searchSavedMovie,
    onDeleteMovie,
    savedMovies,
    onCheck,
    isCheckboxChecked,
    moviesList,
    isSaved,
    hadleLoading,
}) {
    return (
        <>
            <Header
                isLoggedIn={true}
                isMovies={false}
                isSavedMovies={true}
                isMain={false}
            />
            <SearchForm
                isSaved={true}
                searchSavedMovie={searchSavedMovie}
                onCheck={onCheck}
                isCheckboxChecked={isCheckboxChecked}
                hadleLoading={hadleLoading}
            />
            {loading && <Preloader />}
            <MoviesCardList
                isSavedMovies={true}
                onDelete={onDeleteMovie}
                savedMovies={savedMovies}
                moviesList={moviesList}
                isSaved={isSaved}
            />
            <Footer />
        </>
    );
}

export default SavedMovies;
