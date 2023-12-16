import Image from 'next/image';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <h2 className={styles.footer__left_heading}>Authors</h2>
        <ul className={styles.footer__people_links}>
          <li>
            <a
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
            </a>
          </li>
          <li>
            <a
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
            </a>
          </li>
          <li>
            <a
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
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.footer__middle}>
        <p>2023</p>
      </div>
      <div className={styles.footer__right}>
        <a
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
        </a>
      </div>
    </footer>
  );
};

export default Footer;
