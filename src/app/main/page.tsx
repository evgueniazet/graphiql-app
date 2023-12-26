'use client';

import React, { useState } from 'react';
import styles from './main.module.scss';
import Button from '../../components/Button';
import { useLanguage } from '../../context/LanguageContext';
import { getMainText } from '../../utils/getTexts';
import ChevronUpIcon from '../../components/icons/ChevronUpIcon';

const MainPage = () => {
  const { language } = useLanguage();
  const mainText = getMainText(language || 'en');
  const [isVariablesEditor, setVariablesEditor] = useState(false);
  const [isHeadersEditor, setHeadersEditor] = useState(false);

  const toggleVariablesEditor = () => {
    if (isHeadersEditor) {
      setHeadersEditor(false);
    };
    setVariablesEditor(!isVariablesEditor);
  };

  const toggleHeadersEditor = () => {
    if (isVariablesEditor) {
      setVariablesEditor(false);
    };
    setHeadersEditor(!isHeadersEditor);
  };

  const toggleEditor =() => {
    if (isVariablesEditor || isHeadersEditor) {
      setVariablesEditor(false);
      setHeadersEditor(false);
    };
    if (!isVariablesEditor && !isHeadersEditor) {
      setVariablesEditor(true);
    };
  };

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        {/* <div className={styles.sidebar_section}>
          <button
            type="button"
            className={styles.un_styled}
            data-index="0"
            aria-label="Show Documentation Explorer"
            data-state="closed"
          >
            <svg
              height="2em"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>docs icon</title>
              <path
                d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25"
                stroke="white"
                stroke-width="1.5"
              ></path>
              <line
                x1="13"
                y1="11.75"
                x2="6"
                y2="11.75"
                stroke="white"
                stroke-width="1.5"
              ></line>
            </svg>
          </button>
          <button
            type="button"
            className={styles.un_styled}
            data-index="1"
            aria-label="Show History"
            data-state="closed"
          >
            <svg
              height="2em"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>history icon</title>
              <path
                d="M1.59375 9.52344L4.87259 12.9944L8.07872 9.41249"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="square"
              ></path>
              <path
                d="M13.75 5.25V10.75H18.75"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="square"
              ></path>
              <path
                d="M4.95427 11.9332C4.55457 10.0629 4.74441 8.11477 5.49765 6.35686C6.25089 4.59894 7.5305 3.11772 9.16034 2.11709C10.7902 1.11647 12.6901 0.645626 14.5986 0.769388C16.5071 0.893151 18.3303 1.60543 19.8172 2.80818C21.3042 4.01093 22.3818 5.64501 22.9017 7.48548C23.4216 9.32595 23.3582 11.2823 22.7203 13.0853C22.0824 14.8883 20.9013 16.4492 19.3396 17.5532C17.778 18.6572 15.9125 19.25 14 19.25"
                stroke="white"
                stroke-width="1.5"
              ></path>
            </svg>
          </button>
        </div> */}
        {/* <div className={styles.sidebar_section}>
          <button
            type="button"
            className={styles.un_styled}
            data-index="2"
            aria-label="Re-fetch GraphQL schema"
            data-state="closed"
          >
            <svg
              height="2em"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>reload icon</title>
              <path
                d="M4.75 9.25H1.25V12.75"
                stroke="white"
                stroke-width="1"
                stroke-linecap="square"
              ></path>
              <path
                d="M11.25 6.75H14.75V3.25"
                stroke="white"
                stroke-width="1"
                stroke-linecap="square"
              ></path>
              <path
                d="M14.1036 6.65539C13.8 5.27698 13.0387 4.04193 11.9437 3.15131C10.8487 2.26069 9.48447 1.76694 8.0731 1.75043C6.66173 1.73392 5.28633 2.19563 4.17079 3.0604C3.05526 3.92516 2.26529 5.14206 1.92947 6.513"
                stroke="white"
                stroke-width="1"
              ></path>
              <path
                d="M1.89635 9.34461C2.20001 10.723 2.96131 11.9581 4.05631 12.8487C5.15131 13.7393 6.51553 14.2331 7.9269 14.2496C9.33827 14.2661 10.7137 13.8044 11.8292 12.9396C12.9447 12.0748 13.7347 10.8579 14.0705 9.487"
                stroke="white"
                stroke-width="1"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className={styles.un_styled}
            data-index="3"
            aria-label="Open short keys dialog"
            data-state="closed"
          >
            <svg
              height="2em"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>keyboard shortcut icon</title>
              <path
                d="M1.5 14.5653C1.5 15.211 1.75652 15.8303 2.21314 16.2869C2.66975 16.7435 3.28905 17 3.9348 17C4.58054 17 5.19984 16.7435 5.65646 16.2869C6.11307 15.8303 6.36959 15.211 6.36959 14.5653V12.1305H3.9348C3.28905 12.1305 2.66975 12.387 2.21314 12.8437C1.75652 13.3003 1.5 13.9195 1.5 14.5653Z"
                stroke="white"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.9348 1.00063C3.28905 1.00063 2.66975 1.25715 2.21314 1.71375C1.75652 2.17035 1.5 2.78964 1.5 3.43537C1.5 4.0811 1.75652 4.70038 2.21314 5.15698C2.66975 5.61358 3.28905 5.8701 3.9348 5.8701H6.36959V3.43537C6.36959 2.78964 6.11307 2.17035 5.65646 1.71375C5.19984 1.25715 4.58054 1.00063 3.9348 1.00063Z"
                stroke="white"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15.0652 12.1305H12.6304V14.5653C12.6304 15.0468 12.7732 15.5175 13.0407 15.9179C13.3083 16.3183 13.6885 16.6304 14.1334 16.8147C14.5783 16.9989 15.0679 17.0472 15.5402 16.9532C16.0125 16.8593 16.4464 16.6274 16.7869 16.2869C17.1274 15.9464 17.3593 15.5126 17.4532 15.0403C17.5472 14.568 17.4989 14.0784 17.3147 13.6335C17.1304 13.1886 16.8183 12.8084 16.4179 12.5409C16.0175 12.2733 15.5468 12.1305 15.0652 12.1305Z"
                stroke="white"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12.6318 5.86775H6.36955V12.1285H12.6318V5.86775Z"
                stroke="white"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17.5 3.43473C17.5 2.789 17.2435 2.16972 16.7869 1.71312C16.3303 1.25652 15.711 1 15.0652 1C14.4195 1 13.8002 1.25652 13.3435 1.71312C12.8869 2.16972 12.6304 2.789 12.6304 3.43473V5.86946H15.0652C15.711 5.86946 16.3303 5.61295 16.7869 5.15635C17.2435 4.69975 17.5 4.08046 17.5 3.43473Z"
                stroke="white"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className={styles.un_styled}
            data-index="4"
            aria-label="Open settings"
            data-state="closed"
          >
            <svg
              height="2em"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>settings icon</title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.29186 1.92702C9.06924 1.82745 8.87014 1.68202 8.70757 1.50024L7.86631 0.574931C7.62496 0.309957 7.30773 0.12592 6.95791 0.0479385C6.60809 -0.0300431 6.24274 0.00182978 5.91171 0.139208C5.58068 0.276585 5.3001 0.512774 5.10828 0.815537C4.91645 1.1183 4.82272 1.47288 4.83989 1.83089L4.90388 3.08019C4.91612 3.32348 4.87721 3.56662 4.78968 3.79394C4.70215 4.02126 4.56794 4.2277 4.39571 4.39994C4.22347 4.57219 4.01704 4.7064 3.78974 4.79394C3.56243 4.88147 3.3193 4.92038 3.07603 4.90814L1.8308 4.84414C1.47162 4.82563 1.11553 4.91881 0.811445 5.11086C0.507359 5.30292 0.270203 5.58443 0.132561 5.91671C-0.00508149 6.249 -0.0364554 6.61576 0.0427496 6.9666C0.121955 7.31744 0.307852 7.63514 0.5749 7.87606L1.50016 8.71204C1.68193 8.87461 1.82735 9.07373 1.92692 9.29636C2.02648 9.51898 2.07794 9.76012 2.07794 10.004C2.07794 10.2479 2.02648 10.489 1.92692 10.7116C1.82735 10.9343 1.68193 11.1334 1.50016 11.296L0.5749 12.1319C0.309856 12.3729 0.125575 12.6898 0.0471809 13.0393C-0.0312128 13.3888 9.64098e-05 13.754 0.13684 14.0851C0.273583 14.4162 0.509106 14.6971 0.811296 14.8894C1.11349 15.0817 1.46764 15.1762 1.82546 15.1599L3.0707 15.0959C3.31397 15.0836 3.5571 15.1225 3.7844 15.2101C4.01171 15.2976 4.21814 15.4318 4.39037 15.6041C4.56261 15.7763 4.69682 15.9827 4.78435 16.2101C4.87188 16.4374 4.91078 16.6805 4.89855 16.9238L4.83455 18.1691C4.81605 18.5283 4.90921 18.8844 5.10126 19.1885C5.2933 19.4926 5.5748 19.7298 5.90707 19.8674C6.23934 20.0051 6.60608 20.0365 6.9569 19.9572C7.30772 19.878 7.6254 19.6921 7.86631 19.4251L8.7129 18.4998C8.87547 18.318 9.07458 18.1725 9.29719 18.073C9.51981 17.9734 9.76093 17.9219 10.0048 17.9219C10.2487 17.9219 10.4898 17.9734 10.7124 18.073C10.935 18.1725 11.1341 18.318 11.2967 18.4998L12.1326 19.4251C12.3735 19.6921 12.6912 19.878 13.042 19.9572C13.3929 20.0365 13.7596 20.0051 14.0919 19.8674C14.4241 19.7298 14.7056 19.4926 14.8977 19.1885C15.0897 18.8844 15.1829 18.5283 15.1644 18.1691L15.1004 16.9238C15.0882 16.6805 15.1271 16.4374 15.2146 16.2101C15.3021 15.9827 15.4363 15.7763 15.6086 15.6041C15.7808 15.4318 15.9872 15.2976 16.2145 15.2101C16.4418 15.1225 16.685 15.0836 16.9282 15.0959L18.1735 15.1599C18.5326 15.1784 18.8887 15.0852 19.1928 14.8931C19.4969 14.7011 19.7341 14.4196 19.8717 14.0873C20.0093 13.755 20.0407 13.3882 19.9615 13.0374C19.8823 12.6866 19.6964 12.3689 19.4294 12.1279L18.5041 11.292C18.3223 11.1294 18.1769 10.9303 18.0774 10.7076C17.9778 10.485 17.9263 10.2439 17.9263 10C17.9263 9.75612 17.9778 9.51499 18.0774 9.29236C18.1769 9.06973 18.3223 8.87062 18.5041 8.70804L19.4294 7.87206C19.6964 7.63114 19.8823 7.31344 19.9615 6.9626C20.0407 6.61176 20.0093 6.245 19.8717 5.91271C19.7341 5.58043 19.4969 5.29892 19.1928 5.10686C18.8887 4.91481 18.5326 4.82163 18.1735 4.84014L16.9282 4.90414C16.685 4.91638 16.4418 4.87747 16.2145 4.78994C15.9872 4.7024 15.7808 4.56818 15.6086 4.39594C15.4363 4.2237 15.3021 4.01726 15.2146 3.78994C15.1271 3.56262 15.0882 3.31948 15.1004 3.07619L15.1644 1.83089C15.1829 1.4717 15.0897 1.11559 14.8977 0.811487C14.7056 0.507385 14.4241 0.270217 14.0919 0.132568C13.7596 -0.00508182 13.3929 -0.0364573 13.042 0.0427519C12.6912 0.121961 12.3735 0.307869 12.1326 0.574931L11.2914 1.50024C11.1288 1.68202 10.9297 1.82745 10.7071 1.92702C10.4845 2.02659 10.2433 2.07805 9.99947 2.07805C9.7556 2.07805 9.51448 2.02659 9.29186 1.92702ZM14.3745 10C14.3745 12.4162 12.4159 14.375 9.99977 14.375C7.58365 14.375 5.625 12.4162 5.625 10C5.625 7.58375 7.58365 5.625 9.99977 5.625C12.4159 5.625 14.3745 7.58375 14.3745 10Z"
                fill="white"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
      <div className={styles.basic}>
        <div className={styles.basic_wrapper}>
          {/* <div className={styles.basic_header}>
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
                      stroke-width="1"
                    ></path>
                    <path
                      d="M13 1L1.00079 13.0003"
                      stroke="currentColor"
                      stroke-width="1"
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
                      stroke-width="1"
                    ></path>
                    <path
                      d="M13 1L1.00079 13.0003"
                      stroke="currentColor"
                      stroke-width="1"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.25 9.25V13.5H5.75V9.25L10 9.25V7.75L5.75 7.75V3.5H4.25V7.75L0 7.75V9.25L4.25 9.25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
            <div className={styles.header_right}>
              <a href="https://github.com/graphql/graphiql" target="_blank">
                <h2>
                  Graph<em>i</em>QL
                </h2>
              </a>
            </div>
          </div> */}
          <div className={styles.panel}>
            <div className={styles.editors}>
              <div className={styles.editor_wrapp}>
                <div className={styles.editor}>
                  <div className={styles.editor_inner}>
                    {/*                                         <textarea className="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; min-height: 1em; outline: none;"></textarea>
                                    </div> */}
                  </div>
                  <div className={styles.vscrollbar}>
                    <div></div>
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
                  {/* <button
                    type="button"
                    className={styles.execute_button}
                    aria-label="Execute query (Ctrl-Enter)"
                    data-state="closed"
                  >
                    <svg
                      height="2em"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>play icon</title>
                      <path
                        d="M1.32226e-07 1.6609C7.22332e-08 0.907329 0.801887 0.424528 1.46789 0.777117L15.3306 8.11621C16.0401 8.49182 16.0401 9.50818 15.3306 9.88379L1.46789 17.2229C0.801886 17.5755 1.36076e-06 17.0927 1.30077e-06 16.3391L1.32226e-07 1.6609Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button> */}
                  {/* <button
                    type="button"
                    className={styles.toolbar_button}
                    aria-label="Prettify query (Shift-Ctrl-P)"
                    data-state="closed"
                  >
                    <svg
                      height="2em"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <title>prettify icon</title>
                      <path
                        d="M10.2852 24.0745L13.7139 18.0742"
                        stroke="currentColor"
                        stroke-width="1.5625"
                      ></path>
                      <path
                        d="M14.5742 24.0749L17.1457 19.7891"
                        stroke="currentColor"
                        stroke-width="1.5625"
                      ></path>
                      <path
                        d="M19.4868 24.0735L20.7229 21.7523C21.3259 20.6143 21.5457 19.3122 21.3496 18.0394C21.1535 16.7666 20.5519 15.591 19.6342 14.6874L23.7984 6.87853C24.0123 6.47728 24.0581 6.00748 23.9256 5.57249C23.7932 5.1375 23.4933 4.77294 23.0921 4.55901C22.6908 4.34509 22.221 4.29932 21.7861 4.43178C21.3511 4.56424 20.9865 4.86408 20.7726 5.26533L16.6084 13.0742C15.3474 12.8142 14.0362 12.9683 12.8699 13.5135C11.7035 14.0586 10.7443 14.9658 10.135 16.1L6 24.0735"
                        stroke="currentColor"
                        stroke-width="1.5625"
                      ></path>
                      <path
                        d="M4 15L5 13L7 12L5 11L4 9L3 11L1 12L3 13L4 15Z"
                        stroke="currentColor"
                        stroke-width="1.5625"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M11.5 8L12.6662 5.6662L15 4.5L12.6662 3.3338L11.5 1L10.3338 3.3338L8 4.5L10.3338 5.6662L11.5 8Z"
                        stroke="currentColor"
                        stroke-width="1.5625"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button> */}
                  {/* <button
                    type="button"
                    className={styles.toolbar_button}
                    aria-label="Merge fragments into query (Shift-Ctrl-M)"
                    data-state="closed"
                  >
                    <svg
                      height="2em"
                      viewBox="-2 -2 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <title>merge icon</title>
                      <path
                        d="M17.2492 6V2.9569C17.2492 1.73806 16.2611 0.75 15.0423 0.75L2.9569 0.75C1.73806 0.75 0.75 1.73806 0.75 2.9569L0.75 6"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M0.749873 12V15.0431C0.749873 16.2619 1.73794 17.25 2.95677 17.25H15.0421C16.261 17.25 17.249 16.2619 17.249 15.0431V12"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M6 4.5L9 7.5L12 4.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></path>
                      <path
                        d="M12 13.5L9 10.5L6 13.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></path>
                    </svg>
                  </button> */}
                  {/* <button
                    type="button"
                    className={styles.toolbar_button}
                    aria-label="Copy query (Shift-Ctrl-C)"
                    data-state="closed"
                  >
                    <svg
                      height="2em"
                      viewBox="-2 -2 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <title>copy icon</title>
                      <path
                        d="M11.25 14.2105V15.235C11.25 16.3479 10.3479 17.25 9.23501 17.25H2.76499C1.65214 17.25 0.75 16.3479 0.75 15.235L0.75 8.76499C0.75 7.65214 1.65214 6.75 2.76499 6.75L3.78947 6.75"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></path>
                      <rect
                        x="6.75"
                        y="0.75"
                        width="10.5"
                        height="10.5"
                        rx="2.2069"
                        stroke="currentColor"
                        stroke-width="1.5"
                      ></rect>
                    </svg>
                  </button> */}
                </div>
              </div>
              <div className={styles.tools_container}>
                <div className={styles.tools}>
                  <div className={styles.tools_button_container}>
                    <Button
                      type="button"
                      className={styles.textButton}
                      text={mainText.variablesButton}
                      onClick={toggleVariablesEditor}
                      isActive={isVariablesEditor}
                    />
                    <Button
                      type="button"
                      className={styles.textButton}
                      text={mainText.headersButton}
                      onClick={toggleHeadersEditor}
                      isActive={isHeadersEditor}
                    />
                  </div>
                  <Button
                    type="button"
                    className={styles.iconButton}
                    onClick={toggleEditor}
                  >
                    <ChevronUpIcon />
                  </Button>
                </div>
                {isVariablesEditor && (
                  <div className={styles.editor}>
                    <input
                      type="text"
                      className={styles.editor_input}
                      onChange={() => {}}
                    />
                  </div>
                )}
                {isHeadersEditor && (
                  <div className={styles.editor}>
                    <input
                      type="text"
                      className={styles.editor_input}
                      onChange={() => {}}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
