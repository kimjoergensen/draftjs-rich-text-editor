import React from 'react';

import styles from './style-button.module.scss';

type Props = {
  active: boolean;
  icon: JSX.Element;
}

export const ButtonComposition: React.FunctionComponent<Props> = props => {
  return (
    <span className={`${styles.styleButton} ${props.active ? styles.active : ''}`}>
      {props.icon}
    </span>
  )
}