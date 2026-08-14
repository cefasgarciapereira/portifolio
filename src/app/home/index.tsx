"use client";

import Link from "next/link";

import useTranslation from "@/hooks/useTranslation";
import useLocale from "@/hooks/useLocale";
import Experience from "@/components/organisms/Experience";
import Contacts from "@/components/organisms/Contacts";
import JsonLd from "@/components/atoms/JsonLd";
import Layout from "@/components/templates/Layout";
import { profilePageSchema } from "@/utils/seo";

import { content, HomeTranslation } from "./translation";
import styles from "./home.module.css";

export default function Home() {
  const locale = useLocale();
  const text = useTranslation({ content }) as HomeTranslation;

  return (
    <Layout locale={locale}>
      <main>
        <JsonLd data={profilePageSchema(locale)} />
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
      </main>
    </Layout>
  );
}
