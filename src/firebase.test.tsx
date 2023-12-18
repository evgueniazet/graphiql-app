import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18next';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './components/Header';
import { logout } from './firebase';

jest.mock('./firebase', () => ({
  ...jest.requireActual('./firebase'),
  logout: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  addDoc: jest.fn(),
  db: {
    ...jest.requireActual('./firebase').db,
    collection: jest.fn(() => ({
      add: jest.fn(),
    })),
  },
}));

describe('Logout and Registration Components', () => {
  test('calls logout function on logout button click', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Sign Out' }));

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});
