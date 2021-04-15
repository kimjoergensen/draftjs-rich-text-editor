import React from 'react';

import { Format, OnClick } from '../utils/FormatType';
import { StyleButtonComposition } from './StyleButtonComposition';

type Props = {
  icon: JSX.Element;
  format: Format;
  onClick: OnClick;
}

export const FormatButton: React.FunctionComponent<Props> = props => {
  return (
    <span onMouseDown={event => {
      event.preventDefault();
      props.onClick(props.format);
    }}>
      <StyleButtonComposition active={false} icon={props.icon} />
    </span>
  )
}