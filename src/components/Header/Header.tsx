'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../auth/firebase'';
import LanguageSwitcher from './components';
import Button from '../Button';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { getHeaderText } from '../../utils/getTexts';
import { useLanguage } from '../../context/LanguageContext';
import ErrorModal from '../ErrorModal';

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathName = usePathname();

  const isOnWelcomePage = pathName === '/';

  const headerText = getHeaderText(language || 'en');

  const handleScroll = () => {
    const offset = window.scrollY;
    setSticky(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      setError('Logout error. Please try again.');
    }
  };

  return (
    <header className={classNames(styles.header, { [styles.sticky]: isSticky })}>
      <Link className={styles.header__logo} href="/">
        GraphiQL
      </Link>
      <LanguageSwitcher />
      <div className={styles.header__button_container}>
        {user ? (
          isOnWelcomePage ? (
            <Button
            type="button"
            text={headerText.buttonMainPage}
            onClick={() => router.push('/main')}
            />
          ) : (
            <Button
            type="button"
            text={headerText.buttonSignOut}
            onClick={handleLogout}
            />
          )
        ) : (
          <>
            <Button
              type="button"
              text={headerText.buttonSignIn}
              onClick={() => router.push('/signin')}
            />
            <Button
              type="button"
              text={headerText.buttonSignUp}
              onClick={() => router.push('/signup')}
            />
          </>
        )}
      </div>
      {error && <ErrorModal errorMessage={error} onClose={() => setError(null)} />}
    </header>
  );
};

export default Header;
