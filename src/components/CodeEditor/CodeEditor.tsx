'use client';

import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import classNames from 'classnames';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './editor.scss';
import 'ace-builds/src-noconflict/ext-language_tools';
import prettify from '../../utils/prettify';
import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  onEditorChange: (value: string) => void;
  forwardedRef: React.RefObject<AceEditor> | null;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onEditorChange,
  forwardedRef,
  className,
}) => {
  const instructions =
    'Prettify query: Alt - Shift - F (or press the prettify button)';

  const [editorValue, setEditorValue] = useState(instructions);

  const editorClass: string = classNames(styles.codeEditor, className);

  useEffect(() => {
    const handleAltShiftF = (e: KeyboardEvent) => {
      const isAceEditorFocused =
        document.activeElement?.classList.contains('ace_text-input') || false;

      if (e.altKey && e.shiftKey && e.key === 'F' && isAceEditorFocused) {
        const newCode = prettify(editorValue);
        if (forwardedRef && forwardedRef.current) {
          forwardedRef.current.editor.setValue(newCode);
        }
      }
    };

    document.addEventListener('keydown', handleAltShiftF);

    return () => {
      document.removeEventListener('keydown', handleAltShiftF);
    };
  }, [editorValue, forwardedRef]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    onEditorChange(value);
  };

  return (
    <AceEditor
      ref={forwardedRef}
      value={editorValue}
      mode="javascript"
      theme="monokai"
      highlightActiveLine={false}
      setOptions={{
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        useWorker: false,
      }}
      onChange={handleEditorChange}
      className={editorClass}
    />
  );
};

export default CodeEditor;
