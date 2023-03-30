import { Fragment } from "react";

import { experiences } from "./data";

export default function Experience() {
    return (
        <Fragment>
            <p className="mt-2">Conheça meus últimos trabalhos: </p>
            <section className="experiences">
                {
                    experiences.map((experience) => (
                        <div className="experience">
                            <img
                                src={experience.image}
                                alt={experience.company}
                                className="experience-cover"
                                width={"100%"}
                            />
                            <div className="experience-content">
                                <strong>{experience.company}</strong>
                                <p>{experience.role}</p>
                            </div>
                        </div>
                    ))
                }
            </section>
        </Fragment>
    )
}