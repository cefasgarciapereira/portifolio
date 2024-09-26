"use client";

import { Fragment } from "react";
import Link from "next/link";

import useTranslation from "@/hooks/useTranslation";
import Experience from "@/components/organisms/Experience";
import Contacts from "@/components/organisms/Contacts";
import Particles from "@/components/organisms/Particles";

import { content, HomeTranslation } from "./translation";
import styles from "./home.module.css";

export default function Home() {
  const text = useTranslation({ content }) as HomeTranslation;

  return (
    <Fragment>
      <main>
        <h1 className={styles.name}>
          {"Cefas Garcia Pereira"}
          <br />
          <span className={styles.role}>{`— ${text.role}`}</span>
        </h1>
        <p className={`${styles.mt2} ${styles.introduction}`}>{text.intro}</p>
        <div className={styles.flex}>
          <a
            className={`${styles.mt2} ${styles.link}`}
            href="mailto:cefasgarciapereira@gmail.com"
          >
            {text.getInTouch}
          </a>
        </div>
      </main>
      <Experience />
      <div>
        <p className={`${styles.mt2} ${styles.conclusion}`}>{text.conclusion1}</p>
        <p className={styles.conclusion}>{text.conclusion2}</p>
      </div>

      <div className={`${styles.mt2} ${styles.available}`}>
        <p>{text.available}</p>
        <Link href="mailto:cefasgarciapereira@gmail.com" className={styles.link}>
          {text.getInTouch}
        </Link>
      </div>
      <Contacts />
    </Fragment>
  );
}
