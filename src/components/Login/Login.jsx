import Input from '../Input/Input';
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import Form from '../Form/Form';

function Login() {
    return (
        <Form greetings="Рады видеть!">
            <Input text="E-mail" type="email" />
            <Input text="Пароль" type="password" minLength="4" maxLength="30" />
            <SubmitBtn title="Войти" question="Ещё не зарегистрированы?" link="Регистрация" path="/signup" />
        </Form>
    )
}

export default Login;