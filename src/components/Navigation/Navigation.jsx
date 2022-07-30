import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import profile from '../../images/profile-icon.svg';

function Navigation({ isLoggedIn, isMain, isMovies, isSavedMovies }) {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);

    function showMenu() {
        setIsOpenMenu(true);
    }

    function closeMenu() {
        setIsOpenMenu(false);
    }

    return (
        <nav className="navigation">
            {isLoggedIn ?
                <>
                    <div className="navigation__links-films">
                        <Link to="/movies" className={isMovies ? "navigation__link_active navigation__link" : "navigation__link"}>Фильмы</Link>
                        <Link to="/saved-movies" className={isSavedMovies ? "navigation__link_active navigation__link" : "navigation__link"}>Сохраненные фильмы</Link>
                    </div>
                    <Link to="/profile" className="navigation__link-account">Аккаунт <img className="navigation_profile-icon" src={profile} alt="иконка аккаунта." /></Link>
                    <button className="navigation__burger" onClick={showMenu} />
                    <div className={`burger-menu ${isOpenMenu && 'burger-menu_opened'}`}>
                        <div className="burger-menu__container">
                            <button className="burger-menu__close-btn" onClick={closeMenu} />
                            <div className="burger-menu__links">
                                <Link to="/" className={isMain ? "burger-menu__link_active burger-menu__link" : "burger-menu__link"}>Главная</Link>
                                <Link to="/movies" className={isMovies ? "burger-menu__link_active burger-menu__link" : "burger-menu__link"}>Фильмы</Link>
                                <Link to="/saved-movies" className={isSavedMovies ? "burger-menu__link_active burger-menu__link" : "burger-menu__link"}>Сохраненные фильмы</Link>
                            </div>
                            <Link to="/profile" className="burger-menu__link-account">Аккаунт <img className="navigation_profile-icon" src={profile} alt="иконка аккаунта." /></Link>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="navigation__links">
                        <Link to="/signup" className="navigation__link-auth">Регистрация</Link>
                        <Link to="signin" className="navigation__link-auth">Войти</Link>
                    </div>
                </>
            }
        </nav >
    );
}

export default Navigation;