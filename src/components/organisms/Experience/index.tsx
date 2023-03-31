import { Fragment, useRef } from "react";

import { experiences } from "./data";

export default function Experience() {
    const videoRef = useRef<any>()

    return (
        <Fragment>
            <p className="mt-2">Conheça meus últimos trabalhos:</p>
            <section className="experiences">
                {
                    experiences.map((experience) => (
                        <div
                            className="experience"
                            key={experience.image}
                        >
                            <div className="experience-figure-container">
                                {
                                    experience.video ?
                                        <video
                                            ref={videoRef}
                                            width={"100%"}
                                            onEnded={() => videoRef.current.play()}
                                            autoPlay
                                            loop
                                            muted
                                        >
                                            <source
                                                src={experience.video}
                                                width={"100%"}
                                                type="video/webm"
                                            />
                                        </video>
                                        :
                                        <figure>
                                            <img
                                                src={experience.image}
                                                alt={experience.company}
                                                width={"100%"}
                                            />
                                        </figure>
                                }
                            </div>
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