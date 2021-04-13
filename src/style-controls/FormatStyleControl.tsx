import { EditorState } from 'draft-js';
import React from 'react';

import { FormatButton } from '../style-buttons/FormatButton';
import { Format, FormatType } from '../utils/FormatType';
import styles from './style-controls.module.scss';

type Props = {
  editorState: EditorState;
  type: FormatType;
  onToggle: (type: Format) => void;
}

export const FormatStyleControl: React.FunctionComponent<Props> = props => {
  return (
    <div className={styles.controls}>
      <FormatButton
        icon={props.type.icon}
        format={props.type.format}
        onToggle={props.onToggle}
      />
    </div>
  )
}