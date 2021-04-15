import { EditorState } from 'draft-js';
import React from 'react';

import { BlockButton } from '../style-buttons/BlockButton';
import { BlockType, OnToggle } from '../utils/BlockType';
import styles from './style-controls.module.scss';

type Props = {
  editorState: EditorState;
  type: BlockType;
  onToggle: OnToggle;
}

export const BlockStyleControls: React.FunctionComponent<Props> = props => {
  const selection = props.editorState.getSelection();
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.controls}>
      <BlockButton
        active={props.type.block === blockType}
        icon={props.type.icon}
        block={props.type.block}
        onToggle={props.onToggle}
      />
    </div>
  )
}