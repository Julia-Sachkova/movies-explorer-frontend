import "./SubmitBtn.css";
import { Link } from "react-router-dom";

function SubmitBtn({ title, question, link, path, isValid }) {
    return (
        <>
            <button
                type="submit"
                className={`submit-btn ${!isValid && "submit-btn_inactive"}`}
                disabled={isValid ? false : true}
            >
                {title}
            </button>
            <div className="submit-btn__link-container">
                <p className="submit-btn__login-link" to="/signin">
                    {question}
                </p>
                <Link to={path} className="submit-btn__login">
                    {link}
                </Link>
            </div>
        </>
    );
}

export default SubmitBtn;
