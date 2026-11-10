import FactList from "@/components/atoms/FactList";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";

import { content } from "./translation";
import styles from "./profile.module.css";

interface ProfileProps {
  locale: Language;
}

export default function Profile({ locale }: ProfileProps) {
  const text = content[locale];

  return (
    <Section id="perfil" label={text.label} title={text.title} withCursor>
      <div className={styles.grid}>
        <div className={styles.prose}>
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <FactList facts={text.facts} />
      </div>
    </Section>
  );
}
