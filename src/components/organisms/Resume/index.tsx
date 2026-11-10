import Barcode, { BARCODE_TRIGGER } from "@/components/atoms/Barcode";
import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Chips from "@/components/atoms/Chips";
import SectionLabel from "@/components/atoms/SectionLabel";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";
import typography from "@/styles/typography.module.css";

import { resumeFiles, stack } from "./data";
import { content } from "./translation";
import styles from "./resume.module.css";

interface ResumeProps {
  locale: Language;
}

export default function Resume({ locale }: ResumeProps) {
  const text = content[locale];
  const file = resumeFiles[locale];
  const otherFile = resumeFiles[locale === "pt" ? "en" : "pt"];

  return (
    <Section id="cv" label={text.label} title={text.title}>
      <div className={styles.grid}>
        <Box className={styles.card}>
          <SectionLabel>{text.stackLabel}</SectionLabel>
          <h3 className={`${styles.title} ${typography.display}`}>{text.stackTitle}</h3>
          <Chips items={stack} />
        </Box>

        <Box className={styles.card}>
          <SectionLabel>{text.educationLabel}</SectionLabel>
          <h3 className={`${styles.title} ${typography.display}`}>{text.educationTitle}</h3>
          <ul className={styles.education}>
            {text.education.map((item) => (
              <li key={item.degree}>
                <b>{item.degree}</b>
                <span>{item.institution}</span>
              </li>
            ))}
          </ul>
        </Box>

        <Box className={`${styles.card} ${styles.download} ${BARCODE_TRIGGER}`}>
          <SectionLabel className={styles.downloadLabel}>{text.downloadLabel}</SectionLabel>
          <h3 className={`${styles.title} ${typography.display}`}>{text.downloadTitle}</h3>
          <span className={styles.file}>{file.path.slice(1)}</span>
          <Barcode className={styles.barcode} />
          <Button href={file.path} hrefLang={file.hrefLang} type="application/pdf" download className={styles.downloadButton}>
            {text.download} ↓
          </Button>
          <a className={styles.otherVersion} href={otherFile.path} hrefLang={otherFile.hrefLang} type="application/pdf" download>
            {text.otherVersion} ↓
          </a>
        </Box>
      </div>
    </Section>
  );
}
