import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SignUp from './page';
import { jest } from '@jest/globals';
import { LanguageProvider } from '../../context/LanguageContext';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('../../auth/firebase', () => ({
  auth: {},
  registerWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../utils/validatePassword', () => jest.fn());
jest.mock('../../utils/validateEmail', () => jest.fn());

jest.mock('../../context/LanguageContext', () => ({
  useLanguage: jest.fn(() => ({ language: 'en' })),
}));

describe('SignUp component', () => {
  it('renders SignUp component correctly', async () => {
    await act(async () => {
      render(
        <LanguageProvider>
          <SignUp />
        </LanguageProvider>
      );
    });

    expect(screen.getByRole('registerForm')).toBeInTheDocument();
  });
});
