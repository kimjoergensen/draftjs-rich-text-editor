/*Do not change the values of these enums!
  They are draft.js specific.*/
export enum Format {
  Indent = 'indent',
  Outdent = 'outdent'
}

export class FormatType {
  icon: JSX.Element;
  format: Format;
}

export type OnClick = (format: Format) => void;