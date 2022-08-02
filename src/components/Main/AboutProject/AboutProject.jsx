import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__stages">
                <div className="about-project__text">
                    <h3 className="about-project__text-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__text">
                    <h3 className="about-project__text-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__weeks">
                <div className="about-project__one-week">1 неделя</div>
                <div className="about-project__four-week">4 недели</div>
            </div>
            <div className="about-project__front-back">
                <p className="about-project__back">Back-end</p>
                <p className="about-project__front">Front-end</p>
            </div>
        </section >
    )
}

export default AboutProject;