'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import Button from '../../components/Button';
import styles from './signin.module.scss';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [user, loading] = useAuthState(auth);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    validator: (
      value: string,
      setError: React.Dispatch<React.SetStateAction<string>>
    ) => boolean,
    value: string
  ) => {
    setter(value);
    if (!value.trim()) {
      setter === setPassword
        ? setPasswordError('Password is required')
        : setEmailError('Email is required');
    } else {
      validator(
        value,
        setter === setPassword ? setPasswordError : setEmailError
      );
    }
  };

  const signIn = () => {
    const isEmailValid = validateEmail(email, setEmailError);
    const isPasswordValid = validatePassword(password, setPasswordError);

    if (isEmailValid && isPasswordValid) {
      logInWithEmailAndPassword(email, password);
    } else {
      if (!email.trim()) setEmailError('Email is required');
      if (!password.trim()) setPasswordError('Password is required');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) redirect('/');
  }, [user, loading]);

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.login__container}>
        <div className={styles.input_container}>
          {' '}
          <input
            type="text"
            className={styles.input}
            value={email}
            onChange={(e) =>
              handleChange(setEmail, validateEmail, e.target.value)
            }
            placeholder="E-mail Address"
          />
          {emailError && <span className={styles.error}>{emailError}</span>}
        </div>

        <div className={styles.input_container}>
          {' '}
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) =>
              handleChange(setPassword, validatePassword, e.target.value)
            }
            placeholder="Password"
          />
          {passwordError && (
            <span className={styles.error}>{passwordError}</span>
          )}
        </div>

        <Button type="submit" text="Sign In" onClick={signIn} className={''}></Button>
      </div>
    </div>
  );
};

export default SignIn;
