import {
  getTexts,
  getSignInText,
  getSignUpText,
  getFooterText,
  getMainText,
} from './getTexts';
import { Locale } from '../types/Locale';

describe('getTexts function', () => {
  it('should return English texts for "en" locale', () => {
    const result = getTexts('en');
    expect(result).toEqual(
      expect.objectContaining({ signin: expect.any(Object) })
    );
  });

  it('should return Polish texts for "pl" locale', () => {
    const result = getTexts('pl');
    expect(result).toEqual(
      expect.objectContaining({ signin: expect.any(Object) })
    );
  });
});

describe('individual text functions', () => {
  const locales: Locale[] = ['en', 'pl'];

  for (const locale of locales) {
    it(`should return correct sign-in text for ${locale} locale`, () => {
      const result = getSignInText(locale);
      const expected =
        locale === 'en'
          ? {
              button: 'Sign In',
              emailPlaceholder: 'Email Address',
              passwordPlaceholder: 'Password',
              title: 'Sign In',
            }
          : {
              button: 'Zaloguj się',
              emailPlaceholder: 'Adres e-mail',
              passwordPlaceholder: 'Hasło',
              title: 'Zaloguj się',
            };
      expect(result).toEqual(expected);
    });

    it(`should return correct sign-up text for ${locale} locale`, () => {
      const result = getSignUpText(locale);
      const expected =
        locale === 'en'
          ? {
              button: 'Sign Up',
              emailPlaceholder: 'Email Address',
              passwordPlaceholder: 'Password',
              title: 'Sign Up',
            }
          : {
              button: 'Zarejestruj się',
              emailPlaceholder: 'Adres e-mail',
              passwordPlaceholder: 'Hasło',
              title: 'Zarejestruj się',
            };
      expect(result).toEqual(expected);
    });

    it(`should return correct footer text for ${locale} locale`, () => {
      const result = getFooterText(locale);
      const expected =
        locale === 'en' ? { authors: 'Authors' } : { authors: 'Autorzy' };
      expect(result).toEqual(expected);
    });

    it(`should return correct main text for ${locale} locale`, () => {
      const result = getMainText(locale);
      const expected =
        locale === 'en'
          ? { variablesButton: 'Variables', headersButton: 'Headers', doc: 'Documentation' }
          : { variablesButton: 'Zmienne', headersButton: 'Nagłówki', doc: 'Dokumentacja' };
      expect(result).toEqual(expected);
    });
  }
});
