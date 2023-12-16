'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Button from '../components/Button';
import styles from './page.module.scss';

export default function Welcome() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      router.push('/main');
    } else {
      router.push('/signup');
    }
  }

  const buttonText = user ? 'Go to main' : 'Sign Up';

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.heading}>GraphiQL</h1>
        <Button
          type="button"
          text={buttonText}
          onClick={handleButtonClick}
        />
      </main>
    </>
  );
}
