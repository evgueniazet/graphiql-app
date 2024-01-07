import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToolsSection from './ToolsSection';
import { ToolsProps } from './interfaces/ToolsProps';

const mockToggleVariablesEditor = jest.fn();
const mockToggleHeadersEditor = jest.fn();
const mockToggleEditor = jest.fn();

const mainText = {
  variablesButton: 'Variables',
  headersButton: 'Headers',
};

const renderComponent = ({
  isVariablesEditorActive,
  isHeadersEditorActive,
}: ToolsProps) => {
  return render(
    <ToolsSection
      onToggleVariablesEditor={mockToggleVariablesEditor}
      onToggleHeadersEditor={mockToggleHeadersEditor}
      onToggleEditor={mockToggleEditor}
      isVariablesEditorActive={isVariablesEditorActive}
      isHeadersEditorActive={isHeadersEditorActive}
      mainText={mainText}
    />
  );
};

describe('ToolsSection component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: false,
      isHeadersEditorActive: false,
      mainText: mainText,
    });

    expect(getByText('Variables')).toBeInTheDocument();
    expect(getByText('Headers')).toBeInTheDocument();
  });

  it('calls onToggleVariablesEditor when Variables button is clicked', () => {
    const { getByText } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: false,
      isHeadersEditorActive: false,
      mainText: mainText,
    });

    fireEvent.click(getByText('Variables'));

    expect(mockToggleVariablesEditor).toHaveBeenCalled();
  });

  it('calls onToggleHeadersEditor when Headers button is clicked', () => {
    const { getByText } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: false,
      isHeadersEditorActive: false,
      mainText: mainText,
    });

    fireEvent.click(getByText('Headers'));

    expect(mockToggleHeadersEditor).toHaveBeenCalled();
  });

  it('calls onToggleEditor when ChevronUpIcon button is clicked', () => {
    const { getByTestId } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: false,
      isHeadersEditorActive: false,
      mainText: mainText,
    });

    fireEvent.click(getByTestId('chevron-up-icon'));

    expect(mockToggleEditor).toHaveBeenCalled();
  });

  it('applies the correct styles when isVariablesEditorActive is true', () => {
    const { container } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: true,
      isHeadersEditorActive: false,
      mainText: mainText,
    });

    expect(container.querySelector('.chevronIconReversed')).toBeTruthy();
  });

  it('applies the correct styles when isHeadersEditorActive is true', () => {
    const { container } = renderComponent({
      onToggleVariablesEditor: jest.fn(),
      onToggleHeadersEditor: jest.fn(),
      onToggleEditor: jest.fn(),
      isVariablesEditorActive: false,
      isHeadersEditorActive: true,
      mainText: mainText,
    });

    expect(container.querySelector('.chevronIconReversed')).toBeTruthy();
  });
});
