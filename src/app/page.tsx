'use client';

import Button from '../components/Button';
import { logout } from '../firebase';
import Link from 'next/link';
import styles from '../styles/page.module.scss'
import Footer from '../components/Footer/page';
import ErrorBoundary from '../components/ErrorBoundary/page';

export default function Home() {
  const handleLogout = () => {
    logout();
  };

  return (
    <ErrorBoundary>
      <div className={styles.welcome}>
        <h1>Welcome Page</h1>
        <Link href='/main'>link to main page</Link>
        <Button type="button" text="Log Out" onClick={handleLogout} className={''}></Button>
        <Footer />
      </div>
    </ErrorBoundary>

  );
}
