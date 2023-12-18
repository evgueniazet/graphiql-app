import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './page';

console.error = jest.fn();

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
  });

  it('renders an error message when an error occurs', () => {
    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch').mockImplementationOnce(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(/something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};
