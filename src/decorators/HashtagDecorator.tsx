import React from 'react'

import styles from './decorators.module.scss'

export const HashtagDecorator: React.FunctionComponent = props => {
  return (
    <span className={styles.hashtag}>
      {props.children}
    </span>
  )
}