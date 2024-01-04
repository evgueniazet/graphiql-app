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
import makeRequest from '../../utils/makeRequest';
import DocIcon from '../../components/icons/DocIcon';
import DocSection from './components/DocSection/DocSection';

const MainPage = () => {
  const [isVariablesEditor, setVariablesEditor] = useState(false);
  const [isHeadersEditor, setHeadersEditor] = useState(false);
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabs, setTabs] = useState([{ id: 1, title: 'Example' }]);
  const [endpoint, setEndpoint] = useState('');
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isSDLFetched, setIsSDLFetched] = useState(false);
  const [schemaData, setSchemaData] = useState(null);

  const editorRef = React.useRef<ReactAce | null>(null);

  const { editorValue, handleEditorChange } = useEditorContext();
  const { language } = useLanguage();
  const mainText = getMainText(language || 'en');

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

  const handleChangeEndpoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleChangeEndpointClick = () => {
    // makeRequest(endpoint);
  };

  async function fetchSDL() {
    try {
      const query = `
        query IntrospectionQuery {
          __schema {
            types {
              name
              kind
              fields {
                name
                type {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ...moreNestedTypes
                    }
                  }
                }
              }
            }
          }
        }

        fragment moreNestedTypes on __Type {
          fields {
            name
            type {
              kind
              name
              ofType {
                kind
                name
                ...on __Type {
                  fields {
                    name
                    type {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await makeRequest(endpoint, query, {}, {});
      if (response.data) {
        setSchemaData(response.data);
        setIsSDLFetched(true);
        return response.data;
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Error fetching SDL:', error);
      setIsSDLFetched(false);
      throw error;
    }
  }

  const docButtonClick = async () => {
    if (!isSDLFetched) {
      try {
        await fetchSDL();
      } catch (error) {
        console.error('Failed to fetch SDL:', error);
        return;
      }
    }
    setIsDocOpen(!isDocOpen);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_wrapper_out}>
        {isDocOpen && isSDLFetched && schemaData && (
          <div className={`${styles.docSection} ${styles.docSectionOpened}`}>
            <DocSection schemaData={schemaData} />
          </div>
        )}
        <div className={styles.main_wrapper}>
          <div className={styles.control_panel}>
            <Button
              type="button"
              className={`${styles.iconButton} ${styles.docButton}`}
              onClick={docButtonClick}
            >
              <DocIcon />
            </Button>
            <div className={styles.tabs_container}>
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
            <div className={styles.endpoint}>
              <input
                type="text"
                placeholder="Enter endpoint URL"
                className={styles.endpoint_input}
                value={endpoint}
                onChange={handleChangeEndpoint}
              />
              <Button
                text="Change endpoint"
                type="button"
                className={styles.endpoint_button}
                onClick={handleChangeEndpointClick}
              ></Button>
            </div>
          </div>
          <div className={styles.editors_container}>
            <div className={styles.editors_field_wrapper}>
              <div className={styles.editors_field}>
                {tabs.map(
                  (tab) =>
                    tab.id === activeTabId && (
                      <Fragment key={tab.id}>
                        <div className={styles.request_editor_wrapper}>
                          <CodeEditor
                            forwardedRef={editorRef}
                            onEditorChange={handleEditorChange}
                          />
                        </div>
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
