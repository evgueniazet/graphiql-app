import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLanguage, LanguageProvider } from './LanguageContext';
import { Locale } from '../types/Locale';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockContextValue = {
  language: 'en' as Locale,
  setLanguage: jest.fn(),
};

describe('useLanguage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  test('returns language and setLanguage function from context', () => {
    render(
      <LanguageProvider>
        <MockComponent />
      </LanguageProvider>
    );

    const languageElement = screen.getByText(/Current Language:/);
    expect(languageElement).toHaveTextContent('Current Language: en');
  });
});

const MockComponent = () => {
  const { language } = useLanguage();

  return <div>Current Language: {language}</div>;
};
