const validatePassword = (
  value: string,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[^\s]{8,}$/.test(
    value
  );

  setPasswordError(
    isValid
      ? ''
      : 'Password must be at least 8 characters, contain one letter, one digit, and one special character.'
  );
  return isValid;
};

export default validatePassword;
