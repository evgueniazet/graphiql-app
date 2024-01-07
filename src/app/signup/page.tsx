'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { auth, registerWithEmailAndPassword } from '../../auth/firebase';
import Button from '../../components/Button';
import styles from './signup.module.scss';
import validatePassword from '../../utils/validatePassword';
import validateEmail from '../../utils/validateEmail';
import ErrorModal from '../../components/ErrorModal';
import { getSignUpText } from '../../utils/getTexts';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import { User } from '../../types/User';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, loading] = useAuthState(auth);
  const { language } = useLanguage();

  const signUpText = getSignUpText(language || 'en');

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

  const register = async () => {
    const isEmailValid = validateEmail(email, setEmailError);
    const isPasswordValid = validatePassword(password, setPasswordError);

    if (isEmailValid && isPasswordValid) {
      registerWithEmailAndPassword(email, password, setError);
    } else {
      if (!email.trim()) setEmailError('Email is required');
      if (!password.trim()) setPasswordError('Password is required');
    }
  };

  useEffect(() => {
    if (user && 'accessToken' in user) {
      const { accessToken } = user as User;
      localStorage.setItem('accessToken', accessToken);
      redirect('/main');
    }
  }, [user, loading]);

  return (
    <div className={styles.register} role="registerForm">
      <h1 className={styles.title}>{signUpText.title}</h1>
      <div className={styles.register__container}>
        <div className={styles.input_container}>
          <input
            type="text"
            className={styles.input}
            value={email}
            onChange={(e) =>
              handleChange(setEmail, validateEmail, e.target.value)
            }
            placeholder={signUpText.emailPlaceholder}
          />
          {emailError && <span className={styles.error}>{emailError}</span>}
        </div>

        <div className={styles.input_container}>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) =>
              handleChange(setPassword, validatePassword, e.target.value)
            }
            placeholder={signUpText.passwordPlaceholder}
          />
          {passwordError && (
            <span className={styles.error}>{passwordError}</span>
          )}
        </div>

        <Button
          type="submit"
          text={signUpText.button}
          onClick={register}
        ></Button>
        {error && (
          <ErrorModal errorMessage={error} onClose={() => setError(null)} />
        )}
      </div>
    </div>
  );
};
export default SignUp;
