import './SearchForm.css';
import icon from '../../../images/icon-search.svg';

function SearchForm() {
    return (
        <>
            <form className="search">
                <fieldset className="search__field">
                    <img className="search__icon" src={icon} alt="иконка поиска." />
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        type="text"
                    />
                    <button className="search__btn" type="submit">Найти</button>
                    <hr className="search__vertical-line" />
                </fieldset>
                <label className="checkbox">
                    <input type="checkbox" className="checkbox__hide" />
                    <span className="checkbox__slider" />
                    <p className="checkbox__text">Короткометражки</p>
                </label>
            </form>
            <hr className="search__line" />
        </>
    )
}

export default SearchForm;