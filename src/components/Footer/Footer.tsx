import Image from 'next/image';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <h2 className="footer__left-heading">Authors</h2>
        <ul className="footer__people-links">
          <li>
            <a
              href="https://github.com/evgueniazet"
              className="footer__authors-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className="footer__authors-icon"
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
              className="footer__authors-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className="footer__authors-icon"
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
              className="footer__authors-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons8-github.svg"
                className="footer__authors-icon"
                alt="GitHub Icon"
                width={20}
                height={20}
              />
              Julia Holadava
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__middle">
        <p>2023</p>
      </div>
      <div className="footer__right">
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
