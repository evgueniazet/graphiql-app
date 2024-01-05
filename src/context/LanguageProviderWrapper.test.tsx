import React from 'react';
import { render, screen } from '@testing-library/react';
import LanguageProviderWrapper from './LanguageProviderWrapper';

jest.mock('./LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="language-provider">{children}</div>
  ),
}));

describe('LanguageProviderWrapper', () => {
  test('renders children wrapped with LanguageProvider', () => {
    render(
      <LanguageProviderWrapper>
        <div data-testid="child-component">Child Component</div>
      </LanguageProviderWrapper>
    );

    const languageProvider = screen.getByTestId('language-provider');
    expect(languageProvider).toBeInTheDocument();

    const childComponent = screen.getByTestId('child-component');
    expect(childComponent).toBeInTheDocument();
  });
});
