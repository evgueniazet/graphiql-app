'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { auth, logInWithEmailAndPassword } from '../../auth/firebase';
import Button from '../../components/Button';
import styles from './signin.module.scss';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import ErrorModal from '../../components/ErrorModal';
import { getSignInText } from '../../utils/getTexts';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import { User } from '../../types/User';
import { useAuth } from '../../context/AuthContext/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, loading] = useAuthState(auth);
  const { language } = useLanguage();
  const { updateAuthStatus } = useAuth();

  const signInText = getSignInText(language || 'en');

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
      logInWithEmailAndPassword(email, password, setError);
    } else {
      if (!email.trim()) setEmailError('Email is required');
      if (!password.trim()) setPasswordError('Password is required');
    }
  };

  useEffect(() => {
    if (user && 'accessToken' in user) {
      const { accessToken } = user as User;
      localStorage.setItem('accessToken', accessToken);
      updateAuthStatus(accessToken);
      redirect('/main');
    }
  }, [user, loading, updateAuthStatus]);

  return (
    <div className={styles.login} role="loginForm">
      <h1 className={styles.title}>{signInText.title}</h1>
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
            placeholder={signInText.emailPlaceholder}
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
            placeholder={signInText.passwordPlaceholder}
          />
          {passwordError && (
            <span className={styles.error}>{passwordError}</span>
          )}
        </div>

        <Button
          type="submit"
          text={signInText.button}
          onClick={signIn}
        ></Button>
        {error && (
          <ErrorModal errorMessage={error} onClose={() => setError(null)} />
        )}
      </div>
    </div>
  );
};

export default SignIn;
