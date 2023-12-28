'use client';

import Image from 'next/image';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { getFooterText } from '../../utils/getTexts';

const Footer = () => {
  const { language } = useLanguage();
  const footerText = getFooterText(language || 'en');

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <h2 className={styles.footer__left_heading}>{footerText.authors}</h2>
        <ul className={styles.footer__people_links}>
          <li>
            <Link
              href="https://github.com/evgueniazet"
              className={styles.footer__authors_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className={styles.footer__authors_icon}
                alt="GitHub Icon"
                width={20}
                height={20}
              />
              Evguenia Zelenko
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/sardn"
              className={styles.footer__authors_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className={styles.footer__authors_icon}
                alt="GitHub Icon"
                width={20}
                height={20}
              />
              Alexander Abyzov
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/juliaholadava"
              className={styles.footer__authors_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className={styles.footer__authors_icon}
                alt="GitHub Icon"
                width={20}
                height={20}
              />
              Julia Holadava
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer__middle}>
        <p>2023</p>
      </div>
      <div className={styles.footer__right}>
        <Link
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/rs_school_js.svg"
            alt="Course Logo"
            width={120}
            height={40}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
