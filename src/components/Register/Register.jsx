import './Register.css';
import Input from '../Input/Input';
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import Form from '../Form/Form';

function Register() {
    return (
        <Form greetings="Добро пожаловать!">
            <Input text="Имя" type="text" minLength="2" maxLength="30" />
            <Input text="E-mail" type="email" />
            <Input text="Пароль" type="password" minLength="4" maxLength="30" />
            <SubmitBtn title="Зарегистрироваться" question="Уже зарегистрированы?" link="Войти" path="/signin" />
        </Form>
    )
}

export default Register;