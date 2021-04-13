import React from 'react';
import ReactDOM from 'react-dom';

import { RichTextEditor } from './rich-text-editor/RichTextEditor';

export const App: React.FunctionComponent = props => {
  return <RichTextEditor />
}

ReactDOM.render(
  <div style={{ maxWidth: 500, margin: '0 auto' }}>
    <App />
  </div>,
  document.getElementById('app')
);