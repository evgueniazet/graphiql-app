'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '../../components/Button';
import styles from './signin.module.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) redirect('/');
  }, [user, loading]);
  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.login__container}>
        <input
          type="text"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          type="submit"
          text="Sign In"
          onClick={() => logInWithEmailAndPassword(email, password)}
          className={styles.button}
        ></Button>
      </div>
    </div>
  );
};
export default SignIn;
