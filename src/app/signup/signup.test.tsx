import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './page';

describe('SignUp page', () => {
  test('renders the sign up page', async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      render(<SignUp />);
      await waitFor(() => {});
    });

    expect(screen.getByRole('registerForm')).toBeInTheDocument();
  });
});
