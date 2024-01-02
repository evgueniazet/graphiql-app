'use client';

import React from 'react';
import AceEditor from 'react-ace';
import classNames from 'classnames';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './editor.scss';
import 'ace-builds/src-noconflict/ext-language_tools';
import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  onEditorChange: (value: string) => void;
  className?: string;
  isReadOnly?: boolean;
  value?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onEditorChange,
  className,
  isReadOnly = false,
  value,
}) => {
  const editorClass: string = classNames(styles.codeEditor, className);

  const handleEditorChange = (value: string) => {
    onEditorChange(value);
  };

  return (
    <AceEditor
      value={value}
      mode="javascript"
      theme="monokai"
      highlightActiveLine={false}
      setOptions={{
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        useWorker: false,
        readOnly: isReadOnly,
      }}
      onChange={handleEditorChange}
      className={editorClass}
      
    />
  );
};

export default CodeEditor;
