import { ArrowIcon } from "@/components/atoms/Icons";
import MailButton from "@/components/atoms/MailButton";
import SectionLabel from "@/components/atoms/SectionLabel";
import MusicPlayer from "@/components/organisms/MusicPlayer";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";
import typography from "@/styles/typography.module.css";

import { contactAddress, socials } from "./data";
import { content } from "./translation";
import styles from "./contact.module.css";

interface ContactProps {
  locale: Language;
}

export default function Contact({ locale }: ContactProps) {
  const text = content[locale];

  return (
    <Section id="contato" label={text.label} title={text.title}>
      <div className={styles.grid}>
        <div>
          <p className={`${styles.headline} ${typography.display}`}>{text.headline}</p>
          <MailButton address={contactAddress}>
            {text.mail}
            <ArrowIcon className={styles.mailIcon} />
          </MailButton>
        </div>
        <div>
          <SectionLabel>{text.socials}</SectionLabel>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.name}>
                <a className={styles.social} href={social.link} target="_blank" rel="noopener noreferrer">
                  <span>{social.name}</span>
                  <span className={styles.handle}>{social.handle}</span>
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
          <MusicPlayer locale={locale} />
        </div>
      </div>
    </Section>
  );
}
