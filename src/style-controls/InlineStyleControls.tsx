import { EditorState } from 'draft-js';
import React from 'react';

import { InlineButton } from '../style-buttons/InlineButton';
import { OnToggle, StyleType } from '../utils/StyleType';
import styles from './style-controls.module.scss';

type Props = {
  editorState: EditorState;
  type: StyleType;
  onToggle: OnToggle;
}

export const InlineStyleControls: React.FunctionComponent<Props> = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className={styles.controls}>
      <InlineButton
        active={currentStyle.has(props.type.style)}
        icon={props.type.icon}
        style={props.type.style}
        onToggle={props.onToggle}
      />
    </div>
  )
}