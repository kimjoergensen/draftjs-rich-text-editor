import { EditorState } from 'draft-js';
import React from 'react';

import { StyleButton } from '../style-buttons/StyleButton';
import { Style, StyleType } from '../utils/StyleType';
import styles from './style-controls.module.scss';

type Props = {
  editorState: EditorState;
  type: StyleType;
  onToggle: (style: Style) => void;
}

export const InlineStyleControl: React.FunctionComponent<Props> = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className={styles.controls}>
      <StyleButton
        active={currentStyle.has(props.type.style)}
        icon={props.type.icon}
        style={props.type.style}
        onToggle={props.onToggle}
      />
    </div>
  )
}