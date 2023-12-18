import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false, null]),
}));

describe('Welcome Component', () => {
  test('renders the welcome screen with correct heading and button text', () => {
    render(<Welcome />);

    const headingElement = screen.getByText('GraphiQL');
    const buttonElement = screen.getByRole('button', { name: 'Sign Up' });

    expect(headingElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Sign Up');
  });
});
