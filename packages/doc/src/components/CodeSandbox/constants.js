const HTML = '<div id="root"></div>';

const CODE = `import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Meck',
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);`;

const PACKAGE = {
  files: {
    'package.json': {
      content: {
        dependencies: {
          react: 'latest',
          'react-dom': 'latest',
        },
      },
    },
    'index.js': {
      content: CODE,
    },
    'index.html': {
      content: HTML,
    },
  },
};

const URL = 'https://codesandbox.io/api/v1/sandboxes/define?json=1';

const METHOD = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(PACKAGE),
};

export { URL, METHOD };
