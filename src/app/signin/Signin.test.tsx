import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SignIn from './page';
import { jest } from '@jest/globals';
import { LanguageProvider } from '../../context/LanguageContext';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  auth: { currentUser: null },
}));

jest.mock('../../auth/firebase', () => ({
  auth: {
    currentUser: null,
  },
  logInWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../utils/validatePassword', () => jest.fn());
jest.mock('../../utils/validateEmail', () => jest.fn());

jest.mock('../../context/LanguageContext', () => ({
  useLanguage: jest.fn(() => ({ language: 'en' })),
}));

describe('SignIn component', () => {
  it('renders SignIn component correctly', async () => {
    await act(async () => {
      render(
        <LanguageProvider>
          <SignIn />
        </LanguageProvider>
      );
    });

    expect(screen.getByRole('loginForm')).toBeInTheDocument();
  });
});
