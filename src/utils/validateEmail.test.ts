import validateEmail from './validateEmail';

const mockSetEmailError = jest.fn();

describe('validateEmail', () => {
  it('should return true for a valid email', () => {
    const isValid = validateEmail('test@example.com', mockSetEmailError);
    expect(isValid).toBe(true);
    expect(mockSetEmailError).toHaveBeenCalledWith('');
  });

  it('should return false and set an error message for an invalid email', () => {
    const isValid = validateEmail('invalid-email', mockSetEmailError);
    expect(isValid).toBe(false);
    expect(mockSetEmailError).toHaveBeenCalledWith('Invalid email');
  });
});
