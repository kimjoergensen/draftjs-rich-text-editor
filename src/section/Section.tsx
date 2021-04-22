import { EditorBlock } from 'draft-js';
import React from 'react';

import styles from './section.module.scss';

export const Section: React.FunctionComponent = props => {
  return (
    <section className={styles.section}>
      <EditorBlock {...props} />
    </section>
  )
}