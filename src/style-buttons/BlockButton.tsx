import React from 'react'

import { Block, OnToggle } from '../utils/block-type'
import { StyleButtonComposition } from './StyleButtonComposition'

type Props = {
  active: boolean;
  icon: JSX.Element;
  block: Block;
  onToggle: OnToggle;
}

export const BlockButton: React.FunctionComponent<Props> = props => {
  return (
    <span onMouseDown={event => {
      event.preventDefault();
      props.onToggle(props.block);
    }}>
      <StyleButtonComposition active={props.active} icon={props.icon} />
    </span>
  )
}