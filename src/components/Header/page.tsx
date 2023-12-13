import Link from 'next/link';
import React from 'react'
import styles from './Header.module.scss'
const Header = () => {
    return (
        <header className={styles.header}>
            <Link href='/'>link to Welcome page</Link>
            <button>switch the language</button>
            <button>signs user out</button>
        </header>
    );
};

export default Header;