import React from 'react';

import { Style } from '../utils/StyleType';
import { ButtonComposition } from './ButtonComposition';

type Props = {
  active: boolean;
  icon: JSX.Element;
  style: Style;
  onToggle: (style: Style) => void;
}

export const StyleButton: React.FunctionComponent<Props> = props => {
  return (
    <span onMouseDown={event => {
      event.preventDefault();
      props.onToggle(props.style);
    }}>
      <ButtonComposition active={props.active} icon={props.icon} />
    </span>
  )
}