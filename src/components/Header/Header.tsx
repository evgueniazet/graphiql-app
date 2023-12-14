'use client';

import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import LanguageSwitcher from './components';
import Button from '../Button';
import './Header.scss';

const Header = () => {
  const [isSticky, setSticky] = useState(false);

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

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <Link className="header__logo" href="/">
        GraphiQL
      </Link>
      <LanguageSwitcher />
      <Button
        type="button"
        text="Sign Out"
        onClick={() => router.push('/')}
      />
    </header>
  );
};

export default Header;
