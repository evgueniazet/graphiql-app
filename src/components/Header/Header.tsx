'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { logout } from '../../firebase';
import LanguageSwitcher from './components';
import Button from '../Button';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { getHeaderText } from '../../utils/getTexts';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const { language } = useLanguage();

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

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={classNames(styles.header, { [styles.sticky]: isSticky })}
    >
      {/* <Link className={styles.header__logo} href="/">
        GraphiQL
      </Link> */}
      <div className={styles.header__logo}>GraphiQL</div>
      <LanguageSwitcher />
      <Button type="button" text={headerText.button} onClick={handleLogout} />
    </header>
  );
};

export default Header;
