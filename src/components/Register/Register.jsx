import React from 'react';

import "./Register.css";
import Input from "../Input/Input";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import Form from "../Form/Form";
import useFormWithValidation from "../../utils/validation.js";

function Register({ onRegister }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [disabled, setDisabled] = React.useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({
            name: values.name,
            email: values.email,
            password: values.password,
        });
        setDisabled(true);
        return !isValid;
    }

    return (
        <Form greetings="Добро пожаловать!" onSubmit={handleSubmit}>
            <Input
                name="name"
                text="Имя"
                type="text"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={values.name || ""}
                error={errors.name}
                disabled={disabled}
            />
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
                title="Зарегистрироваться"
                question="Уже зарегистрированы?"
                link="Войти"
                path="/signin"
                isValid={isValid}
            />
        </Form>
    );
}

export default Register;
