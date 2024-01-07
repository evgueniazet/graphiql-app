import validatePassword from './validatePassword';

const mockSetPasswordError = jest.fn();

describe('validatePassword', () => {
  it('should return true for a valid password', () => {
    const isValid = validatePassword('Test123@', mockSetPasswordError);
    expect(isValid).toBe(true);
    expect(mockSetPasswordError).toHaveBeenCalledWith('');
  });

  it('should return false and set an error message for an invalid password', () => {
    const isValid = validatePassword('invalid', mockSetPasswordError);
    expect(isValid).toBe(false);
    expect(mockSetPasswordError).toHaveBeenCalledWith(
      'Password must be at least 8 characters, contain one letter, one digit, and one special character.'
    );
  });
});
