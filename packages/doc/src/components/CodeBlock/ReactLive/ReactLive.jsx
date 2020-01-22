import React, { useState } from 'react';
import styled from 'styled-components';

import githubTheme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { MDXContext } from '@mdx-js/react';

import * as YogaComponents from '@gympass/yoga';
import PrismHighlight from '../PrismHighlight';
import CodeToolbar from './CodeToolbar';
import ReactLiveContext from './ReactLiveContext';

const CodeError = styled(LiveError)`
  background-color: #fff0f0;
  color: #ff4249;
  margin: 0;
  padding: 15px 15px 4px;
`;

const Preview = styled.div`
  ${({
    theme: {
      yoga: {
        colors: { gray: grayPallete },
      },
    },
  }) => `
    background-color: ${grayPallete[0]};
    border-radius: 5px;
    border: 1px solid ${grayPallete[3]};
    overflow: hidden;

    textarea {
      outline: none;
    }
  `};
`;

const Component = styled.div`
  ${({
    'data-center': center,
    darkMode,
    theme: {
      yoga: {
        colors: { white, dark, primary },
      },
    },
  }) => `
    font-family: 'Open Sans';
    padding: 50px;
    background-color: ${darkMode ? dark : white};
    transition: all 0.3s ease-in-out;

    ${YogaComponents.Col} {
      background-color: ${primary[1]};
      border: 1px solid;
    }

    > div {
      width: 100%;
      ${
        center === 'true'
          ? `
      align-items: center;
      display: flex;
      justify-content: center;
    `
          : ''
      }
    }

    @media (max-width: 900px) {
      padding: 20px;
    }
  `}
`;

const Usage = styled.div`
  ${({
    visible,
    theme: {
      yoga: {
        colors: { gray: grayPallete },
      },
    },
  }) => `
    background-color: ${grayPallete[0]};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: ${visible ? 'block' : 'none'};
    padding: 1px;

    pre {
      border: 0;
    }
  `};
`;

const ReactLive = ({ code, state, center, imports, children }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sharedState = {
    codeVisible,
    setCodeVisible,
    darkMode,
    setDarkMode,
    imports,
    code,
  };

  return (
    <MDXContext.Consumer>
      {scope => (
        <LiveProvider
          code={code}
          scope={{ ...scope, useState, styled }}
          theme={githubTheme}
          noInline={state}
        >
          <Preview>
            <ReactLiveContext.Provider value={sharedState}>
              <CodeToolbar />

              <Component data-center={center} darkMode={darkMode}>
                <LivePreview />
              </Component>

              <Usage visible={codeVisible}>
                <PrismHighlight code={imports} />
                <PrismHighlight code={children} liveEditor />
                <CodeError />
              </Usage>
            </ReactLiveContext.Provider>
          </Preview>
        </LiveProvider>
      )}
    </MDXContext.Consumer>
  );
};

export default ReactLive;
