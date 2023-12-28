import React from 'react';
import styles from './ToolsEditor.module.scss';

interface EditorProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor: React.FC<EditorProps> = ({ onChange }) => {
  return (
    <div className={styles.editor}>
      <input
        type="text"
        className={styles.editor_input}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
