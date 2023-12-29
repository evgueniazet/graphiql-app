'use client';

import React, { Fragment, useState } from 'react';
import styles from './main.module.scss';
import CodeEditor from '../../components/CodeEditor';
import Button from '../../components/Button';
import RequestIcon from '../../icons/requestIcon';
import PrettifyIcon from '../../icons/prettifyIcon';
import prettify from '../../utils/prettify';
import ReactAce from 'react-ace';
import { useEditorContext } from '../../context/EditorContext';
import { useLanguage } from '../../context/LanguageContext';
import { getMainText } from '../../utils/getTexts';
import ToolsSection from './components/ToolsSection/ToolsSection';
import ToolsEditor from './components/ToolsEditor/ToolsEditor';
import AddIcon from '../../components/icons/AddIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';

const MainPage = () => {
  const { editorValue, handleEditorChange } = useEditorContext();
  const { language } = useLanguage();
  const mainText = getMainText(language || 'en');

  const [isVariablesEditor, setVariablesEditor] = useState(false);
  const [isHeadersEditor, setHeadersEditor] = useState(false);

  const [tabs, setTabs] = useState([{ id: 1, title: 'Example' }]);
  const [activeTabId, setActiveTabId] = useState(1);

  const editorRef = React.useRef<ReactAce | null>(null);

  const requestButtonClick = () => {
    console.log('Value from editor:', editorValue);
  };

  const prettifyButtonClick = () => {
    const currentCode = editorRef.current?.editor.getValue();

    if (currentCode) {
      const formattedCode = prettify(currentCode);
      editorRef.current?.editor.setValue(formattedCode);
    }
  };

  const toggleVariablesEditor = () => {
    if (isHeadersEditor) {
      setHeadersEditor(false);
    }
    setVariablesEditor(!isVariablesEditor);
  };

  const toggleHeadersEditor = () => {
    if (isVariablesEditor) {
      setVariablesEditor(false);
    }
    setHeadersEditor(!isHeadersEditor);
  };

  const toggleEditor = () => {
    if (isVariablesEditor || isHeadersEditor) {
      setVariablesEditor(false);
      setHeadersEditor(false);
    }
    if (!isVariablesEditor && !isHeadersEditor) {
      setVariablesEditor(true);
    }
  };

  const addNewTab = () => {
    const newTabId = tabs.length + 1;
    const newTab = { id: newTabId, title: 'NewTab' };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  const removeTab = (tabId: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);

    if (activeTabId === tabId) {
      if (updatedTabs.length > 0) {
        const newActiveTabId = updatedTabs[0].id;
        setActiveTabId(newActiveTabId);
      } else {
        setActiveTabId(1);
      }
    }
  };

  const handleChangeEndpoint = () => {
    console.log('change endpoint');
  };

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>sidebar</div>
      <div className={styles.basic}>
        <div className={styles.basic_wrapper}>
          <div className={styles.basic_tabs}>
            <ul className={styles.tabs_list}>
              {tabs.map((tab) => (
                <li
                  key={`${tab.id}_${Date.now()}`}
                  className={`${styles.tabButton} ${
                    tab.id === activeTabId ? styles.tabButton_active : ''
                  }`}
                >
                  <Button
                    type="button"
                    text={tab.title}
                    className={styles.tabText}
                    onClick={() => setActiveTabId(tab.id)}
                  />
                  <Button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => removeTab(tab.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className={styles.iconButton}
              onClick={addNewTab}
            >
              <AddIcon />
            </Button>
          </div>
          <div className={styles.editor_container}>
            <div className={styles.editors}>
              <div>
                {tabs.map(
                  (tab) =>
                    tab.id === activeTabId && (
                      <Fragment key={tab.id}>
                        <div className={styles.editor_wrapp}>
                          {/* editor-block for ${(tab.title, tab.id)} */}
                          <CodeEditor
                            forwardedRef={editorRef}
                            onEditorChange={handleEditorChange}
                          />
                        </div>
                        <div className={styles.tools_container}>
                          <ToolsSection
                            onToggleVariablesEditor={toggleVariablesEditor}
                            onToggleHeadersEditor={toggleHeadersEditor}
                            onToggleEditor={toggleEditor}
                            isVariablesEditorActive={isVariablesEditor}
                            isHeadersEditorActive={isHeadersEditor}
                            mainText={mainText}
                          />
                          {isVariablesEditor && (
                            <ToolsEditor onChange={() => {}} />
                          )}
                          {isHeadersEditor && (
                            <ToolsEditor onChange={() => {}} />
                          )}
                        </div>
                      </Fragment>
                    )
                )}
              </div>
              <div className={styles.buttons}>
                <Button
                  type="button"
                  className={styles.button}
                  onClick={requestButtonClick}
                >
                  <RequestIcon />
                </Button>
                <Button
                  type="button"
                  onClick={prettifyButtonClick}
                  className={styles.button}
                >
                  <PrettifyIcon />
                </Button>
              </div>
            </div>
            <div className={styles.response_field_wrapper}>
              <div className={styles.endpoint}>
                <input
                  type="text"
                  placeholder="Enter endpoint URL"
                  className={styles.endpoint_input}
                />
                <Button
                  text="Change endpoint"
                  type="button"
                  className={styles.endpoint_button}
                  onClick={handleChangeEndpoint}
                ></Button>
              </div>
              <CodeEditor
                forwardedRef={editorRef}
                onEditorChange={handleEditorChange}
                className={styles.response_editor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
