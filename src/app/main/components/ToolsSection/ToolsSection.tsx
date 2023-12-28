import React from 'react';
import Button from '../../../../components/Button';
import ChevronUpIcon from '../../../../components/icons/ChevronUpIcon';
import styles from './ToolsSection.module.scss';

interface ToolsProps {
  onToggleVariablesEditor: () => void;
  onToggleHeadersEditor: () => void;
  onToggleEditor: () => void;
  isVariablesEditorActive: boolean;
  isHeadersEditorActive: boolean;
  mainText: { variablesButton: string; headersButton: string };
}

const ToolsSection: React.FC<ToolsProps> = ({
  onToggleVariablesEditor,
  onToggleHeadersEditor,
  onToggleEditor,
  isVariablesEditorActive,
  isHeadersEditorActive,
  mainText
}) => {
  return (
    <div className={styles.tools}>
      <div className={styles.tools_button_container}>
        <Button
          type="button"
          className={styles.textButton}
          text={mainText.variablesButton}
          onClick={onToggleVariablesEditor}
          isActive={isVariablesEditorActive}
        />
        <Button
          type="button"
          className={styles.textButton}
          text={mainText.headersButton}
          onClick={onToggleHeadersEditor}
          isActive={isHeadersEditorActive}
        />
      </div>
      <Button
        type="button"
        className={styles.iconButton}
        onClick={onToggleEditor}
      >
        <ChevronUpIcon />
      </Button>
    </div>
  );
}

export default ToolsSection;
