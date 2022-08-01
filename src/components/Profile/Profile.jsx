import './Profile.css';
import Header from '../Header/Header';

function Profile() {
    return (
        <div className="profile">
            <Header isLoggedIn={true} isMovies={false} isSavedMovies={false} />

            {/* определенные текстовые значения временно, до функциональности */}

            <h2 className="profile__greetings">Привет, Юлия!</h2>
            <form className="profile__form">
                <div className="profile__input-container">
                    <p className="profile__input-placeholder">Имя</p>
                    <input className="profile__input" type="text"></input>
                </div>
                <div className="profile__input-container">
                    <p className="profile__input-placeholder">E-mail</p>
                    <input className="profile__input" type="email"></input>
                </div>
            </form>
            <div className="profile__btn-container">
                <button type="button" className="profile__edit-btn">Редактировать</button>
                <button type="button" className="profile__exit-btn">Выйти из аккаунта</button>
            </div>

        </div>
    )
}

export default Profile;