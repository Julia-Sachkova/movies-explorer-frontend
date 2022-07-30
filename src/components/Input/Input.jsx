import './Input.css';

function Input({ text }) {
    return (
        <div className="input__container">
            <p className="input__text">{text}</p>
            <input className="input__item" required />
            <span className="input__error" />
        </div>
    )
}

export default Input;