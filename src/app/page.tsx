'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Button from '../components/Button';
import styles from './page.module.scss';
import { getWelcomeText } from '../utils/getTexts';
import { useLanguage } from '../context/LanguageContext';

export default function Welcome() {
  const [user] = useAuthState(auth);
  const router = useRouter();
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

  const handleButtonClick = () => {
    if (user) {
      router.push('/main');
    } else {
      router.push('/signup');
    }
  };

  const buttonText = user
    ? `${welcomeText.mainRoute}`
    : `${welcomeText.signUpRoute}`;

  return (
    <>
      <main className={styles.main}>
        <section className={styles.intro_section}>
          <h1 className={styles.heading1}>Welcome to Our GraphiQL Tool!</h1>
          <div className={styles.description_container}>
            <p className={styles.description}>GraphiQL Playground is a powerful graphical interface for exploring and testing GraphQL queries. Our application offers a unique user experience, combining flexibility and functionality for working with any GraphQL API.</p>
          </div>
        </section>
        <section className={styles.features_section}>
          <div className={styles.heading3_container}>
            <h3 className={styles.heading3}>Key Features</h3>
          </div>
          <div className={styles.features_container}>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Secure Authentication</h4>
              <p className={styles.description_card}>Access to the tool is restricted to authorized users, ensuring data security and confidentiality.</p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Support for Any GraphQL API</h4>
              <p className={styles.description_card}>Our app is compatible with any open GraphQL API that supports CORS. You can also specify your own endpoint for testing.</p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Intuitive Interface</h4>
              <p className={styles.description_card}>Includes a query editor, variables editor, headers editor, as well as a documentation section and server response viewer.</p>
            </div>
          </div>
        </section>
        <section className={styles.school_section}>
          <div className={styles.description_container}>
            <p className={styles.description}>This project was developed as part of the React Course of the RS School, which equipped us with the knowledge and skills to build modern web applications.</p>
          </div>
        </section>
        <section className={styles.features_section}>
          <div className={styles.heading3_container}>
            <h3 className={styles.heading3}>The Development Team</h3>
          </div>
          <div className={styles.features_container}>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Evguenia Zelenko</h4>
              <p className={styles.description_card}>Some information will be added...</p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Alexander Abyzov</h4>
              <p className={styles.description_card}>Some information will be added...</p>
            </div>
            <div className={styles.feature}>
              <h4 className={styles.heading4}>Julia Holadava</h4>
              <p className={styles.description_card}>A graduate of BNTU in Environmental Management and Audit, started her IT career as a UI designer before discovering a passion for coding. She began training at Rolling Scope School in December 2022 and enjoys solving problems that turn ideas into interactive products.</p>
            </div>
          </div>
        </section>
        <Button type="button" text={buttonText} onClick={handleButtonClick} />
      </main>
    </>
  );
}
