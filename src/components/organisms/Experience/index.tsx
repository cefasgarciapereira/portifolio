import Image from "next/image";
import { Fragment, MutableRefObject, useRef } from "react";
import useTranslation from "@/hooks/useTranslation";

import { experiences } from "./data";
import { content, ExperienceTranslation } from "./translation";

import styles from "./experience.module.css";

export default function Experience() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const text = useTranslation({ content }) as ExperienceTranslation;

  return (
    <Fragment>
      <p className={styles.mt2}>{text.knowMyLastJobs}</p>
      <section className={styles.experiences}>
        {experiences.map((experience, index) => (
          <div className={styles.experience} key={index}>
            <div className={styles.figureContainer}>
              {experience.video ? (
                <video
                  ref={videoRef}
                  width={"100%"}
                  onEnded={() =>
                    (
                      videoRef as unknown as MutableRefObject<HTMLVideoElement>
                    ).current.play()
                  }
                  autoPlay
                  loop
                  muted
                >
                  <source src={experience.video} width={"100%"} type="video/webm" />
                </video>
              ) : (
                <figure>
                  <Image
                    src={`${experience.image}`}
                    alt={experience.company}
                    width={100}
                  />
                </figure>
              )}
            </div>
            <a className={styles.content}>
              <strong>{experience.company}</strong>
              <p>{experience.role}</p>
            </a>
          </div>
        ))}
      </section>
    </Fragment>
  );
}
