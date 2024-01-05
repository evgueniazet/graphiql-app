import React from 'react';
import Button from '../../../../components/Button';
import ChevronUpIcon from '../../../../components/icons/ChevronUpIcon';
import styles from './ToolsSection.module.scss';

export interface ToolsProps {
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
  mainText,
}) => {
  const chevronIconClass =
    isVariablesEditorActive || isHeadersEditorActive
      ? styles.chevronIconReversed
      : styles.chevronIcon;

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
        className={`${styles.iconButton} ${chevronIconClass}`}
        onClick={onToggleEditor}
      >
        <ChevronUpIcon />
      </Button>
    </div>
  );
};

export default ToolsSection;
