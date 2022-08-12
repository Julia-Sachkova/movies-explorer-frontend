import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation  } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const history = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res)
            handleLogin();
            history(location.pathname);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err)=> {
        console.log(err);
      })
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
        mainApi.getSavedMovies()
            .then((movies) => {
                const moviesList = movies.filter((m) => m.owner === currentUser._id);
                setSavedMovies(moviesList);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            });
    }
  }, [loggedIn, currentUser]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLoginSubmit({email, password}) {
    mainApi.authorization({email, password})
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true);
          history("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleRegistrSubmit = ({name, email, password}) => {
    mainApi.register({name, email, password})
      .then((res) => {
        if (res._id) {
          handleLoginSubmit({ email, password })
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .catch(() => {
        setLoggedIn(false);
      })
  }

  function handleExit() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history("/");
  }

  function handleUpdateUser(user) {
    mainApi.editUserInfo(user.name, user.about)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  function handleMovieSave(movie) {
    mainApi.saveMovie(movie)
      .then((newMovie) => setSavedMovies([newMovie, ...savedMovies]))
      .catch((err) => {
        console.log(err)
      })
  };

  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id))
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function toBack() {
    return history(-1);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          
          <Route
            path="/signup"
            element={<Register
              onRegister={handleRegistrSubmit}  
            />}
          />

          <Route
            path="/signin"
            element={<Login
              onLogin={handleLoginSubmit}
            />}
          />

          <Route
            path="/"
            element={<Main
              isLoggedIn={loggedIn}
            />}
          />

          <Route
            path="/movies"
            element={<ProtectedRoute loggedIn={loggedIn}>
              <Movies
                loading={loading}
                onSave={handleMovieSave}
                moviesList={movies}
              />
            </ProtectedRoute>
          }
          />

          <Route
            path="/saved-movies"
            element={<ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                loading={loading}
                onDelete={handleDeleteMovie}
                moviesList={savedMovies}
              />
            </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={<ProtectedRoute loggedIn={loggedIn}>
              <Profile 
                onUpdateUser={handleUpdateUser}
                onExit={handleExit}
              />
            </ProtectedRoute>
          }
          />

          <Route
            path="*"
            element={<NotFound
              onBack={toBack}
            />}
          />

        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
