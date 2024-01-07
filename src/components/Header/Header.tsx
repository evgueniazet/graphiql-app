'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout, auth } from '../../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LanguageSwitcher from './components';
import Button from '../Button';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { getHeaderText } from '../../utils/getTexts';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import ErrorModal from '../ErrorModal';
import HeaderPlaceholder from './components/HeaderPlaceholder';
import { useAuth } from '../../context/AuthContext/AuthContext';
import Loader from '../Loader';

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const { isExp, updateAuthStatus, isLoading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const [user] = useAuthState(auth);

  const isOnWelcomePage = pathName === '/';

  const headerText = getHeaderText(language || 'en');

  const handleScroll = () => {
    const offset = window.scrollY;
    setSticky(offset >= 50);
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
      localStorage.removeItem('accessToken');
      await updateAuthStatus(null);
      router.push('/');
    } catch (error) {
      setError('Logout error. Please try again.');
    }
  };

  useEffect(() => {
    if (isExp) {
      logout();
      localStorage.removeItem('accessToken');
      router.push('/');
    }
  }, [isExp, router]);

  return (
    <>
      <header
        className={classNames(styles.header, { [styles.sticky]: isSticky })}
      >
        {isLoading ? <Loader /> : <></>}
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
        {error && (
          <ErrorModal errorMessage={error} onClose={() => setError(null)} />
        )}
      </header>
      <HeaderPlaceholder isVisible={isSticky} />
    </>
  );
};

export default Header;
