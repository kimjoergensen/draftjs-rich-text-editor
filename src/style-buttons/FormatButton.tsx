import React from 'react';

import { Format } from '../utils/FormatType';
import { ButtonComposition } from './ButtonComposition';

type Props = {
  icon: JSX.Element;
  format: Format;
  onToggle: (format: Format) => void;
}

export const FormatButton: React.FunctionComponent<Props> = props => {
  return (
    <span onMouseDown={event => {
      event.preventDefault();
      props.onToggle(props.format);
    }}>
      <ButtonComposition active={false} icon={props.icon} />
    </span>
  )
}