'use client';

import React, { useState } from 'react';
import styles from './main.module.scss';
import { useLanguage } from '../../context/LanguageContext';
import { getMainText } from '../../utils/getTexts';
import ToolsSection from './components/ToolsSection/ToolsSection';
import ToolsEditor from './components/ToolsEditor/ToolsEditor';
import AddIcon from '../../components/icons/AddIcon';
import Button from '../../components/Button';
import DeleteIcon from '../../components/icons/DeleteIcon';

const MainPage = () => {
  const { language } = useLanguage();
  const mainText = getMainText(language || 'en');

  const [isVariablesEditor, setVariablesEditor] = useState(false);
  const [isHeadersEditor, setHeadersEditor] = useState(false);

  const [tabs, setTabs] = useState([{ id: 1, title: 'Example' }]);
  const [activeTabId, setActiveTabId] = useState(1);

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
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
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

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>sidebar</div>
      <div className={styles.basic}>
        <div className={styles.basic_wrapper}>
          <div className={styles.basic_tabs}>
            <ul className={styles.tabs_list}>
              {tabs.map((tab) => (
                <li key={tab.id} className={`${styles.tabButton} ${
                  tab.id === activeTabId ? styles.tabButton_active : ''
                }`}>
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
              {tabs.map(
                (tab) =>
                  tab.id === activeTabId && (
                    <>
                      <div className={styles.editor_wrapp}>
                        editor-block for ${(tab.title, tab.id)}
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
                        {isHeadersEditor && <ToolsEditor onChange={() => {}} />}
                      </div>
                    </>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
