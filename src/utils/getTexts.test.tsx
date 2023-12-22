import { getTexts } from './getTexts';

describe('getTexts function', () => {
  it('returns English texts for "en" locale', () => {
    const result = getTexts('en');
    expect(result).toEqual({
      signin: {
        title: 'Sign In',
        emailPlaceholder: 'Email Address',
        passwordPlaceholder: 'Password',
        button: 'Sign In',
      },
      signup: {
        title: 'Sign Up',
        emailPlaceholder: 'Email Address',
        passwordPlaceholder: 'Password',
        button: 'Sign Up',
      },
      welcome: {
        mainRoute: 'Go to main',
        signUpRoute: 'Sign Up',
      },
      header: {
        button: 'Sign Out',
      },
    });
  });

  it('returns Polish texts for "pl" locale', () => {
    const result = getTexts('pl');
    expect(result).toEqual({
      signin: {
        title: 'Zaloguj się',
        emailPlaceholder: 'Adres e-mail',
        passwordPlaceholder: 'Hasło',
        button: 'Zaloguj się',
      },
      signup: {
        title: 'Zarejestruj się',
        emailPlaceholder: 'Adres e-mail',
        passwordPlaceholder: 'Hasło',
        button: 'Zarejestruj się',
      },
      welcome: {
        mainRoute: 'Przejdź do strony głównej',
        signUpRoute: 'Zarejestruj się',
      },
      header: {
        button: 'Wyloguj się',
      },
    });
  });
});
