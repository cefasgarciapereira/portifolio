import { Fragment } from "react";

import { experiences } from "./data";

export default function Experience() {

    return (
        <Fragment>
            <p className="mt-2">Conheça meus últimos trabalhos: tchais </p>
            <section className="experiences">
                {
                    experiences.map((experience) => (
                        <div
                            className="experience"
                            key={experience.image}
                        >
                            <figure>
                                <img
                                    src={experience.image}
                                    alt={experience.company}
                                    width={"100%"}
                                />
                            </figure>
                            <a className="experience-content">
                                <strong>{experience.company}</strong>
                                <p>{experience.role}</p>
                            </a>
                        </div>
                    ))
                }
            </section>
        </Fragment>
    )
}