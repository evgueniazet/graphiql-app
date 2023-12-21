'use client';

import React, { ChangeEvent } from 'react';
import styles from './LanguageSwitcher.module.scss';
import { useLanguage } from '../../../context/LanguageContext';
import { Locale } from '../../../types/Locale';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as Locale;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <select
      className={styles.switcher}
      onChange={handleChangeLanguage}
      value={language}
    >
      <option value="en">En</option>
      <option value="pl">Pl</option>
    </select>
  );
};

export default LanguageSwitcher;
