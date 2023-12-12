'use client';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import Button from '../../components/Button';
import styles from './signup.module.scss';
import validatePassword from '../../utils/validatePassword';
import validateEmail from '../../utils/validateEmail';

const SignUp = () => {
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
    validator(value, setter === setPassword ? setPasswordError : setEmailError);
  };

  const register = () => {
    const isEmailValid = validateEmail(email, setEmailError);
    const isPasswordValid = validatePassword(password, setPasswordError);

    if (isEmailValid && isPasswordValid) {
      registerWithEmailAndPassword(email, password);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) redirect('/');
  }, [user, loading]);
  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.register__container}>
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

        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) =>
            handleChange(setPassword, validatePassword, e.target.value)
          }
          placeholder="Password"
        />
        {passwordError && <span className={styles.error}>{passwordError}</span>}

        <Button
          type="submit"
          text="Sign Up"
          onClick={register}
          className={styles.button}
        ></Button>
      </div>
    </div>
  );
};
export default SignUp;
