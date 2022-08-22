import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import InfoPopup from "../InfoPopup/InfoPopup";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { DURATION_MAX_TIME } from "../../utils/constants";

function App() {
    const history = useNavigate();
    const location = useLocation();
    const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem("checkbox")) || false);
    const [shortSavedMovies, setShortSavedMovies] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupErr, setPopupErr] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            mainApi.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        handleLogin();
                        history(location.pathname);
                    }
                })
                .catch((err) => {
                    setPopupOpen(true);
                    setPopupErr(true);
                    setPopupText(`Произошла ошибка при проверке токена: ${err}`);
                });
        }
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            mainApi.getUserInfo()
                .then((user) => setCurrentUser(user))
                .catch((err) => {
                    setPopupOpen(true);
                    setPopupErr(true);
                    setPopupText(`Произошла ошибка при получении данных о пользователе: ${err}`);
                });
        }
    }, [loggedIn]);


    useEffect(() => {
        if (loggedIn) {
            const moviesList = localStorage.getItem("saved-movies");
            const movies = localStorage.getItem("movies");

            if (moviesList) {
                setSavedMovies(JSON.parse(moviesList));
                
                const filterMoviesList = JSON.parse(movies).reverse().filter((movie) => {
                    return JSON.parse(moviesList).find((m) => {
                        return m.movieId === movie.id;
                    });
                });
                
                setFilteredSavedMovies(filterMoviesList);
            } else {
                getSavedMovies();
            }
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            const moviesList = localStorage.getItem("filter-movies");

            if (moviesList) {
                setFilteredMovies(JSON.parse(moviesList))
            }
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            const moviesList = localStorage.getItem("movies");

            if (moviesList) {
                setMovies(JSON.parse(moviesList));
            } else {
                getMovies();
            }
        }
    }, [loggedIn]);

    function getMovies() {;
        moviesApi.getMovies()
            .then((movies) => {
                localStorage.setItem("movies", JSON.stringify(movies));
                setMovies(movies);
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Произошла ошибка при загрузке фильмов: ${err}`);
            })
    }

    function getSavedMovies() {
        mainApi.getSavedMovies()
            .then((movies) => {
                localStorage.setItem("saved-movies", JSON.stringify(movies));
                setSavedMovies(movies);
                setFilteredSavedMovies(movies);
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Произошла ошибка при загрузке фильмов: ${err}`);
            })
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleLoginSubmit({ email, password }) {
        mainApi.authorization({ email, password })
            .then((res) => {
                if (res) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    history("/movies");
                }
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Произошла ошибка при входе: ${err}`);
            });
    }

    const handleRegistrSubmit = ({ name, email, password }) => {
        mainApi.register({ name, email, password })
            .then((res) => {
                if (res._id) {
                    handleLoginSubmit({ email, password });
                    setPopupOpen(true);
                    setPopupErr(false);
                    setPopupText('Вы успешно зарегистрировались!');
                }
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Произошла ошибка при регистрации: ${err}`);
            })
            .catch(() => {
                setLoggedIn(false);
            });
    };

    function handleUpdateUser({ name, email }) {
        mainApi.editUserInfo(name, email)
            .then((userData) => {
                setCurrentUser(userData);
                setPopupOpen(true);
                setPopupErr(false);
                setPopupText('Вы успешно изменили данные!');
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Не удалось изменить данные, произошла ошибка: ${err}`);
            });
    }

    function handleSearch(value) {
        if (value.length === 0) {
            setPopupOpen(true);
            setPopupErr(true);
            setPopupText('Нужно ввести ключевое слово');
        } else {
            if (shortMovies) {
                const filterMoviesList = movies.filter((movie) => {
                    return (
                        movie.duration <= DURATION_MAX_TIME &&
                        movie.nameRU.toLowerCase().includes(value.toLowerCase())
                    );
                });
                localStorage.setItem("filter-movies", JSON.stringify(filterMoviesList));
                setFilteredMovies(filterMoviesList);
            } else {
                const filterMoviesList = movies.filter((movie) => {
                    return movie.nameRU.toLowerCase().includes(value.toLowerCase());
                });
                localStorage.setItem("filter-movies", JSON.stringify(filterMoviesList));
                return setFilteredMovies(filterMoviesList);
            }
        }
    }

    function handleSearchSaveMovies(value) {
        if (value.length === 0) {
            setPopupOpen(true);
            setPopupErr(true);
            setPopupText('Нужно ввести ключевое слово');
        } else {
            const filteredArr = movies.filter((movie) => {
                return savedMovies.find((m) => {
                    return m.movieId === movie.id;
                });
            });

            if (shortSavedMovies) {
                const filterMoviesList = filteredArr.filter((movie) => {
                    return (
                        movie.duration <= DURATION_MAX_TIME &&
                        movie.nameRU.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setIsSaved(true);
                setFilteredSavedMovies(filterMoviesList);
            } else {
                const filterMoviesList = filteredArr.filter((movie) => {
                    return movie.nameRU.toLowerCase().includes(value.toLowerCase());
                });
                setIsSaved(true);
                setFilteredSavedMovies(filterMoviesList);
            }
        }
    }

    function handleCheck() {
        setShortMovies(!shortMovies);
        localStorage.setItem("checkbox", JSON.parse(!shortMovies));

        if (localStorage.getItem("filter-movies")) {
            const filterMoviesList = movies.filter((movie) => {
                if (!shortMovies) {
                    return movie.duration <= DURATION_MAX_TIME &&
                        movie.nameRU.toLowerCase().includes(localStorage.getItem("value").toLowerCase())
                } else {
                    return movie.nameRU.toLowerCase().includes(localStorage.getItem("value").toLowerCase())
                }
            });
            localStorage.setItem("filter-movies", JSON.stringify(filterMoviesList));
            setFilteredMovies(filterMoviesList);
        }
    }

    function handleCheckSaved() {
        setShortSavedMovies(!shortSavedMovies);

        const filteredArr = movies.filter((movie) => {
            return savedMovies.find((m) => {
                return m.movieId === movie.id;
            });
        });

        const filterMoviesList = filteredArr.filter((movie) => {
            if (!shortSavedMovies) {
                return movie.duration <= DURATION_MAX_TIME &&
                    movie.nameRU.toLowerCase().includes(localStorage.getItem("value").toLowerCase())
            } else {
                return movie.nameRU.toLowerCase().includes(localStorage.getItem("value").toLowerCase())
            }
        });
        setIsSaved(true);
        setFilteredSavedMovies(filterMoviesList);
    }

    function handleMovieSave(movie) {
        const save = savedMovies.some((m) => m.movieId === movie.id);
        if (!save) {
            mainApi.saveMovie(movie)
                .then((newMovie) => {
                    setSavedMovies([newMovie, ...savedMovies]);

                    const filterMovie = { ...movies.filter(movie => movie.id === newMovie.movieId) }[0];
                    setFilteredSavedMovies([filterMovie, ...filteredSavedMovies]);

                    localStorage.setItem("saved-movies", JSON.stringify([newMovie, ...savedMovies]));
                    
                    setPopupOpen(true);
                    setPopupErr(false);
                    setPopupText('Фильм успешно сохранен!');
                })
                .catch((err) => {
                    setPopupOpen(true);
                    setPopupErr(true);
                    setPopupText(`Произошла ошибка при сохранении фильма: ${err}`);
                });
        } else {
            handleDeleteMovie(movie);
        }
    }

    function handleDeleteMovie(movie) {
        const deletedMovie = savedMovies.find(
            (m) => m.movieId === movie.id);

        mainApi.deleteMovie(deletedMovie._id)
            .then(() => {
                const newMovies = savedMovies.filter(
                    (c) => c.movieId !== movie.id
                );
                const newFilterMovies = filteredSavedMovies.filter(
                    (c) => c.id !== movie.id
                );
                setSavedMovies(newMovies);
                setFilteredSavedMovies(newFilterMovies);

                localStorage.setItem("saved-movies", JSON.stringify(newMovies));

                setPopupOpen(true);
                setPopupErr(false);
                setPopupText('Фильм успешно удален!');
            })
            .catch((err) => {
                setPopupOpen(true);
                setPopupErr(true);
                setPopupText(`Произошла ошибка при удалении фильма: ${err}`);
            });
    }

    function handlePopupClose() {
        setPopupOpen(false);
    }

    if (popupOpen) {
        setTimeout(handlePopupClose, 4000);
    }

    function hadleLoading() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
          }, 500);
    }

    function toBack() {
        history(-2);
    }

    function handleExit() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("movies");
        localStorage.removeItem("saved-movies");
        localStorage.removeItem("filter-movies");
        localStorage.removeItem("checkbox");
        localStorage.removeItem("value");
        setFilteredMovies([]);
        setLoggedIn(false);
        handlePopupClose();
        history("/");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Routes>
                    <Route
                        path="/signup"
                        element={!loggedIn ?
                            <Register onRegister={handleRegistrSubmit} />
                            : <Navigate to="/" />
                        }
                    />

                    <Route
                        path="/signin"
                        element={!loggedIn ?
                            <Login onLogin={handleLoginSubmit} />
                            :
                            <Navigate to="/" />
                        }
                    />

                    <Route path="/" element={<Main isLoggedIn={loggedIn} />} />

                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Movies
                                    loading={loading}
                                    onSave={handleMovieSave}
                                    onDeleteMovie={handleDeleteMovie}
                                    moviesList={filteredMovies}
                                    searchMovie={handleSearch}
                                    savedMovies={savedMovies}
                                    onCheck={handleCheck}
                                    isCheckboxChecked={shortMovies}
                                    hadleLoading={hadleLoading}
                                />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <SavedMovies
                                    loading={loading}
                                    onDelete={handleDeleteMovie}
                                    moviesList={filteredSavedMovies}
                                    searchSavedMovie={handleSearchSaveMovies}
                                    onDeleteMovie={handleDeleteMovie}
                                    savedMovies={savedMovies}
                                    onCheck={handleCheckSaved}
                                    isCheckboxChecked={shortSavedMovies}
                                    isSaved={isSaved}
                                    hadleLoading={hadleLoading}
                                />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Profile
                                    onUpdateUser={handleUpdateUser}
                                    onExit={handleExit}
                                />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound onBack={toBack} />} />
                </Routes>

                <InfoPopup
                    isOpen={popupOpen}
                    text={popupText}
                    onClose={handlePopupClose}
                    err={popupErr}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
