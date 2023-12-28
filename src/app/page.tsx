'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase';
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
        <h1 className={styles.heading}>GraphiQL</h1>
        <Button type="button" text={buttonText} onClick={handleButtonClick} />
      </main>
    </>
  );
}
