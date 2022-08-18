import "./AboutMe.css";
import portfolioFoto from "../../../images/portfolio-foto.jpg";

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__content">
                <img
                    src={portfolioFoto}
                    className="about-me__photo"
                    alt="Фото студента"
                />
                <div className="about-me__information">
                    <h2 className="about-me__name">Юлия</h2>
                    <h3 className="about-me__job">
                        Фронтенд-разработчик, 18 лет
                    </h3>
                    <p className="about-me__life">
                        Я родилась в Обнинске (Калужская область), но сейчас
                        живу в Москве и учусь на втором курсе Государственного
                        Университета Управления. Я люблю котиков, смотреть
                        сериалы и аниме, читать книги и слушать музыку. Сейчас я
                        сдаю дипломную работу на курсе по веб-разработке от
                        Яндекс Практикума и в настоящее время активно ищу работу
                        в этой сфере.
                    </p>
                    <ul className="about-me__social">
                        <li>
                            <a
                                className="about-me__social-link"
                                rel="noreferrer"
                                target="_blank"
                                href="https://github.com/Julia-Rulova"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="about-me__social-link"
                                rel="noreferrer"
                                target="_blank"
                                href="https://vk.com/julik_hulik"
                            >
                                ВКонтакте
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
