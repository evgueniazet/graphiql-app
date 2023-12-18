import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  it('renders a button with text', () => {
    render(<Button type="button" text="Button" />);

    const buttonElement = screen.getByText('Button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders a button with children', () => {
    render(
      <Button type="button">
        <span>Child element</span>
      </Button>
    );

    const childElement = screen.getByText('Child element');
    expect(childElement).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(<Button type="button" className="custom-class" />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button type="button" onClick={onClickMock} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button type="button" disabled />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
