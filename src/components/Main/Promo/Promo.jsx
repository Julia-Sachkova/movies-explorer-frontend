import './Promo.css';
import Header from '../../Header/Header';

function Promo({ isLoggedIn }) {
    return (
        <section className="promo">
            <Header isLoggedIn={isLoggedIn} isMovies={false} isSavedMovies={false} />
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </section>
    )
}

export default Promo;