'use client';

import styles from './page.module.scss';
import { getWelcomeText } from '../utils/getTexts';
import { useLanguage } from '../context/LanguageContext';

export default function Welcome() {
  const { language } = useLanguage();

  const defaultLanguage = 'en';
  const welcomeText = getWelcomeText(language || 'en');

  const isClient = typeof window !== 'undefined';

  let languageFromStorage;

  if (isClient) {
    languageFromStorage = localStorage.getItem('language');

    if (!languageFromStorage) {
      localStorage.setItem('language', defaultLanguage);
    }
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.intro_section}>
          <h1 className={styles.heading1}>{welcomeText.heading1}</h1>
          <div className={styles.description_container}>
            <p className={styles.description}>
              {welcomeText.descriptionProject}
            </p>
          </div>
        </section>
        <section className={styles.features_section}>
          <div className={styles.heading3_container}>
            <h3 className={styles.heading3}>{welcomeText.headingFeatures}</h3>
          </div>
          <div className={styles.features_container}>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>{welcomeText.secureAuth}</h4>
              <p className={styles.description_card}>
                {welcomeText.firstFeat}
              </p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>{welcomeText.supportAnyApi}</h4>
              <p className={styles.description_card}>
                {welcomeText.secondFeat}
              </p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>{welcomeText.interface}</h4>
              <p className={styles.description_card}>
                {welcomeText.thirdFeat}
              </p>
            </div>
          </div>
        </section>
        <section className={styles.school_section}>
          <div className={styles.description_container}>
            <p className={styles.description}>
              {welcomeText.descriptionCourse}
            </p>
          </div>
        </section>
        <section className={styles.features_section}>
          <div className={styles.heading3_container}>
            <h3 className={styles.heading3}>{welcomeText.headingTeam}</h3>
          </div>
          <div className={styles.features_container}>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Evguenia Zelenko</h4>
              <p className={styles.description_card}>
                {welcomeText.aboutEvgenia}
              </p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Julia Holadava</h4>
              <p className={styles.description_card}>
                {welcomeText.aboutJulia}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
