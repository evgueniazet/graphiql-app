'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextProps {
  children: ReactNode;
}

interface EditorContextValue {
  editorValue: string;
  handleEditorChange: (value: string) => void;
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined);

export const EditorProvider: React.FC<EditorContextProps> = ({ children }) => {
  const [editorValue, setEditorValue] = useState("");

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const contextValue: EditorContextValue = {
    editorValue,
    handleEditorChange,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = (): EditorContextValue => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
