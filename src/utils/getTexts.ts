import en from '../localization/en.json';
import pl from '../localization/pl.json';

type Locale = 'en' | 'pl';

export const getTexts = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return en;
    case 'pl':
      return pl;
    default:
      return en;
  }
};

export const getSignInText = (locale: Locale) => getTexts(locale).signin;
export const getSignUpText = (locale: Locale) => getTexts(locale).signup;
export const getWelcomeText = (locale: Locale) => getTexts(locale).welcome;
export const getHeaderText = (locale: Locale) => getTexts(locale).header;
export const getFooterText = (locale: Locale) => getTexts(locale).footer;
export const getMainText = (locale: Locale) => getTexts(locale).main;
