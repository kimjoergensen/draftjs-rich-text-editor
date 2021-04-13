import React from 'react';

import styles from './style-group.module.scss';

export const StyleGroup: React.FunctionComponent = props => {
  return (
    <div className={styles.styleGroup}>
      {props.children}
    </div>
  )
}