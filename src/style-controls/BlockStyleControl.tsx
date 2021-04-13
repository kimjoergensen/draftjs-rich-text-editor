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

export const BlockStyleControl: React.FunctionComponent<Props> = props => {
  const selection = props.editorState.getSelection();
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.controls}>
      <StyleButton
        active={props.type.style === blockType}
        icon={props.type.icon}
        style={props.type.style}
        onToggle={props.onToggle}
      />
    </div>
  )
}