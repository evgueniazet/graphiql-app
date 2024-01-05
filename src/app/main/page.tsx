'use client';

import React, { Fragment, useState } from 'react';
import styles from './main.module.scss';
import CodeEditor from '../../components/CodeEditor';
import Button from '../../components/Button';
import RequestIcon from '../../components/icons/RequestIcon';
import PrettifyIcon from '../../components/icons/PrettifyIcon';
import prettify from '../../utils/prettify';
import { useLanguage } from '../../context/LanguageContext';
import { getMainText } from '../../utils/getTexts';
import ToolsSection from './components/ToolsSection/ToolsSection';
import AddIcon from '../../components/icons/AddIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import makeRequest from '../../utils/makeRequest';
import DocIcon from '../../components/icons/DocIcon';
import DocSection from './components/DocSection/DocSection';

const MainPage = () => {
  const defaultEndpoint = 'https://spacex-production.up.railway.app/';
  const defaultQuery = `query Cores($find: CoresFind, $order: String) {
    cores(find: $find, order: $order) {
      asds_landings
    }
  }`;
  const defaultHeaders = {};
  const defaultVariables = {};

  const [isVariablesEditor, setVariablesEditor] = useState(false);
  const [isHeadersEditor, setHeadersEditor] = useState(false);
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabs, setTabs] = useState([{ id: 1, title: 'Example' }]);
  const [endpoint, setEndpoint] = useState<string>(defaultEndpoint);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isSDLFetched, setIsSDLFetched] = useState(false);
  const [schemaData, setSchemaData] = useState(null);

  const [tabData, setTabData] = useState<{
    [key: number]: {
      query: string;
      headers: string;
      variables: string;
      response: string;
    };
  }>({
    1: {
      query: defaultQuery,
      headers: JSON.stringify(defaultHeaders),
      variables: JSON.stringify(defaultVariables),
      response: '',
    },
  });

  const [response, setResponse] = useState<string>('');

  const { language } = useLanguage();
  const mainText = getMainText(language || 'en');

  const prettifyButtonClick = (queryToPrettify: string) => {
    const formattedCode = prettify(queryToPrettify);

    setTabData((prevTabData) => ({
      ...prevTabData,
      [activeTabId]: { ...prevTabData[activeTabId], query: formattedCode },
    }));
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
    const newTab = { id: newTabId, title: `NewTab № ${newTabId}` };
    setTabs([...tabs, newTab]);
    setTabData((prevTabData) => ({
      ...prevTabData,
      [newTabId]: { query: '', headers: '', variables: '', response: '' },
    }));
    setActiveTabId(newTabId);
  };

  const removeTab = (tabId: number) => {
    if (tabId === 1) {
      return;
    }

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

    setTabData((prevTabData) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [tabId]: removedTab, ...restTabData } = prevTabData;
      return restTabData;
    });
  };

  const handleChangeEndpoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleChangeEndpointClick = () => {
    // // makeRequest(endpoint);
  };

  const handleEditorChange = (code: string, editorType: string) => {
    setTabData((prevTabData) => ({
      ...prevTabData,
      [activeTabId]: {
        ...prevTabData[activeTabId],
        [editorType]: code,
      },
    }));
  };

  const handleEditorReadOnly = (responseValue: string) => {
    try {
      const parsedResponse = JSON.parse(responseValue);
      setResponse(
        JSON.stringify(parsedResponse, null, 2)
          .replace(/\\n/g, '\n')
          .replace(/\\/g, '')
      );
    } catch (error) {
      setResponse(responseValue);
    }
  };

  const requestButtonClick = async () => {
    try {
      const currentTabData = tabData[activeTabId];

      if (currentTabData) {
        const parsedHeaders = JSON.parse(currentTabData.headers || '{}');
        const parsedVariables = JSON.parse(currentTabData.variables || '{}');

        const response = await makeRequest(
          endpoint,
          currentTabData.query,
          parsedVariables,
          parsedHeaders
        );

        const responseData = response.data;
        handleEditorReadOnly(JSON.stringify(responseData, null, 2));
      } else {
        console.error('No data found for the active tab.');
      }
    } catch (error) {
      console.error('Error:', error);
      handleEditorReadOnly(
        JSON.stringify({ error: (error as Error).message }, null, 2)
      );
    }
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
            {tabs.map(
              (tab) =>
                tab.id === activeTabId && (
                  <div key={tab.id} className={styles.editors_field_wrapper}>
                    <div className={styles.editors_field}>
                      <Fragment>
                        <div className={styles.request_editor_wrapper}>
                          <CodeEditor
                            onEditorChange={(code) =>
                              handleEditorChange(code, 'query')
                            }
                            value={tabData[activeTabId].query}
                          />
                        </div>
                        <div className={styles.tools_section_wrapper}>
                          <div
                            className={`${styles.tools_section} ${
                              (isVariablesEditor || isHeadersEditor) &&
                              styles.tools_section_active
                            }`}
                          >
                            <ToolsSection
                              onToggleVariablesEditor={toggleVariablesEditor}
                              onToggleHeadersEditor={toggleHeadersEditor}
                              onToggleEditor={toggleEditor}
                              isVariablesEditorActive={isVariablesEditor}
                              isHeadersEditorActive={isHeadersEditor}
                              mainText={mainText}
                            />
                            {isVariablesEditor && (
                              <CodeEditor
                                onEditorChange={(code) =>
                                  handleEditorChange(code, 'variables')
                                }
                                value={tabData[activeTabId].variables}
                              />
                            )}
                            {isHeadersEditor && (
                              <CodeEditor
                                onEditorChange={(code) =>
                                  handleEditorChange(code, 'headers')
                                }
                                value={tabData[activeTabId].headers}
                              />
                            )}
                          </div>
                        </div>
                      </Fragment>
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
                        onClick={() =>
                          prettifyButtonClick(tabData[activeTabId].query)
                        }
                        className={styles.button}
                      >
                        <PrettifyIcon />
                      </Button>
                    </div>
                  </div>
                )
            )}
            <div className={styles.response_field_wrapper}>
              <CodeEditor
                onEditorChange={() => {}}
                className={styles.response_editor}
                isReadOnly={true}
                value={response}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
