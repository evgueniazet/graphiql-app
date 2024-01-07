export interface ToolsProps {
  onToggleVariablesEditor: () => void;
  onToggleHeadersEditor: () => void;
  onToggleEditor: () => void;
  isVariablesEditorActive: boolean;
  isHeadersEditorActive: boolean;
  mainText: { variablesButton: string; headersButton: string };
}
