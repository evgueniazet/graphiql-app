import React, { ReactNode } from 'react';
import { LanguageProvider } from './LanguageContext';

interface LanguageProviderWrapperProps {
  children: ReactNode;
}

const LanguageProviderWrapper: React.FC<LanguageProviderWrapperProps> = ({
  children,
}) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default LanguageProviderWrapper;
