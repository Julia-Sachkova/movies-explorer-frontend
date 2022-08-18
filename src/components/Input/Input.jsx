import "./Input.css";

function Input({
    text,
    onChange,
    error,
    name,
    value,
    type,
    minLength,
    maxLength,
}) {
    return (
        <div className="input__container">
            <p className="input__text">{text}</p>
            <input
                className={`input__item ${error ? "input__item_error" : ""}`}
                name={name}
                type={type}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onChange}
                value={value}
                required
            />
            <span className="input__error">{error}</span>
        </div>
    );
}

export default Input;
