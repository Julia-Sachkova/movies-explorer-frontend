import React from "react";

import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../utils/validation.js";

function Profile({ onUpdateUser, onExit }) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm } =
        useFormWithValidation();
    const isInactiveBtn =
        !isValid ||
        (values.name === currentUser.name &&
            values.email === currentUser.email);

    React.useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser(values);
    }

    return (
        <div className="profile">
            <Header isLoggedIn={true} isMovies={false} isSavedMovies={false} />
            <h2 className="profile__greetings">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__input-container">
                    <p className="profile__input-placeholder">Имя</p>
                    <input
                        name="name"
                        className={`profile__input ${
                            errors.name ? "profile__input_error" : ""
                        }`}
                        type="text"
                        value={values.name || ""}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="30"
                    />
                </div>
                <div className="profile__input-container">
                    <p className="profile__input-placeholder">E-mail</p>
                    <input
                        name="email"
                        className={`profile__input ${
                            errors.email ? "profile__input_error" : ""
                        }`}
                        type="email"
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile__btn-container">
                    <button
                        type="submit"
                        className={`profile__edit-btn ${
                            isInactiveBtn ? "profile__edit-btn_error" : ""
                        }`}
                        disabled={isInactiveBtn ? true : false}
                    >
                        Редактировать
                    </button>
                    <button
                        type="button"
                        className="profile__exit-btn"
                        onClick={onExit}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
