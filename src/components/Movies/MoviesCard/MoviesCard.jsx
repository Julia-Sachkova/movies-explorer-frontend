import './MoviesCard.css';
import image from '../../../images/cat2.jpg';

function MoviesCard({ isSavedMovies }) {


    // фиксированные данные карточки указаны временно, до введения функциональности


    return (
        <div className="card">
            <div className="card__about-container">
                <div className="card__text">
                    <h2 className="card__name">Пример карточки</h2>
                    <p className="card__time">1ч 30м</p>
                </div>
                <button type="button" className={`card__save-btn ${isSavedMovies && 'card__save-btn_delete'}`} />
            </div>
            <img className="card__image" src={image} alt="картинка" />
        </div>
    )
}

export default MoviesCard;