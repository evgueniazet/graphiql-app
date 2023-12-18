import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './page';

describe('SignIn page', () => {
  test('renders the sign in page', async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      render(<SignIn />);
      await waitFor(() => {});
    });

    expect(screen.getByRole('loginForm')).toBeInTheDocument();
  });
});
