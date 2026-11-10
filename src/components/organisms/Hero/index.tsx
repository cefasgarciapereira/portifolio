import Barcode, { BARCODE_TRIGGER } from "@/components/atoms/Barcode";
import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import GlitchText from "@/components/atoms/GlitchText";
import { AsteriskIcon } from "@/components/atoms/Icons";
import Logo from "@/components/atoms/Logo";
import PixelHand from "@/components/atoms/PixelHand";
import RetroComputer from "@/components/atoms/RetroComputer";
import { Language } from "@/contexts/language";
import typography from "@/styles/typography.module.css";

import { content } from "./translation";
import styles from "./hero.module.css";

const ASTERISK_COUNT = 4;

interface HeroProps {
  locale: Language;
}

export default function Hero({ locale }: HeroProps) {
  const text = content[locale];

  return (
    <Container>
      <section className={styles.hero} aria-label={text.label}>
        <Box className={styles.art}>
          <span className={`${styles.kicker} ${typography.mono}`}>~/root · v{new Date().getFullYear()}</span>
          <RetroComputer />
        </Box>

        <div className={styles.column}>
          <Box className={styles.headline}>
            <GlitchText as="h1" text={text.role} className={styles.title} />
            <a className={styles.hand} href="#projetos" aria-label={text.handAria}>
              <PixelHand />
            </a>
          </Box>

          <div className={styles.pill}>
            <p className={`${styles.name} ${typography.display}`}>{text.tagline}</p>
            <span className={styles.stars} aria-hidden="true">
              {Array.from({ length: ASTERISK_COUNT }, (_, index) => (
                <AsteriskIcon key={index} />
              ))}
            </span>
          </div>

          <Box as="p" className={styles.description}>
            {text.description}
            <svg className={styles.scribble} viewBox="0 0 150 14" aria-hidden="true">
              <path d="M2 5 C40 3 90 4 148 5 M10 10 C50 8 100 9 140 10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </Box>

          <span className={`${styles.typing} ${typography.mono}`}>{text.stack}</span>

          <div className={styles.actions}>
            <Button href="#projetos" variant="primary">
              {text.seeProjects}
            </Button>
            <Button href="#contato">{text.getInTouch}</Button>
          </div>

          <div className={styles.signature}>
            <Barcode className={BARCODE_TRIGGER} />
            <Logo label={text.logoAria} className={styles.monogram} />
          </div>
        </div>
      </section>
    </Container>
  );
}
