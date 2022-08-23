import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, isMovies, isSavedMovies, isMain }) {
    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            <Navigation
                isLoggedIn={isLoggedIn}
                isMovies={isMovies}
                isSavedMovies={isSavedMovies}
                isMain={isMain}
            />
        </header>
    );
}

export default Header;
