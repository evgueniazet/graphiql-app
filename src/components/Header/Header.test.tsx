import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from '../../utils/i18next';
import { I18nextProvider } from 'react-i18next';
import Header from './Header';
import { logout } from '../../firebase';

jest.mock('../../firebase', () => ({
  ...jest.requireActual('../../firebase'),
  logout: jest.fn(),
}));

describe('Header Component', () => {
  test('renders the header with logo and sign-out button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    const logoElement = screen.getByText('GraphiQL');
    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });

    expect(logoElement).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  test('applies the sticky class when scrolled', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');

    fireEvent.scroll(window, { target: { scrollY: 60 } });

    expect(headerElement).toHaveClass('sticky');

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    expect(headerElement).not.toHaveClass('sticky');
  });

  test('calls the logout function when sign-out button is clicked', () => {
    render(<Header />);

    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });
    fireEvent.click(signOutButton);

    expect(logout).toHaveBeenCalled();
  });
});
