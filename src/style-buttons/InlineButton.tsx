import React from 'react';

import { OnToggle, Style } from '../utils/StyleType';
import { StyleButtonComposition } from './StyleButtonComposition';

type Props = {
  active: boolean;
  icon: JSX.Element;
  style: Style;
  onToggle: OnToggle;
}

export const InlineButton: React.FunctionComponent<Props> = props => {
  return (
    <span onMouseDown={event => {
      event.preventDefault();
      props.onToggle(props.style);
    }}>
      <StyleButtonComposition active={props.active} icon={props.icon} />
    </span>
  )
}