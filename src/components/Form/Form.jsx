import './Form.css';
import { Link } from 'react-router-dom';

function Form({ greetings, onSubmit, children }) {
    return (
        <div className="auth">
            <div className="auth__container">
                <Link to="/" className="auth__logo" />
                <h2 className="auth__greetings">{greetings}</h2>
                <form className="auth__form" onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    )
}

export default Form;