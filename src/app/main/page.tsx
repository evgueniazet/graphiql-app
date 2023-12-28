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
              <li className={styles.header_item_active}></li>
              <li className={styles.header_item}></li>
              <li className={styles.header_item}></li>
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
              <div className={styles.tools}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MainPage);
