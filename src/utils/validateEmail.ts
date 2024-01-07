const validateEmail = (
  value: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  const isValid = /\S+@\S+\.\S+/.test(value);
  setEmailError(isValid ? '' : 'Invalid email');
  return isValid;
};

export default validateEmail;
