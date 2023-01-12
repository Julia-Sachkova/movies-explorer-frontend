const BASE_URL = "https://movies-explorer-api-eta.vercel.app/";

const checkResOk = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    }).then((res) => checkResOk(res));
};

export const editUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
        }),
    }).then((res) => checkResOk(res));
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    }).then((res) => checkResOk(res));
};

export const saveMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country: movie.country || "",
            director: movie.director || "",
            duration: movie.duration || "",
            year: movie.year || "",
            description: movie.description || "",
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink || "",
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU || "",
            nameEN: movie.nameEN || "",
            owner: movie.owner,
        }),
    }).then((res) => checkResOk(res));
};

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    }).then((res) => checkResOk(res));
};

export const register = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    }).then(checkResOk);
};

export const authorization = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(checkResOk);
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(checkResOk);
};
