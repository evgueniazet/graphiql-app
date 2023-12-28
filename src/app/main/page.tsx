'use client';

import React from 'react';
import styles from './main.module.scss';
import CodeEditor from '../../components/CodeEditor';
import Button from '../../components/Button';
import Link from 'next/link';
import RequestIcon from '../../icons/requestIcon';
import PrettifyIcon from '../../icons/prettifyIcon';
import prettify from '../../utils/prettify';
import ReactAce from 'react-ace';
import { useEditorContext } from '../../context/EditorContext';
import withAuth from '../../auth/withAuth';

const MainPage = () => {
  const { editorValue, handleEditorChange } = useEditorContext();

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

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_section}></div>
        <div className={styles.sidebar_section}></div>
      </div>
      <div className={styles.basic}>
        <div className={styles.basic_wrapper}>
          <div className={styles.basic_header}>
            <ul className={styles.header_list}>
              <li className={styles.header_item_active}>
                <button
                  aria-controls="graphiql-session"
                  id="graphiql-session-tab-0"
                  type="button"
                >
                  &lt;untitled&gt;
                </button>
                <button
                  aria-label="Close Tab"
                  type="button"
                  data-state="closed"
                >
                  <svg
                    height="1em"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>close icon</title>
                    <path
                      d="M1 1L12.9998 12.9997"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M13 1L1.00079 13.0003"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                  </svg>
                </button>
              </li>
              <li className={styles.header_item}>
                <button>&lt;untitled&gt;</button>
                <button
                  aria-label="Close Tab"
                  type="button"
                  data-state="closed"
                >
                  <svg
                    height="1em"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>close icon</title>
                    <path
                      d="M1 1L12.9998 12.9997"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M13 1L1.00079 13.0003"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                  </svg>
                </button>
              </li>
              <li className={styles.header_item}>
                <button type="button" aria-label="Add tab" data-state="closed">
                  <svg
                    height="1em"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>plus icon</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.25 9.25V13.5H5.75V9.25L10 9.25V7.75L5.75 7.75V3.5H4.25V7.75L0 7.75V9.25L4.25 9.25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
            <div className={styles.header_right}>
              <Link href="https://github.com/graphql/graphiql" target="_blank">
                <h2>
                  Graph<em>i</em>QL
                </h2>
              </Link>
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.editors}>
              <div className={styles.editor_wrapp}>
                <div className={styles.editor}>
                  <div className={styles.editor_inner}>
                    {/*                                         <textarea className="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; min-height: 1em; outline: none;"></textarea>
                                    </div> */}
                  </div>
                  <div className={styles.vscrollbar}>
                    <div>
                      <CodeEditor
                        forwardedRef={editorRef}
                        onEditorChange={handleEditorChange}
                      />
                    </div>
                  </div>
                  <div className={styles.hscrollbar}>
                    <div></div>
                  </div>
                </div>
                <div
                  className={styles.toolbar}
                  role="toolbar"
                  aria-label="Editor Commands"
                >
                  <Button
                    type="button"
                    className={styles.requestButton}
                    onClick={requestButtonClick}
                  >
                    <RequestIcon />
                  </Button>
                  <Button type="button" onClick={prettifyButtonClick}>
                    <PrettifyIcon />
                  </Button>
                </div>
              </div>
              <div className={styles.tools}>
                <button type="button">Variables</button>
                <button type="button">Headers</button>
                <button
                  className={styles.editor_tools}
                  type="button"
                  aria-label="Show editor tools"
                >
                  <svg
                    height="1em"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>chevron up icon</title>
                    <path
                      d="M13 8L7 2L1 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MainPage);
