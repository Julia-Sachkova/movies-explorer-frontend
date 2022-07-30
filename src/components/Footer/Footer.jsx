import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__author">
                <p className="footer__year">© 2022</p>
                <div className="footer__links">
                    <a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
                    <a className="footer__link" rel="noreferrer" target="_blank" href="https://github.com/Julia-Rulova">Github</a>
                    <a className="footer__link" rel="noreferrer" target="_blank" href="https://vk.com/julik_hulik">ВКонтакте</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;