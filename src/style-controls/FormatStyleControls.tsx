import React from 'react';

import { FormatButton } from '../style-buttons/FormatButton';
import { FormatType, OnClick } from '../utils/FormatType';
import styles from './style-controls.module.scss';

type Props = {
  type: FormatType;
  onClick: OnClick;
}

export const FormatStyleControls: React.FunctionComponent<Props> = props => {
  return (
    <div className={styles.controls}>
      <FormatButton
        icon={props.type.icon}
        format={props.type.format}
        onClick={props.onClick}
      />
    </div>
  )
}