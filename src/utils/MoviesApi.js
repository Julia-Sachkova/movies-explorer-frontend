const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export default function getMovies() {
    return fetch(`${BASE_URL}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
}