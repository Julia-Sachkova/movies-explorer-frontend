import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { DURATION_MAX_TIME } from "../../utils/constants";

function App() {
    const history = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem("checkbox")));
    const [shortSavedMovies, setShortSavedMovies] = useState(JSON.parse(localStorage.getItem("saved-checkbox")));
    const [isSaved, setIsSaved] = useState(false);
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
                    console.log(err);
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
                    console.log(err);
                });
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies()])
            .then(([movies, savedMovies]) => {
                    setLoading(true);

                    localStorage.setItem("movies", JSON.stringify(movies));
                    setMovies(JSON.parse(localStorage.getItem("movies")));
                    if (localStorage.getItem("filter-movies")) {
                        setFilteredMovies(JSON.parse(localStorage.getItem("filter-movies")));
                    }

                    localStorage.setItem("saved-movies", JSON.stringify(savedMovies));
                    const filterMoviesList = movies.reverse().filter((movie) => {
                        return savedMovies.find((m) => {
                            return m.movieId === movie.id;
                        });
                    });
                    setSavedMovies(JSON.parse(localStorage.getItem("saved-movies")));
                    setFilteredSavedMovies(filterMoviesList);
                }
            )
            .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
              })
        }
    }, [loggedIn]);

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
                console.log(err);
            });
    }

    const handleRegistrSubmit = ({ name, email, password }) => {
        mainApi.register({ name, email, password })
            .then((res) => {
                if (res._id) {
                    handleLoginSubmit({ email, password });
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .catch(() => {
                setLoggedIn(false);
            });
    };

    function handleUpdateUser({ name, email }) {
        mainApi.editUserInfo(name, email)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSearch(value) {
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

    function handleSearchSaveMovies(value) {
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

    function handleCheck() {
        setShortMovies(!shortMovies);
        localStorage.setItem("checkbox", JSON.parse(!shortMovies));
    }

    function handleCheckSaved() {
        setShortSavedMovies(!shortSavedMovies);
        localStorage.setItem("saved-checkbox", JSON.parse(!shortSavedMovies));
    }

    function handleMovieSave(movie) {
        const save = savedMovies.some((m) => m.movieId === movie.id);
        if (!save) {
            mainApi.saveMovie(movie)
                .then((newMovie) => {
                    setSavedMovies([newMovie, ...savedMovies]);

                    const filterMovie = {...movies.filter(movie => movie.id === newMovie.movieId)}[0];
                    setFilteredSavedMovies([filterMovie, ...filteredSavedMovies]);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            handleDeleteMovie(movie);
        }
    }

    function handleDeleteMovie(movie) {
        const deletedMovie = savedMovies.find(
            (m) => m.movieId === movie.id
        );

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
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function toBack() {
        return history(-1);
    }

    function handleExit() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("movies");
        localStorage.removeItem("saved-movies");
        localStorage.removeItem("filter-movies");
        localStorage.removeItem("checkbox");
        localStorage.removeItem("saved-checkbox");
        localStorage.removeItem("value");
        setFilteredMovies([]);
        setLoggedIn(false);
        history("/");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Routes>
                    <Route
                        path="/signup"
                        element={<Register onRegister={handleRegistrSubmit} />}
                    />

                    <Route
                        path="/signin"
                        element={<Login onLogin={handleLoginSubmit} />}
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
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
