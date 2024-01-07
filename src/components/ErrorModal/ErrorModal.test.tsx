import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from './ErrorModal';

describe('ErrorModal', () => {
  test('renders error message and closes on button click', () => {
    const errorMessage = 'This is an error message';
    const onCloseMock = jest.fn();

    render(<ErrorModal errorMessage={errorMessage} onClose={onCloseMock} />);

    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();

    expect(errorMessageElement.closest('.error')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);

    expect(errorMessageElement.closest('.error')).not.toBeInTheDocument();
  });
});
