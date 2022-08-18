import React from "react";

import "./SearchForm.css";
import icon from "../../../images/icon-search.svg";

function SearchForm({
    isSaved,
    searchMovie,
    searchSavedMovie,
    onCheck,
    isCheckboxChecked,
}) {
    const [inputValue, setInputValue] = React.useState(localStorage.getItem("value") || '');
    const [inputValueSaved, setInputValueSaved] = React.useState('');

    function handleChangeInput(evt) {
        setInputValue(evt.target.value);
    }

    function handleChangeInputSaved(evt) {
        setInputValueSaved(evt.target.value);
    }


    function handleSearch(evt) {
        evt.preventDefault();
        searchMovie(inputValue);
        localStorage.setItem("value", inputValue);
    }

    function handleSearchSaved(evt) {
        evt.preventDefault();
        searchSavedMovie(inputValueSaved);
    }

    return (
        <>
            <form
                className="search"
                onSubmit={isSaved ? handleSearchSaved : handleSearch}
            >
                <fieldset className="search__field">
                    <img
                        className="search__icon"
                        src={icon}
                        alt="иконка поиска."
                    />
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        type="text"
                        required
                        value={isSaved ? inputValueSaved : inputValue}
                        onChange={isSaved ? handleChangeInputSaved : handleChangeInput}
                    />
                    <button className="search__btn" type="submit">
                        Найти
                    </button>
                    <hr className="search__vertical-line" />
                </fieldset>
                <label className="checkbox">
                    <input
                        type="checkbox"
                        className="checkbox__hide"
                        checked={isCheckboxChecked || false}
                        onChange={onCheck}
                    />
                    <span className="checkbox__slider" />
                    <p className="checkbox__text">Короткометражки</p>
                </label>
            </form>
            <hr className="search__line" />
        </>
    );
}

export default SearchForm;
