import GlitchText, { GLITCH_TRIGGER } from "@/components/atoms/GlitchText";
import HalftoneImage from "@/components/atoms/HalftoneImage";
import { ArrowIcon } from "@/components/atoms/Icons";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";

import { experiences } from "./data";
import { content } from "./translation";
import styles from "./experience.module.css";

function hostname(link: string) {
  return new URL(link).hostname.replace(/^www\./, "");
}

interface ExperienceProps {
  locale: Language;
}

export default function Experience({ locale }: ExperienceProps) {
  const text = content[locale];

  return (
    <Section id="xp" label={text.label} title={text.title}>
      <div className={styles.list}>
        {experiences.map((experience) => (
          <article key={experience.company} className={`${styles.row} ${GLITCH_TRIGGER}`}>
            <HalftoneImage src={experience.logo} label={`${text.logoAlt} ${experience.company}`} className={styles.logo} />
            <div className={styles.main}>
              <span className={styles.company}>{experience.company}</span>
              <GlitchText as="h3" text={experience.role} className={styles.role} />
            </div>
            <a className={styles.link} href={experience.link} target="_blank" rel="noopener noreferrer">
              {hostname(experience.link)}
              <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
