import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__link-container" rel="noreferrer" target="_blank" href="https://github.com/Julia-Rulova/how-to-learn">
                    <p className="portfolio__link">Статичный сайт</p>
                    <p className="portfolio__link-arrow">↗</p>
                </li>
                <li className="portfolio__link-container" rel="noreferrer" target="_blank" href="https://github.com/Julia-Rulova/russian-travel">
                    <p className="portfolio__link">Адаптивный сайт</p>
                    <p className="portfolio__link-arrow">↗</p>
                </li>
                <li className="portfolio__link-container" rel="noreferrer" target="_blank" href="https://mesto.julia.practicum.nomoredomains.xyz/">
                    <p className="portfolio__link">Одностраничное приложение</p>
                    <p className="portfolio__link-arrow">↗</p>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;