import React from 'react';

import Input from "../Input/Input";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import Form from "../Form/Form";
import useFormWithValidation from "../../utils/validation.js";

function Login({ onLogin }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [disabled, setDisabled] = React.useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({
            email: values.email,
            password: values.password,
        });
        setDisabled(true);
    }

    return (
        <Form greetings="Рады видеть!" onSubmit={handleSubmit}>
            <Input
                name="email"
                text="E-mail"
                type="email"
                onChange={handleChange}
                value={values.email || ""}
                error={errors.email}
                disabled={disabled}
            />
            <Input
                name="password"
                text="Пароль"
                type="password"
                minLength="4"
                maxLength="30"
                onChange={handleChange}
                value={values.password || ""}
                error={errors.password}
                disabled={disabled}
            />
            <SubmitBtn
                title="Войти"
                question="Ещё не зарегистрированы?"
                link="Регистрация"
                path="/signup"
                isValid={isValid}
            />
        </Form>
    );
}

export default Login;
